import React from 'react';
import '../styles/Circle.css';

const Circle = ({ circle, onClick, disabled = false, isNextExpected = false }) => {
    if (!circle.visible) return null;

    const handleClick = () => {
        if (!disabled) {
            onClick(circle.id);
        }
    };
    return (
        <div
            className={`circle ${disabled ? 'disabled' : ''} ${isNextExpected ? 'next-expected' : ''}`}
            style={{
                width: `${circle.size || 50}px`,
                height: `${circle.size || 50}px`,
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                backgroundColor: circle.color,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: `${Math.max(12, (circle.size || 50) * 0.35)}px`
            }}
            onClick={handleClick}
        >
            <span className="circle-number">{circle.number}</span>
        </div>
    );
};
export default Circle;
