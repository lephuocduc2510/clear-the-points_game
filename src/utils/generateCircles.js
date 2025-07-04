export const generateCircles = (count = 10) => {
  const circles = [];
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#FF9F43', '#10AC84', '#EE5A52', '#0984E3', '#A29BFE',
    '#FD79A8', '#FDCB6E', '#6C5CE7', '#74B9FF', '#00B894'
  ];
  
  // Tạo vị trí ngẫu nhiên cho các điểm
  const generateRandomPosition = (existingPositions) => {
    let attempts = 0;
    let position;
    
    do {
      position = {
        x: Math.random() * 80 + 10, // 10% - 90% để tránh bị cắt
        y: Math.random() * 80 + 10  // 10% - 90% để tránh bị cắt
      };
      attempts++;
    } while (attempts < 100 && existingPositions.some(pos => 
      Math.abs(pos.x - position.x) < 8 || Math.abs(pos.y - position.y) < 8
    )); // Đảm bảo khoảng cách tối thiểu 8% giữa các điểm
    
    return position;
  };

  const positions = [];
  
  for (let i = 0; i < count; i++) {
    const position = generateRandomPosition(positions);
    positions.push(position);
    
    circles.push({
      id: i + 1,
      number: i + 1,
      x: position.x,
      y: position.y,
      color: colors[i % colors.length],
      visible: true
    });
  }

  return circles;
};