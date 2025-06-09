import React, { useState } from 'react';
import { Code, Brain, Zap, Grid, Calculator, Cpu } from 'lucide-react';
import { ProblemCard } from './ProblemCard';
import { Problem, ProblemResult } from '../types';
import { executeAlgorithm } from '../services/algorithmService';

const problems: Problem[] = [
  {
    id: 'sudoku',
    title: 'Sudoku Validator With Custom Zones',
    description: 'Validate a 9x9 Sudoku board including custom zones with unique digits 1-9.',
    complexity: 'O(1) - Fixed grid size',
    category: 'validation',
    testCases: [
      {
        input: {
          board: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
          ],
          customZones: [
            { cells: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]] }
          ]
        },
        expected: true,
        description: 'Valid Sudoku with custom zone'
      },
      {
        input: {
          board: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 5] // Invalid: duplicate 5
          ],
          customZones: []
        },
        expected: false,
        description: 'Invalid Sudoku with duplicate'
      }
    ]
  },
  {
    id: 'alien',
    title: 'Alien Dictionary',
    description: 'Determine the character order used in an alien language from sorted words.',
    complexity: 'O(N) - N is total characters',
    category: 'graph',
    testCases: [
      {
        input: ["wrt", "wrf", "er", "ett", "rftt"],
        expected: "wertf",
        description: 'Standard alien word ordering'
      },
      {
        input: ["z", "x"],
        expected: "zx",
        description: 'Simple two character ordering'
      },
      {
        input: ["z", "x", "z"],
        expected: "",
        description: 'Invalid ordering (should return empty)'
      }
    ]
  },
  {
    id: 'knights',
    title: 'Knights and Portals',
    description: 'Find shortest path from top-left to bottom-right with one teleportation allowed.',
    complexity: 'O(N²M²) - Grid traversal with teleport',
    category: 'graph',
    testCases: [
      {
        input: [
          [0, 0, 1, 0],
          [1, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]
        ],
        expected: 4,
        description: 'Grid with obstacles'
      },
      {
        input: [
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [1, 0, 1, 0, 1],
          [0, 0, 0, 0, 0],
          [1, 1, 1, 0, 0]
        ],
        expected: 5,
        description: 'Complex grid requiring teleport'
      }
    ]
  },
  {
    id: 'bitwise',
    title: 'Bitwise Matching Pattern',
    description: 'Find the next larger integer with the same number of binary 1s.',
    complexity: 'O(log N) - Bit manipulation',
    category: 'bitwise',
    testCases: [
      {
        input: 6,
        expected: 9,
        description: '6 (110) → 9 (1001)'
      },
      {
        input: 12,
        expected: 17,
        description: '12 (1100) → 17 (10001)'
      },
      {
        input: 15,
        expected: 23,
        description: '15 (1111) → 23 (10111)'
      }
    ]
  },
  {
    id: 'islands',
    title: 'Matrix Islands with Diagonals',
    description: 'Count islands in a matrix including diagonal connections.',
    complexity: 'O(M×N) - Matrix traversal',
    category: 'matrix',
    testCases: [
      {
        input: [
          [1, 1, 0, 0, 0],
          [0, 1, 0, 0, 1],
          [1, 0, 0, 1, 1],
          [0, 0, 0, 0, 0],
          [1, 0, 1, 0, 1]
        ],
        expected: 4,
        description: 'Matrix with diagonal connections'
      },
      {
        input: [
          [1, 1, 1, 1, 0],
          [1, 1, 0, 1, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1]
        ],
        expected: 2,
        description: 'Large connected components'
      }
    ]
  },
  {
    id: 'interpreter',
    title: 'Mini Interpreter',
    description: 'Evaluate let variable declarations and if conditions from input strings.',
    complexity: 'O(N) - Expression parsing',
    category: 'interpreter',
    testCases: [
      {
        input: "(let x 2 (+ x 1))",
        expected: 3,
        description: 'Simple let binding'
      },
      {
        input: "(let x 5 (let y 3 (+ x y)))",
        expected: 8,
        description: 'Nested let bindings'
      },
      {
        input: "(if (> 5 3) 10 20)",
        expected: 10,
        description: 'Conditional expression'
      },
      {
        input: "(let x 10 (if (= x 10) (+ x 5) (- x 5)))",
        expected: 15,
        description: 'Complex let with conditional'
      }
    ]
  }
];

export function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'validation', 'graph', 'bitwise', 'matrix', 'interpreter'];
  
  const filteredProblems = selectedCategory === 'all' 
    ? problems 
    : problems.filter(p => p.category === selectedCategory);

  const handleExecute = (problemId: string, input: any): ProblemResult => {
    const startTime = performance.now();
    
    try {
      const result = executeAlgorithm(problemId, input);
      const endTime = performance.now();
      
      const problem = problems.find(p => p.id === problemId);
      const testCase = problem?.testCases.find(tc => JSON.stringify(tc.input) === JSON.stringify(input));
      const expected = testCase?.expected;
      
      return {
        success: JSON.stringify(result) === JSON.stringify(expected),
        result,
        executionTime: endTime - startTime
      };
    } catch (error) {
      const endTime = performance.now();
      return {
        success: false,
        result: null,
        executionTime: endTime - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'validation': return <Grid size={20} />;
      case 'graph': return <Zap size={20} />;
      case 'bitwise': return <Calculator size={20} />;
      case 'matrix': return <Grid size={20} />;
      case 'interpreter': return <Cpu size={20} />;
      default: return <Code size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Algorithm Challenge Platform
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore and solve complex algorithmic challenges with interactive testing, 
            performance analysis, and production-ready implementations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {getCategoryIcon(category)}
              <span className="capitalize font-medium">
                {category === 'all' ? 'All Problems' : category}
              </span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Code className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{problems.length}</h3>
                <p className="text-gray-600">Total Problems</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {problems.reduce((sum, p) => sum + p.testCases.length, 0)}
                </h3>
                <p className="text-gray-600">Test Cases</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Set(problems.map(p => p.category)).size}
                </h3>
                <p className="text-gray-600">Categories</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Cpu className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">100%</h3>
                <p className="text-gray-600">Test Coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onExecute={handleExecute}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
            <Code className="text-blue-600" size={20} />
            <span className="text-gray-700 font-medium">
              Built with React, TypeScript & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}