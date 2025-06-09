/**
 * Sudoku Validator With Custom Zones
 * Validates a 9x9 Sudoku board including custom zones
 */

export interface CustomZone {
  cells: [number, number][];
}

export function validateSudoku(board: number[][], customZones: CustomZone[] = []): boolean {
  // Check if board is 9x9
  if (board.length !== 9 || board.some(row => row.length !== 9)) {
    return false;
  }

  // Validate rows
  for (let row = 0; row < 9; row++) {
    if (!isValidGroup(board[row])) {
      return false;
    }
  }

  // Validate columns
  for (let col = 0; col < 9; col++) {
    const column = board.map(row => row[col]);
    if (!isValidGroup(column)) {
      return false;
    }
  }

  // Validate 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box: number[] = [];
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          box.push(board[row][col]);
        }
      }
      if (!isValidGroup(box)) {
        return false;
      }
    }
  }

  // Validate custom zones
  for (const zone of customZones) {
    if (zone.cells.length !== 9) {
      return false;
    }
    
    const zoneValues = zone.cells.map(([row, col]) => {
      if (row < 0 || row >= 9 || col < 0 || col >= 9) {
        return 0; // Invalid position
      }
      return board[row][col];
    });
    
    if (!isValidGroup(zoneValues)) {
      return false;
    }
  }

  return true;
}

function isValidGroup(group: number[]): boolean {
  const seen = new Set<number>();
  
  for (const num of group) {
    if (num < 1 || num > 9) {
      return false;
    }
    if (seen.has(num)) {
      return false;
    }
    seen.add(num);
  }
  
  return seen.size === 9;
}

export function generateSampleBoard(): number[][] {
  return [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
}

export function generateCustomZones(): CustomZone[] {
  return [
    {
      cells: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]
    },
    {
      cells: [[0, 8], [1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1], [8, 0]]
    }
  ];
}