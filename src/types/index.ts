export interface ProblemResult {
  success: boolean;
  result: any;
  executionTime: number;
  error?: string;
}

export interface TestCase {
  input: any;
  expected: any;
  description: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  complexity: string;
  category: string;
  testCases: TestCase[];
}