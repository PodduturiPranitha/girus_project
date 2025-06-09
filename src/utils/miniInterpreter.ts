/**
 * Mini Interpreter
 * Evaluate let variable declarations and if conditions
 */

interface Environment {
  [key: string]: number;
}

export function interpret(expression: string): number {
  const env: Environment = {};
  return evaluate(expression.trim(), env);
}

function evaluate(expr: string, env: Environment): number {
  expr = expr.trim();
  
  // Handle parentheses
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return evaluate(expr.slice(1, -1), env);
  }
  
  // Handle numbers
  if (/^-?\d+$/.test(expr)) {
    return parseInt(expr);
  }
  
  // Handle variables
  if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
    if (env.hasOwnProperty(expr)) {
      return env[expr];
    }
    throw new Error(`Undefined variable: ${expr}`);
  }
  
  // Handle let expressions
  if (expr.startsWith('(let ')) {
    return evaluateLet(expr, env);
  }
  
  // Handle if expressions
  if (expr.startsWith('(if ')) {
    return evaluateIf(expr, env);
  }
  
  // Handle arithmetic operations
  if (expr.startsWith('(')) {
    return evaluateOperation(expr, env);
  }
  
  throw new Error(`Invalid expression: ${expr}`);
}

function evaluateLet(expr: string, env: Environment): number {
  // Remove outer parentheses and 'let'
  const inner = expr.slice(5, -1).trim();
  
  // Find the assignments and body
  const parts = parseLetExpression(inner);
  const { assignments, body } = parts;
  
  // Create new environment
  const newEnv = { ...env };
  
  // Process assignments
  for (const assignment of assignments) {
    const [variable, valueExpr] = assignment;
    newEnv[variable] = evaluate(valueExpr, newEnv);
  }
  
  return evaluate(body, newEnv);
}

function evaluateIf(expr: string, env: Environment): number {
  // Remove outer parentheses and 'if'
  const inner = expr.slice(4, -1).trim();
  
  const parts = parseIfExpression(inner);
  const { condition, thenExpr, elseExpr } = parts;
  
  const conditionValue = evaluate(condition, env);
  
  if (conditionValue !== 0) {
    return evaluate(thenExpr, env);
  } else {
    return evaluate(elseExpr, env);
  }
}

function evaluateOperation(expr: string, env: Environment): number {
  const inner = expr.slice(1, -1).trim();
  const tokens = tokenize(inner);
  
  if (tokens.length < 2) {
    throw new Error(`Invalid operation: ${expr}`);
  }
  
  const operator = tokens[0];
  const operands = tokens.slice(1);
  
  switch (operator) {
    case '+':
      return operands.reduce((sum, operand) => sum + evaluate(operand, env), 0);
    case '-':
      if (operands.length === 1) {
        return -evaluate(operands[0], env);
      }
      return operands.reduce((diff, operand, index) => 
        index === 0 ? evaluate(operand, env) : diff - evaluate(operand, env));
    case '*':
      return operands.reduce((product, operand) => product * evaluate(operand, env), 1);
    case '/':
      return operands.reduce((quotient, operand, index) => 
        index === 0 ? evaluate(operand, env) : quotient / evaluate(operand, env));
    case '=':
      if (operands.length !== 2) {
        throw new Error('Equality operator requires exactly 2 operands');
      }
      return evaluate(operands[0], env) === evaluate(operands[1], env) ? 1 : 0;
    case '<':
      if (operands.length !== 2) {
        throw new Error('Less than operator requires exactly 2 operands');
      }
      return evaluate(operands[0], env) < evaluate(operands[1], env) ? 1 : 0;
    case '>':
      if (operands.length !== 2) {
        throw new Error('Greater than operator requires exactly 2 operands');
      }
      return evaluate(operands[0], env) > evaluate(operands[1], env) ? 1 : 0;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

function parseLetExpression(expr: string): { assignments: [string, string][], body: string } {
  const assignments: [string, string][] = [];
  let i = 0;
  
  // Skip whitespace
  while (i < expr.length && /\s/.test(expr[i])) i++;
  
  // Parse assignments
  while (i < expr.length) {
    // Skip whitespace
    while (i < expr.length && /\s/.test(expr[i])) i++;
    
    if (i >= expr.length) break;
    
    // Check if this looks like a variable assignment
    const varMatch = expr.slice(i).match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s+/);
    if (!varMatch) break;
    
    const variable = varMatch[1];
    i += varMatch[0].length;
    
    // Parse the value expression
    const valueStart = i;
    let parenCount = 0;
    let valueEnd = i;
    
    while (valueEnd < expr.length) {
      const char = expr[valueEnd];
      if (char === '(') {
        parenCount++;
      } else if (char === ')') {
        parenCount--;
      } else if (parenCount === 0 && /\s/.test(char)) {
        // Check if next non-whitespace is a variable name (next assignment) or end
        let nextNonSpace = valueEnd + 1;
        while (nextNonSpace < expr.length && /\s/.test(expr[nextNonSpace])) nextNonSpace++;
        
        if (nextNonSpace < expr.length) {
          const nextToken = expr.slice(nextNonSpace).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
          if (nextToken) {
            break; // This is the start of the next assignment or body
          }
        }
      }
      valueEnd++;
    }
    
    const value = expr.slice(valueStart, valueEnd).trim();
    if (value) {
      assignments.push([variable, value]);
      i = valueEnd;
    } else {
      break;
    }
  }
  
  // The rest is the body
  const body = expr.slice(i).trim();
  
  return { assignments, body };
}

function parseIfExpression(expr: string): { condition: string, thenExpr: string, elseExpr: string } {
  let i = 0;
  let parenCount = 0;
  const parts: string[] = [];
  let currentPart = '';
  
  while (i < expr.length) {
    const char = expr[i];
    
    if (char === '(') {
      parenCount++;
      currentPart += char;
    } else if (char === ')') {
      parenCount--;
      currentPart += char;
    } else if (parenCount === 0 && /\s/.test(char)) {
      if (currentPart.trim()) {
        parts.push(currentPart.trim());
        currentPart = '';
      }
    } else {
      currentPart += char;
    }
    
    i++;
  }
  
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }
  
  if (parts.length !== 3) {
    throw new Error('If expression must have exactly 3 parts: condition, then, else');
  }
  
  return {
    condition: parts[0],
    thenExpr: parts[1],
    elseExpr: parts[2]
  };
}

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  
  while (i < expr.length) {
    // Skip whitespace
    while (i < expr.length && /\s/.test(expr[i])) i++;
    
    if (i >= expr.length) break;
    
    let token = '';
    
    if (expr[i] === '(') {
      // Handle nested expressions
      let parenCount = 1;
      token += expr[i++];
      
      while (i < expr.length && parenCount > 0) {
        if (expr[i] === '(') parenCount++;
        else if (expr[i] === ')') parenCount--;
        token += expr[i++];
      }
    } else {
      // Handle regular tokens
      while (i < expr.length && !/\s/.test(expr[i])) {
        token += expr[i++];
      }
    }
    
    if (token) tokens.push(token);
  }
  
  return tokens;
}

export function generateSampleExpressions(): string[] {
  return [
    "(let x 2 (+ x 1))",
    "(let x 5 (let y 3 (+ x y)))",
    "(if (> 5 3) 10 20)",
    "(let x 10 (if (= x 10) (+ x 5) (- x 5)))",
    "(let a 1 (let b 2 (let c 3 (+ a (+ b c)))))"
  ];
}