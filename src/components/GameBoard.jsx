import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { generateCircles } from '../utils/generateCircles.js';
import Circle from './Circle.jsx';
import '../styles/GameBoard.css';

const GameBoard = () => {
    const [circles, setCircles] = useState([]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [numberOfPoints, setNumberOfPoints] = useState(10);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const { time, startTimer, stopTimer, resetTimer } = useTimer();

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        const remainingCircles = circles.filter(circle => circle.visible).length;
        if (remainingCircles === 0 && circles.length > 0) {
            setGameCompleted(true);
            setIsAutoPlaying(false);
            stopTimer();
        }
    }, [circles, stopTimer]);

    const initializeGame = () => {
        const newCircles = generateCircles();
        setCircles(newCircles);
        setGameCompleted(false);
        setIsAutoPlaying(false);
        resetTimer();
        startTimer();
    };

    const handleCircleClick = (id) => {
        if (isAutoPlaying) return;
        setCircles(prevCircles =>
            prevCircles.map(circle =>
                circle.id === id ? { ...circle, visible: false } : circle
            )
        );
    };

    const handleRestart = () => {
        setIsAutoPlaying(false);
        initializeGame();
    };

    const handleNumberOfPointsChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 50) {
            setNumberOfPoints(value);
        }
    };

    const handleAutoPlay = () => {
        if (isAutoPlaying) return;

        setIsAutoPlaying(true);
        const visibleCircles = circles.filter(circle => circle.visible);

        visibleCircles.forEach((circle, index) => {
            setTimeout(() => {
                setCircles(prevCircles =>
                    prevCircles.map(c =>
                        c.id === circle.id ? { ...c, visible: false } : c
                    )
                );
            }, (index + 1) * 500); // Delay 500ms giữa mỗi click
        });
    };

    const visibleCircles = circles.filter(circle => circle.visible);
    const totalPoints = visibleCircles.length;

    return (
        <div className="game-board-container">
            <div className="game-controls">
                <div className="input-control">
                    <label htmlFor="points-input">Number of Points:</label>
                    <input
                        id="points-input"
                        type="number"
                        min="1"
                        max="50"
                        value={numberOfPoints}
                        onChange={handleNumberOfPointsChange}
                        disabled={isAutoPlaying}
                    />
                </div>

                <div className="action-buttons">
                    <button
                        className="restart-btn"
                        onClick={handleRestart}
                        disabled={isAutoPlaying}
                    >
                        {isAutoPlaying ? 'Auto Playing...' : 'Restart'}
                    </button>

                    <button
                        className="autoplay-btn"
                        onClick={handleAutoPlay}
                        disabled={isAutoPlaying || gameCompleted || totalPoints === 0}
                    >
                        {isAutoPlaying ? 'Auto Playing...' : 'Auto Play'}
                    </button>
                </div>
            </div>
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
