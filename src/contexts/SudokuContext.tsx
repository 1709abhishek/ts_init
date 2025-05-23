import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getRandomIndex, samples } from '../utils/puzzles';
import { checkGameComplete, checkMove } from '../utils/sudokuHelpers';

export interface Cell {
  value: number | null;
  isFixed: boolean;
}

interface SudokuContextType {
  board: Cell[][];
  selectedCell: [number, number] | null;
  setSelectedCell: (position: [number, number] | null) => void;
  setCellValue: (row: number, col: number, value: number | null) => void;
  solveBoard: () => void;
  newGame: () => void;
  time: number;
  score: number;
  isGameActive: boolean;
  isGameComplete: boolean;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export function SudokuProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(() => getRandomIndex(samples.length));
  const [board, setBoard] = useState<Cell[][]>(() => {
    return samples[currentIndex].puzzle.map(row =>
      row.map(value => ({
        value,
        isFixed: value !== null
      }))
    );
  });
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isGameActive) {
      timer = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  const setCellValue = (row: number, col: number, value: number | null) => {
    if (board[row][col].isFixed) return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      newBoard[row][col] = {
        ...newBoard[row][col],
        value
      };
      
      // Check if the move is correct and update score
      if (value !== null) {
        const isCorrect = checkMove(newBoard, row, col, value);
        if (isCorrect) {
          setScore(prev => prev + 10);
          // Check if game is complete after a correct move
          if (checkGameComplete(newBoard)) {
            setIsGameComplete(true);
            setIsGameActive(false);
          }
        } else {
          setScore(prev => Math.max(0, prev - 5));
        }
      }
      
      return newBoard;
    });
  };

  const solveBoard = () => {
    setIsGameActive(false);
    setIsGameComplete(true);
    const solution = samples[currentIndex].solution;
    setBoard(solution.map(row => 
      row.map(value => ({
        value,
        isFixed: true
      }))
    ));
  };

  const newGame = () => {
    const idx = getRandomIndex(samples.length);
    setCurrentIndex(idx);
    setBoard(samples[idx].puzzle.map(row => 
      row.map(value => ({
        value,
        isFixed: value !== null
      }))
    ));
    setSelectedCell(null);
    setTime(0);
    setScore(0);
    setIsGameActive(true);
    setIsGameComplete(false);
  };

  return (
    <SudokuContext.Provider value={{
      board,
      selectedCell,
      setSelectedCell,
      setCellValue,
      solveBoard,
      newGame,
      time,
      score,
      isGameActive,
      isGameComplete
    }}>
      {children}
    </SudokuContext.Provider>
  );
}

export function useSudoku() {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
} 