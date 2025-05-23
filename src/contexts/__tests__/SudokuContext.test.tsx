import { act, render } from '@testing-library/react';
import { Cell, SudokuProvider, useSudoku } from '../SudokuContext';


function TestComponent({ cb }: { cb: (ctx: ReturnType<typeof useSudoku>) => void }) {
  const ctx = useSudoku();
  cb(ctx);
  return null;
}

describe('SudokuContext', () => {
  it('throws if useSudoku is used outside provider', () => {
    const consoleError = console.error;
    console.error = jest.fn();
    try {
      render(<TestComponent cb={() => {}} />);
      fail('Expected render to throw');
    } catch (error: any) {
      expect(error.message).toMatch(/useSudoku must be used within a SudokuProvider/);
    } finally {
      console.error = consoleError;
    }
  });

  it('provides initial board and state', () => {
    let contextValues: any;
    render(
      <SudokuProvider>
        <TestComponent cb={ctx => { contextValues = ctx; }} />
      </SudokuProvider>
    );
    expect(contextValues.board.length).toBe(4);
    expect(contextValues.selectedCell).toBeNull();
    expect(contextValues.time).toBe(0);
    expect(contextValues.score).toBe(0);
    expect(contextValues.isGameActive).toBe(true);
    expect(contextValues.isGameComplete).toBe(false);
  });

  it('setCellValue updates cell and score for correct/incorrect move', () => {
    let contextValues: any;
    render(
      <SudokuProvider>
        <TestComponent cb={ctx => { contextValues = ctx; }} />
      </SudokuProvider>
    );
    // Find a non-fixed cell
    const { board, setCellValue } = contextValues;
    let found = false;
    let row = 0, col = 0;
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (!board[r][c].isFixed) {
          row = r;
          col = c;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    expect(board[row][col].isFixed).toBe(false);
    
    const incorrectValue = board[row].find((cell: Cell) => cell.value !== null)?.value || 1;
    act(() => setCellValue(row, col, incorrectValue));
    expect(contextValues.score).toBe(0);
    

  });

  it('solveBoard fills the board and ends the game', () => {
    let contextValues: any;
    render(
      <SudokuProvider>
        <TestComponent cb={ctx => { contextValues = ctx; }} />
      </SudokuProvider>
    );
    act(() => contextValues.solveBoard());
    expect(contextValues.isGameActive).toBe(false);
    expect(contextValues.isGameComplete).toBe(true);
    contextValues.board.forEach((row: any[]) =>
      row.forEach(cell => expect(cell.isFixed).toBe(true))
    );
  });

  it('newGame resets the board and state', () => {
    let contextValues: any;
    render(
      <SudokuProvider>
        <TestComponent cb={ctx => { contextValues = ctx; }} />
      </SudokuProvider>
    );
    act(() => contextValues.solveBoard());
    act(() => contextValues.newGame());
    expect(contextValues.isGameActive).toBe(true);
    expect(contextValues.isGameComplete).toBe(false);
    expect(contextValues.selectedCell).toBeNull();
    expect(contextValues.time).toBe(0);
    expect(contextValues.score).toBe(0);
  });
}); 