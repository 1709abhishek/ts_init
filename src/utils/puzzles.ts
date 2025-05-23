export type SudokuPuzzle = (number | null)[][];

export interface SudokuSample {
  puzzle: SudokuPuzzle;
  solution: number[][];
}

export const samples: SudokuSample[] = [
  {
    puzzle: [
      [1, null, 4, null],
      [null, 4, null, 2],
      [null, 1, null, 4],
      [4, null, 2, null],
    ],
    solution: [
      [1, 2, 4, 3],
      [3, 4, 1, 2],
      [2, 1, 3, 4],
      [4, 3, 2, 1],
    ],
  },
  {
    puzzle: [
      [null, 2, null, 4],
      [1, null, 2, null],
      [null, 1, null, 2],
      [2, null, 4, null],
    ],
    solution: [
      [3, 2, 1, 4],
      [1, 4, 2, 3],
      [4, 1, 3, 2],
      [2, 3, 4, 1],
    ],
  },
  {
    puzzle: [
      [null, 1, null, 2],
      [2, null, 1, null],
      [null, 4, null, 3],
      [3, null, 4, null],
    ],
    solution: [
      [4, 1, 3, 2],
      [2, 3, 1, 4],
      [1, 4, 2, 3],
      [3, 2, 4, 1],
    ],
  },
  {
    puzzle: [
      [null, null, 2, 1],
      [1, null, null, 4],
      [null, 4, null, 3],
      [3, 1, null, null],
    ],
    solution: [
      [4, 3, 2, 1],
      [1, 2, 3, 4],
      [2, 4, 1, 3],
      [3, 1, 4, 2],
    ],
  },
];


export function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
} 