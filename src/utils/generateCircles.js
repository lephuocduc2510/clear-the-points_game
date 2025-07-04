export const generateCircles = (count = 10) => {
    const circles = [];
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#FF9F43', '#10AC84', '#EE5A52', '#0984E3', '#A29BFE',
        '#FD79A8', '#FDCB6E', '#6C5CE7', '#74B9FF', '#00B894',
        '#FF7675', '#74B9FF', '#0984E3', '#00B894', '#00CEC9',
        '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'
    ];

    const getCircleConfig = (count) => {
        if (count <= 10) return { size: 50, minDistance: 70 };
        if (count <= 20) return { size: 45, minDistance: 60 };
        if (count <= 40) return { size: 40, minDistance: 50 };
        if (count <= 60) return { size: 35, minDistance: 45 };
        if (count <= 80) return { size: 30, minDistance: 40 };
        return { size: 25, minDistance: 35 };
    };
    const { size, minDistance } = getCircleConfig(count);

    // Tạo vị trí ngẫu nhiên cho các điểm
    const generateRandomPosition = (existingPositions, attempts = 0) => {
        const maxAttempts = count > 50 ? 100 : 500; // Giảm attempts cho số lượng lớn

        if (attempts >= maxAttempts) {
            // Fallback: vị trí hoàn toàn random
            return {
                x: Math.random() * 70 + 15,
                y: Math.random() * 70 + 15
            };
        }

        const margin = 15;
        const position = {
            x: Math.random() * (100 - 2 * margin) + margin,
            y: Math.random() * (100 - 2 * margin) + margin
        };

        // Giảm khoảng cách tối thiểu cho số lượng lớn
        const adjustedMinDistance = count > 50 ? minDistance * 0.6 : minDistance;
        const minDistancePercent = (adjustedMinDistance / 500) * 100;

        const isValidPosition = existingPositions.every(pos => {
            const distance = Math.sqrt(
                Math.pow(pos.x - position.x, 2) + Math.pow(pos.y - position.y, 2)
            );
            return distance >= minDistancePercent;
        });

        if (isValidPosition) {
            return position;
        }

        return generateRandomPosition(existingPositions, attempts + 1);
    };



    const positions = [];

    for (let i = 0; i < count; i++) {
        // Luôn dùng random positioning thay vì grid
        const position = generateRandomPosition(positions);
        positions.push(position);

        circles.push({
            id: i + 1,
            number: i + 1,
            x: position.x,
            y: position.y,
            color: colors[i % colors.length],
            visible: true,
            size: size
        });
    }

    return circles;
};