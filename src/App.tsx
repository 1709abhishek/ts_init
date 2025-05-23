import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { SudokuBoard } from './components/SudokuBoard';
import { SudokuProvider, useSudoku } from './contexts/SudokuContext';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function GameStats() {
  const { time, score } = useSudoku();
  return (
    <div className="game-stats">
      <div className="stat">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{formatTime(time)}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Score:</span>
        <span className="stat-value">{score}</span>
      </div>
    </div>
  );
}

function GameControls() {
  const { solveBoard, newGame } = useSudoku();
  return (
    <div className="game-controls">
      <button onClick={solveBoard}>Solve</button>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

function GameContent() {
  const { isGameComplete } = useSudoku();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showCongrats, setShowCongrats] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isGameComplete) {
      setShowCongrats(true);
    }
  }, [isGameComplete]);

  return (
    <div className="app">
      {isGameComplete && showCongrats && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
          />
          <div className="completion-message">
            <h2>Congratulations! 🎉</h2>
            <p>You've completed the puzzle!</p>
            <button className="close-congrats" onClick={() => setShowCongrats(false)}>
              Close
            </button>
          </div>
        </>
      )}
      <h1>4x4 Sudoku</h1>
      <GameStats />
      <SudokuBoard />
      <GameControls />
    </div>
  );
}

export default function App() {
  return (
    <SudokuProvider>
      <GameContent />
    </SudokuProvider>
  );
} 