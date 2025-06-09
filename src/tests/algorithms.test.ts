/**
 * Comprehensive test suite for all algorithm implementations
 */

import { describe, test, expect } from 'vitest';
import { validateSudoku, generateSampleBoard, generateCustomZones } from '../utils/sudokuValidator';
import { alienOrder } from '../utils/alienDictionary';
import { shortestPathWithTeleport } from '../utils/knightsAndPortals';
import { nextLargerOptimized, getBinaryRepresentation } from '../utils/bitwisePattern';
import { countIslandsWithDiagonals } from '../utils/matrixIslands';
import { interpret } from '../utils/miniInterpreter';

describe('Sudoku Validator', () => {
  test('validates correct sudoku board', () => {
    const board = generateSampleBoard();
    expect(validateSudoku(board)).toBe(true);
  });

  test('validates sudoku with custom zones', () => {
    const board = generateSampleBoard();
    const zones = generateCustomZones();
    expect(validateSudoku(board, zones)).toBe(true);
  });

  test('rejects invalid sudoku board', () => {
    const invalidBoard = generateSampleBoard();
    invalidBoard[0][0] = invalidBoard[0][1]; // Create duplicate
    expect(validateSudoku(invalidBoard)).toBe(false);
  });

  test('handles empty or invalid input', () => {
    expect(validateSudoku([])).toBe(false);
    expect(validateSudoku([[1, 2, 3]])).toBe(false);
  });
});

describe('Alien Dictionary', () => {
  test('determines correct character order', () => {
    expect(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])).toBe("wertf");
  });

  test('handles simple two character case', () => {
    expect(alienOrder(["z", "x"])).toBe("zx");
  });

  test('detects invalid ordering', () => {
    expect(alienOrder(["z", "x", "z"])).toBe("");
  });

  test('handles single word', () => {
    expect(alienOrder(["abc"])).toBe("abc");
  });

  test('handles empty input', () => {
    expect(alienOrder([])).toBe("");
  });
});

describe('Knights and Portals', () => {
  test('finds shortest path with teleport', () => {
    const grid = [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    expect(shortestPathWithTeleport(grid)).toBe(4);
  });

  test('handles unreachable destination', () => {
    const grid = [
      [0, 1],
      [1, 0]
    ];
    expect(shortestPathWithTeleport(grid)).toBe(-1);
  });

  test('handles direct path without teleport needed', () => {
    const grid = [
      [0, 0],
      [0, 0]
    ];
    expect(shortestPathWithTeleport(grid)).toBe(2);
  });
});

describe('Bitwise Pattern Matching', () => {
  test('finds next larger number with same bit count', () => {
    expect(nextLargerOptimized(6)).toBe(9); // 110 -> 1001
    expect(nextLargerOptimized(12)).toBe(17); // 1100 -> 10001
    expect(nextLargerOptimized(15)).toBe(23); // 1111 -> 10111
  });

  test('handles edge cases', () => {
    expect(nextLargerOptimized(1)).toBe(2); // 1 -> 10
    expect(nextLargerOptimized(2)).toBe(4); // 10 -> 100
  });

  test('binary representation helper works', () => {
    expect(getBinaryRepresentation(6)).toBe("110");
    expect(getBinaryRepresentation(9)).toBe("1001");
  });
});

describe('Matrix Islands with Diagonals', () => {
  test('counts islands correctly with diagonal connections', () => {
    const matrix = [
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1]
    ];
    expect(countIslandsWithDiagonals(matrix)).toBe(4);
  });

  test('handles single island', () => {
    const matrix = [
      [1, 1],
      [1, 1]
    ];
    expect(countIslandsWithDiagonals(matrix)).toBe(1);
  });

  test('handles no islands', () => {
    const matrix = [
      [0, 0],
      [0, 0]
    ];
    expect(countIslandsWithDiagonals(matrix)).toBe(0);
  });

  test('handles empty matrix', () => {
    expect(countIslandsWithDiagonals([])).toBe(0);
    expect(countIslandsWithDiagonals([[]])).toBe(0);
  });
});

describe('Mini Interpreter', () => {
  test('evaluates simple let expressions', () => {
    expect(interpret("(let x 2 (+ x 1))")).toBe(3);
    expect(interpret("(let x 5 (let y 3 (+ x y)))")).toBe(8);
  });

  test('evaluates if expressions', () => {
    expect(interpret("(if (> 5 3) 10 20)")).toBe(10);
    expect(interpret("(if (< 5 3) 10 20)")).toBe(20);
  });

  test('handles complex nested expressions', () => {
    expect(interpret("(let x 10 (if (= x 10) (+ x 5) (- x 5)))")).toBe(15);
  });

  test('evaluates arithmetic operations', () => {
    expect(interpret("(+ 1 2 3)")).toBe(6);
    expect(interpret("(* 2 3 4)")).toBe(24);
    expect(interpret("(- 10 3)")).toBe(7);
  });

  test('handles comparison operations', () => {
    expect(interpret("(= 5 5)")).toBe(1);
    expect(interpret("(= 5 4)")).toBe(0);
    expect(interpret("(> 5 3)")).toBe(1);
    expect(interpret("(< 5 3)")).toBe(0);
  });
});