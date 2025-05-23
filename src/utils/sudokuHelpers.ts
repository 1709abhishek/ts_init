import type { Cell } from '../contexts/SudokuContext';

export function checkMove(board: Cell[][], row: number, col: number, value: number): boolean {
  for (let i = 0; i < 4; i++) {
    if (i !== col && board[row][i].value === value) return false;
  }
  for (let i = 0; i < 4; i++) {
    if (i !== row && board[i][col].value === value) return false;
  }
  const boxRow = Math.floor(row / 2) * 2;
  const boxCol = Math.floor(col / 2) * 2;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (boxRow + i !== row && boxCol + j !== col && 
          board[boxRow + i][boxCol + j].value === value) {
        return false;
      }
    }
  }
  return true;
}

export function checkGameComplete(board: Cell[][]): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j].value === null) return false;
    }
  }
  return true;
} 