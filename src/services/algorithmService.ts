import { validateSudoku } from '../utils/sudokuValidator';
import { alienOrder } from '../utils/alienDictionary';
import { shortestPathWithTeleport } from '../utils/knightsAndPortals';
import { nextLargerOptimized } from '../utils/bitwisePattern';
import { countIslandsWithDiagonals } from '../utils/matrixIslands';
import { interpret } from '../utils/miniInterpreter';

export function executeAlgorithm(problemId: string, input: any): any {
  switch (problemId) {
    case 'sudoku':
      return validateSudoku(input.board, input.customZones);
      
    case 'alien':
      return alienOrder(input);
      
    case 'knights':
      return shortestPathWithTeleport(input);
      
    case 'bitwise':
      return nextLargerOptimized(input);
      
    case 'islands':
      return countIslandsWithDiagonals(input);
      
    case 'interpreter':
      return interpret(input);
      
    default:
      throw new Error(`Unknown problem ID: ${problemId}`);
  }
}