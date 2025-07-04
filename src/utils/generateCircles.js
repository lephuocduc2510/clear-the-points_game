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
        if (attempts >= 500) {
            return generateGridPosition(existingPositions.length, count);
        }

        const margin = 15;
        const position = {
            x: Math.random() * (100 - 2 * margin) + margin,
            y: Math.random() * (100 - 2 * margin) + margin
        };

        const minDistancePercent = (minDistance / 500) * 100;

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

    const generateGridPosition = (index, total) => {
        const cols = Math.ceil(Math.sqrt(total));
        const rows = Math.ceil(total / cols);

        const col = index % cols;
        const row = Math.floor(index / cols);

        const marginX = 15;
        const marginY = 15;
        const stepX = (100 - 2 * marginX) / (cols - 1 || 1);
        const stepY = (100 - 2 * marginY) / (rows - 1 || 1);

        const randomOffsetX = (Math.random() - 0.5) * stepX * 0.3;
        const randomOffsetY = (Math.random() - 0.5) * stepY * 0.3;

        return {
            x: Math.max(marginX, Math.min(100 - marginX, marginX + col * stepX + randomOffsetX)),
            y: Math.max(marginY, Math.min(100 - marginY, marginY + row * stepY + randomOffsetY))
        };
    };

    const positions = [];

    for (let i = 0; i < count; i++) {
        const position = count > 60 ?
            generateGridPosition(i, count) :
            generateRandomPosition(positions);
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