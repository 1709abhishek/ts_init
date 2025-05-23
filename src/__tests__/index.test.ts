import { add, divide, multiply, subtract } from '../index';

describe('Math functions', () => {
    test('adds two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
    });

    test('subtracts two numbers correctly', () => {
        expect(subtract(3, 2)).toBe(1);
        expect(subtract(1, 1)).toBe(0);
    });

    test('multiplies two numbers correctly', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-1, 1)).toBe(-1);
    });

    test('divides two numbers correctly', () => {
      expect(divide(4,2)).toBe(2);
      expect(divide(9,3)).toBe(3);
      expect(divide(10,0)).toBe(Infinity);
    });
        
}); 