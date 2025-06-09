/**
 * Matrix Islands with Diagonals
 * Count islands in a matrix including diagonal connections
 */

export function countIslandsWithDiagonals(matrix: number[][]): number {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
  let islandCount = 0;

  // 8 directions: horizontal, vertical, and diagonal
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  function dfs(row: number, col: number): void {
    if (row < 0 || row >= rows || col < 0 || col >= cols || 
        visited[row][col] || matrix[row][col] === 0) {
      return;
    }

    visited[row][col] = true;

    // Explore all 8 directions
    for (const [dr, dc] of directions) {
      dfs(row + dr, col + dc);
    }
  }

  // Count islands
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 1 && !visited[row][col]) {
        dfs(row, col);
        islandCount++;
      }
    }
  }

  return islandCount;
}

export function countIslandsBFS(matrix: number[][]): number {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
  let islandCount = 0;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  function bfs(startRow: number, startCol: number): void {
    const queue: [number, number][] = [[startRow, startCol]];
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
            !visited[newRow][newCol] && matrix[newRow][newCol] === 1) {
          visited[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 1 && !visited[row][col]) {
        bfs(row, col);
        islandCount++;
      }
    }
  }

  return islandCount;
}

export function generateIslandMatrix(): number[][] {
  return [
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1]
  ];
}

export function generateComplexIslandMatrix(): number[][] {
  return [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1]
  ];
}