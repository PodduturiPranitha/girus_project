# Algorithm Challenge Platform

A comprehensive coding challenge solution platform featuring 6 complex algorithmic problems with interactive testing, performance analysis, and production-ready implementations.

## 🚀 Features

- **Interactive Problem Solving**: Real-time input/output testing with visual feedback
- **Comprehensive Test Suites**: Multiple test cases for each algorithm with edge case coverage
- **Performance Metrics**: Execution time tracking and complexity analysis
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Production-Ready Code**: Clean, modular, and well-documented implementations

## 🧠 Problems Included

### 1. Sudoku Validator With Custom Zones
- **Complexity**: O(1) - Fixed grid size
- **Description**: Validates 9x9 Sudoku boards including custom zones with unique digits 1-9
- **Features**: Standard validation + custom zone verification

### 2. Alien Dictionary
- **Complexity**: O(N) - N is total characters
- **Description**: Determines character order from sorted words in an alien language
- **Algorithm**: Topological sorting using Kahn's algorithm

### 3. Knights and Portals
- **Complexity**: O(N²M²) - Grid traversal with teleport
- **Description**: Finds shortest path with one teleportation allowed between any empty cells
- **Algorithm**: BFS with state tracking for teleport usage

### 4. Bitwise Matching Pattern
- **Complexity**: O(log N) - Bit manipulation
- **Description**: Finds the next larger integer with the same number of binary 1s
- **Algorithm**: Optimized bit manipulation approach

### 5. Matrix Islands with Diagonals
- **Complexity**: O(M×N) - Matrix traversal
- **Description**: Counts islands including diagonal connections
- **Algorithm**: DFS/BFS with 8-directional traversal

### 6. Mini Interpreter (Bonus)
- **Complexity**: O(N) - Expression parsing
- **Description**: Evaluates let variable declarations and if conditions
- **Features**: Recursive descent parser with environment management

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Testing**: Vitest with comprehensive test coverage
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript strict mode

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard with problem navigation
│   └── ProblemCard.tsx  # Individual problem component
├── utils/              # Algorithm implementations
│   ├── sudokuValidator.ts
│   ├── alienDictionary.ts
│   ├── knightsAndPortals.ts
│   ├── bitwisePattern.ts
│   ├── matrixIslands.ts
│   └── miniInterpreter.ts
├── services/           # Business logic
│   └── algorithmService.ts
├── tests/              # Test suites
│   └── algorithms.test.ts
└── types/              # TypeScript definitions
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

The platform includes comprehensive test suites covering:
- Algorithm correctness
- Edge cases and error handling
- Performance validation
- Input/output verification

Run tests with:
```bash
npm run test
```

## 🎯 Algorithm Solutions

### Key Implementation Highlights

1. **Modular Architecture**: Each algorithm is isolated with clear interfaces
2. **Error Handling**: Robust error handling for edge cases
3. **Performance Optimization**: Efficient algorithms with optimal time/space complexity
4. **Type Safety**: Full TypeScript support with strict typing
5. **Test Coverage**: Extensive test suites with multiple scenarios

### Sample Usage

```typescript
import { validateSudoku } from './utils/sudokuValidator';
import { alienOrder } from './utils/alienDictionary';

// Sudoku validation
const board = generateSampleBoard();
const isValid = validateSudoku(board);

// Alien dictionary
const words = ["wrt", "wrf", "er", "ett", "rftt"];
const order = alienOrder(words); // Returns "wertf"
```

## 🎨 Design Features

- **Apple-level aesthetics** with attention to detail
- **Responsive design** for all device sizes
- **Interactive animations** and micro-interactions
- **Color-coded categories** for easy navigation
- **Performance visualizations** with real-time metrics

## 📊 Performance Metrics

Each algorithm execution provides:
- Execution time in milliseconds
- Success/failure status
- Expected vs actual output comparison
- Error messages for debugging

## 🔧 Code Quality

- **ESLint** configuration for consistent code style
- **TypeScript strict mode** for type safety
- **Modular file organization** with single responsibility principle
- **Comprehensive documentation** with inline comments
- **Clean architecture** with separation of concerns

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS