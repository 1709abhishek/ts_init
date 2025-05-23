import { fireEvent, render, screen } from '@testing-library/react';
import { SudokuBoard } from '../SudokuBoard';

jest.mock('../../contexts/SudokuContext', () => ({
  useSudoku: () => mockContext,
}));

const mockSetSelectedCell = jest.fn();
const mockSetCellValue = jest.fn();

const mockContext = {
  board: [
    [
      { value: 1, isFixed: true },
      { value: null, isFixed: false },
      { value: 2, isFixed: false },
      { value: 3, isFixed: false },
    ],
    [
      { value: null, isFixed: false },
      { value: 4, isFixed: true },
      { value: null, isFixed: false },
      { value: 2, isFixed: false },
    ],
    [
      { value: null, isFixed: false },
      { value: 1, isFixed: false },
      { value: null, isFixed: false },
      { value: 4, isFixed: false },
    ],
    [
      { value: 4, isFixed: true },
      { value: null, isFixed: false },
      { value: 2, isFixed: false },
      { value: null, isFixed: false },
    ],
  ],
  selectedCell: [1, 2],
  setSelectedCell: mockSetSelectedCell,
  setCellValue: mockSetCellValue,
};

describe('SudokuBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the board with correct number of rows and cells', () => {
    render(<SudokuBoard />);
    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
  });

  it('highlights the selected cell', () => {
    render(<SudokuBoard />);
    const rows = screen.getAllByRole('row');
    const selectedCell = rows[1].children[2];
    expect(selectedCell.className).toMatch(/selected/);
  });

  it('calls setSelectedCell when a non-fixed cell is clicked', () => {
    render(<SudokuBoard />);
    const rows = screen.getAllByRole('row');
    const cell = rows[1].children[2];
    fireEvent.click(cell);
    expect(mockSetSelectedCell).toHaveBeenCalledWith([1, 2]);
  });

  it('does not call setSelectedCell when a fixed cell is clicked', () => {
    render(<SudokuBoard />);
    const rows = screen.getAllByRole('row');
    const cell = rows[0].children[0];
    fireEvent.click(cell);
    expect(mockSetSelectedCell).not.toHaveBeenCalled();
  });

  it('calls setCellValue on keydown for editable cell', () => {
    render(<SudokuBoard />);
    const rows = screen.getAllByRole('row');
    const cell = rows[1].children[2];
    (cell as HTMLElement).focus();
    fireEvent.keyDown(cell, { key: '3' });
    expect(mockSetCellValue).toHaveBeenCalledWith(1, 2, 3);
    fireEvent.keyDown(cell, { key: 'Backspace' });
    expect(mockSetCellValue).toHaveBeenCalledWith(1, 2, null);
  });
}); 