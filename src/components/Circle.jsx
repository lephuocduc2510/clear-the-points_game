import React from 'react';
import '../styles/Circle.css';

const Circle = ({ circle, onClick , disabled = false}) => {
    if (!circle.visible) return null;

    const handleClick = () => {
        if (!disabled) {
            onClick(circle.id);
        }
    };
    return (
        <div
             className={`circle ${disabled ? 'disabled' : ''}`}
            style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                backgroundColor: circle.color,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onClick={handleClick}
        >
            <span className="circle-number">{circle.number}</span>
        </div>
    );
};
export default Circle;
