import React from 'react';
import '../styles/Circle.css';

const Circle = ({ circle, onClick }) => {
  if (!circle.visible) return null;

  const handleClick = () => {
    onClick(circle.id);
  };

  return (
    <div
      className="circle"
      style={{
        left: `${circle.x}%`,
        top: `${circle.y}%`,
        backgroundColor: circle.color,
      }}
      onClick={handleClick}
    >
      <span className="circle-number">{circle.number}</span>
    </div>
  );
};

export default Circle;
