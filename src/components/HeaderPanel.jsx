import React from 'react';
import '../styles/HeaderPanel.css';

const HeaderPanel = () => {
  return (
    <div className="header-panel">
      <div className="header-content">
        <div className="instructions">
          <h3>🎯 Game Instructions</h3>
          <p>Click on the numbered circles to make them disappear!</p>
          <p>Clear all points to win the game!</p>
        </div>
        
        <div className="game-info">
          <div className="info-item">
            <span className="info-label">Goal:</span>
            <span className="info-text">Clear all points</span>
          </div>
          <div className="info-item">
            <span className="info-label">Action:</span>
            <span className="info-text">Click to remove</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPanel;
