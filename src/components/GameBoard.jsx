import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { generateCircles } from '../utils/generateCircles';
import Circle from './Circle.jsx';
import '../styles/GameBoard.css';

const GameBoard = () => {
  const [circles, setCircles] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const remainingCircles = circles.filter(circle => circle.visible).length;
    if (remainingCircles === 0 && circles.length > 0) {
      setGameCompleted(true);
      stopTimer();
    }
  }, [circles, stopTimer]);

  const initializeGame = () => {
    const newCircles = generateCircles();
    setCircles(newCircles);
    setGameCompleted(false);
    resetTimer();
    startTimer();
  };

  const handleCircleClick = (id) => {
    setCircles(prevCircles =>
      prevCircles.map(circle =>
        circle.id === id ? { ...circle, visible: false } : circle
      )
    );
  };

  const handleRestart = () => {
    initializeGame();
  };

  const visibleCircles = circles.filter(circle => circle.visible);
  const totalPoints = visibleCircles.length;

  return (
    <div className="game-board-container">
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Points:</span>
          <span className="stat-value">{totalPoints}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{time}s</span>
        </div>
        <button className="restart-btn" onClick={handleRestart}>
          Restart
        </button>
      </div>

      <div className="game-board">
        {gameCompleted && (
          <div className="all-cleared-overlay">
            <div className="all-cleared-message">
              <h2>🎉 ALL CLEARED! 🎉</h2>
              <p>Completed in {time} seconds!</p>
              <button className="play-again-btn" onClick={handleRestart}>
                Play Again
              </button>
            </div>
          </div>
        )}
        
        <div className="game-area">
          <div className="lets-play-header">
            <h3>LET'S PLAY</h3>
          </div>
          
          <div className="circles-container">
            {circles.map(circle => (
              <Circle
                key={circle.id}
                circle={circle}
                onClick={handleCircleClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
