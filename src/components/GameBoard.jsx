import React, { useState, useEffect, useRef } from 'react';
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
    const [notification, setNotification] = useState('');
    const [gameFailed, setGameFailed] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [nextExpectedNumber, setNextExpectedNumber] = useState(1);
    const [fadingCircles, setFadingCircles] = useState(new Set());
    const autoPlayRef = useRef(false);

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        autoPlayRef.current = isAutoPlaying;
    }, [isAutoPlaying]);

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
        setGameFailed(false);
        setGameStarted(false);
        setIsAutoPlaying(false);
        setNextExpectedNumber(1);
        setNotification('Click PLAY to start the game!');
        resetTimer();
        setTimeout(() => setNotification(''), 3000);

    };

    const handlePlay = () => {
        if (!gameStarted) {
            setGameStarted(true);
            startTimer();
            setNotification('Game started! Click numbers in order from 1 to ' + numberOfPoints);
            setTimeout(() => setNotification(''), 3000);
        } else {
            // Replay
            initializeGame();
        }
    };

    const handleCircleClick = (id) => {
        if (isAutoPlaying || !gameStarted || gameCompleted || gameFailed) return;
        if (id !== nextExpectedNumber) {
            setGameFailed(true);
            stopTimer();
            setNotification(`❌ Game Failed! Expected ${nextExpectedNumber} but clicked ${id}. Click REPLAY to try again.`);
            return;
        }

        setFadingCircles(prev => new Set([...prev, id]));

        setTimeout(() => {
            setCircles(prevCircles =>
                prevCircles.map(circle =>
                    circle.id === id ? { ...circle, visible: false } : circle
                )
            );
            setFadingCircles(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 2500);


        setNextExpectedNumber(prev => prev + 1);
        setTimeout(() => setNotification(''), 2000);
    };


    const handleNumberOfPointsChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 100) {
            setNumberOfPoints(value);
            // Tự động reset game với số điểm mới
            const newCircles = generateCircles(value);
            setCircles(newCircles);
            setGameCompleted(false);
            setGameFailed(false);
            setGameStarted(false);
            setIsAutoPlaying(false);
            setNextExpectedNumber(1);
            resetTimer();
            setNotification(`Number of points set to ${value}. Click PLAY to start!`);
            setTimeout(() => setNotification(''), 2000);
        }
    };

    const handleAutoPlay = () => {
        if (!gameStarted) return;

        if (isAutoPlaying) {
            // Dừng auto play
            setIsAutoPlaying(false);
            setNotification('Auto play stopped. Continue playing manually!');
            setTimeout(() => setNotification(''), 2000);
            return;
        }

        // Bắt đầu auto play
        setIsAutoPlaying(true);
        setNotification('Auto play started! Click again to stop...');

        const visibleCircles = circles.filter(circle => circle.visible)
            .sort((a, b) => a.id - b.id)
            .filter(circle => circle.id >= nextExpectedNumber);

        let autoPlayIndex = 0;

        const playNext = () => {
            // Kiểm tra nếu auto play đã bị dừng
            if (!autoPlayRef.current || autoPlayIndex >= visibleCircles.length) {
                setIsAutoPlaying(false);
                return;
            }

            const circle = visibleCircles[autoPlayIndex];

            // Bắt đầu fade effect
            setFadingCircles(prev => new Set([...prev, circle.id]));

            // Sau 2.5s thì ẩn hoàn toàn
            setTimeout(() => {
                setCircles(prevCircles =>
                    prevCircles.map(c =>
                        c.id === circle.id ? { ...c, visible: false } : c
                    )
                );
                setFadingCircles(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(circle.id);
                    return newSet;
                });
            }, 2500);

            setNextExpectedNumber(circle.id + 1);
            autoPlayIndex++;
            if (autoPlayIndex < visibleCircles.length && autoPlayRef.current) {
                setTimeout(playNext, 1500);
            } else {
                setIsAutoPlaying(false);
            }
        };

        setTimeout(playNext, 500);
        setTimeout(() => {
            if (notification.includes('Auto play started')) {
                setNotification('');
            }
        }, 2000);
    };

    const visibleCircles = circles.filter(circle => circle.visible);
    const totalPoints = visibleCircles.length;

    return (
        <div className="game-board-container">
            {notification && (
                <div className="notification-bar">
                    <span className="notification-text">{notification}</span>
                </div>
            )}
            <div className="game-controls">
                <div className="input-control">
                    <label htmlFor="points-input">Number of Points:</label>
                    <input
                        id="points-input"
                        type="number"
                        min="1"
                        max="100"
                        value={numberOfPoints}
                        onChange={handleNumberOfPointsChange}
                        disabled={isAutoPlaying}
                    />
                </div>

                <span className="input-hint">(1-100)</span>

                <div className="action-buttons">
                    <button
                        className="play-btn"
                        onClick={handlePlay}
                        disabled={isAutoPlaying}
                    >
                        {!gameStarted ? 'PLAY' : 'REPLAY'}
                    </button>

                    {gameStarted && !gameCompleted && !gameFailed && (
                        <button
                            className={`autoplay-btn ${isAutoPlaying ? 'stop' : ''}`}
                            onClick={handleAutoPlay}
                            disabled={totalPoints === 0}
                        >
                            {isAutoPlaying ? 'Stop Auto Play' : 'Auto Play'}
                        </button>
                    )}
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

                <div className="stat-item">
                    <span className="stat-label">Next:</span>
                    <span className="stat-value">{gameStarted && !gameCompleted && !gameFailed ? nextExpectedNumber : '-'}</span>
                </div>

            </div>

            <div className="game-board">
                {gameCompleted && (
                    <div className="all-cleared-overlay">
                        <div className="all-cleared-message">
                            <h2>🎉 ALL CLEARED! 🎉</h2>
                            <p>Completed in {time} seconds!</p>
                            <button className="play-again-btn" onClick={handlePlay}>
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameFailed && (
                    <div className="all-cleared-overlay">
                        <div className="all-cleared-message failed">
                            <h2>❌ GAME FAILED! ❌</h2>
                            <p>Wrong sequence! Expected {nextExpectedNumber}</p>
                            <button className="play-again-btn" onClick={handlePlay}>
                                Try Again
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
                                disabled={isAutoPlaying || !gameStarted || gameCompleted || gameFailed}
                                isNextExpected={circle.id === nextExpectedNumber && gameStarted && !gameCompleted && !gameFailed}
                                isFading={fadingCircles.has(circle.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
