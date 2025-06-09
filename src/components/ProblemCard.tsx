import React, { useState } from 'react';
import { Play, Copy, CheckCircle, XCircle, Clock, Cpu } from 'lucide-react';
import { Problem, ProblemResult } from '../types';

interface ProblemCardProps {
  problem: Problem;
  onExecute: (problemId: string, input: any) => ProblemResult;
}

export function ProblemCard({ problem, onExecute }: ProblemCardProps) {
  const [selectedTest, setSelectedTest] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [results, setResults] = useState<ProblemResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const categoryColors: Record<string, string> = {
    validation: 'bg-blue-500',
    graph: 'bg-green-500',
    bitwise: 'bg-purple-500',
    matrix: 'bg-orange-500',
    interpreter: 'bg-pink-500'
  };

  const runAllTests = async () => {
    setIsRunning(true);
    const testResults: ProblemResult[] = [];

    for (const testCase of problem.testCases) {
      const result = onExecute(problem.id, testCase.input);
      testResults.push(result);
      await new Promise(resolve => setTimeout(resolve, 100)); // Visual delay
    }

    setResults(testResults);
    setIsRunning(false);
  };

  const runSingleTest = () => {
    setIsRunning(true);
    const testCase = problem.testCases[selectedTest];
    const result = onExecute(problem.id, testCase.input);
    const newResults = [...results];
    newResults[selectedTest] = result;
    setResults(newResults);
    setIsRunning(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${categoryColors[problem.category] || 'bg-gray-500'}`}>
              {problem.category}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {problem.complexity}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run All Tests'}
          </button>
          <button
            onClick={runSingleTest}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Play size={16} />
            Run Test {selectedTest + 1}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Test Case:
            </label>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {problem.testCases.map((testCase, index) => (
                <option key={index} value={index}>
                  Test {index + 1}: {testCase.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input:
            </label>
            <div className="relative">
              <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto border">
                {JSON.stringify(problem.testCases[selectedTest]?.input, null, 2)}
              </pre>
              <button
                onClick={() => copyToClipboard(JSON.stringify(problem.testCases[selectedTest]?.input, null, 2))}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Results:</h4>
            <div className="grid gap-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    result.success
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="text-green-600\" size={16} />
                      ) : (
                        <XCircle className="text-red-600" size={16} />
                      )}
                      <span className="font-medium">Test {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {result.executionTime.toFixed(2)}ms
                      </div>
                      <div className="flex items-center gap-1">
                        <Cpu size={14} />
                        {result.success ? 'PASS' : 'FAIL'}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Expected:</span>
                      <pre className="bg-white p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(problem.testCases[index]?.expected, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Actual:</span>
                      <pre className={`p-2 rounded mt-1 overflow-x-auto ${
                        result.success ? 'bg-white' : 'bg-red-100'
                      }`}>
                        {result.error ? result.error : JSON.stringify(result.result, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}