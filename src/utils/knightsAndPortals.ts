/**
 * Knights and Portals
 * Find shortest path with one teleportation allowed between any two empty cells
 */

interface Position {
  row: number;
  col: number;
}

interface State {
  pos: Position;
  teleportUsed: boolean;
  distance: number;
}

export function shortestPathWithTeleport(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  
  if (rows === 0 || cols === 0) return -1;
  if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) return -1;

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const queue: State[] = [];
  const visited = new Set<string>();

  queue.push({ pos: { row: 0, col: 0 }, teleportUsed: false, distance: 0 });
  visited.add(`0,0,false`);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { pos, teleportUsed, distance } = current;

    // Check if we reached the destination
    if (pos.row === rows - 1 && pos.col === cols - 1) {
      return distance;
    }

    // Regular movement
    for (const [dr, dc] of directions) {
      const newRow = pos.row + dr;
      const newCol = pos.col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 0) {
        const stateKey = `${newRow},${newCol},${teleportUsed}`;
        if (!visited.has(stateKey)) {
          visited.add(stateKey);
          queue.push({
            pos: { row: newRow, col: newCol },
            teleportUsed,
            distance: distance + 1
          });
        }
      }
    }

    // Teleportation (if not used yet)
    if (!teleportUsed) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 0 && (r !== pos.row || c !== pos.col)) {
            const stateKey = `${r},${c},true`;
            if (!visited.has(stateKey)) {
              visited.add(stateKey);
              queue.push({
                pos: { row: r, col: c },
                teleportUsed: true,
                distance: distance + 1
              });
            }
          }
        }
      }
    }
  }

  return -1; // No path found
}

export function generateSampleGrid(): number[][] {
  return [
    [0, 0, 1, 0],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ];
}

export function generateComplexGrid(): number[][] {
  return [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];
}