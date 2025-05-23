import { getRandomIndex, samples } from '../puzzles';

describe('Puzzles Utility', () => {
  describe('samples', () => {
    it('should have valid puzzle and solution pairs', () => {
      samples.forEach((sample) => {
        expect(sample.puzzle.length).toBe(sample.solution.length);
        sample.puzzle.forEach((row, i) => {
          expect(row.length).toBe(sample.solution[i].length);
        });
        
        sample.solution.forEach(row => {
          expect(new Set(row).size).toBe(row.length);
        });
        sample.solution.forEach((row, i) => {
          expect(new Set(row).size).toBe(row.length);
        });
        
      });
    });
  });

  describe('getRandomIndex', () => {
    it('should return a number between 0 and max-1', () => {
      const max = 5;
      const result = getRandomIndex(max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
    });

    it('should handle edge cases', () => {
      expect(getRandomIndex(1)).toBe(0);
      expect(getRandomIndex(0)).toBe(0);
    });
  });
}); 