import React from 'react';
import { useSudoku } from '../contexts/SudokuContext';

function SudokuCell({
  cell,
  rowIndex,
  colIndex,
  isSelected,
  onClick,
  onKeyDown
}: {
  cell: any;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const classes = [
    'board-cell',
    isSelected ? 'selected' : '',
    cell.isFixed ? 'fixed' : '',
    rowIndex % 2 === 0 && rowIndex !== 0 ? 'thick-top' : '',
    colIndex % 2 === 0 && colIndex !== 0 ? 'thick-left' : '',
    rowIndex === 0 ? 'thick-outer-top' : '',
    colIndex === 0 ? 'thick-outer-left' : '',
    rowIndex === 3 ? 'thick-outer-bottom' : '',
    colIndex === 3 ? 'thick-outer-right' : '',
  ].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {cell.value}
    </div>
  );
}

function SudokuRow({
  row,
  rowIndex,
  selectedCell,
  setSelectedCell,
  setCellValue
}: {
  row: any[];
  rowIndex: number;
  selectedCell: [number, number] | null;
  setSelectedCell: (pos: [number, number]) => void;
  setCellValue: (row: number, col: number, value: number | null) => void;
}) {
  const handleCellClick = (colIndex: number) => {
    if (!row[colIndex].isFixed) {
      setSelectedCell([rowIndex, colIndex]);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent, colIndex: number) => {
    if (row[colIndex].isFixed) return;
    if (e.key >= '1' && e.key <= '4') {
      setCellValue(rowIndex, colIndex, parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      setCellValue(rowIndex, colIndex, null);
    }
  };
  return (
    <div className="board-row">
      {row.map((cell, colIndex) => (
        <SudokuCell
          key={colIndex}
          cell={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isSelected={selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex}
          onClick={() => handleCellClick(colIndex)}
          onKeyDown={e => handleKeyPress(e, colIndex)}
        />
      ))}
    </div>
  );
}

export function SudokuBoard() {
  const { board, selectedCell, setSelectedCell, setCellValue } = useSudoku();
  return (
    <div className="sudoku-board" tabIndex={0}>
      {board.map((row, rowIndex) => (
        <SudokuRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          setCellValue={setCellValue}
        />
      ))}
    </div>
  );
} 