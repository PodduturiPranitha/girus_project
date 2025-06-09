/**
 * Alien Dictionary
 * Determine the character order used in an alien language from sorted words
 */

export function alienOrder(words: string[]): string {
  if (words.length === 0) return "";

  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  // Initialize all characters
  for (const word of words) {
    for (const char of word) {
      graph.set(char, new Set());
      inDegree.set(char, 0);
    }
  }

  // Build the graph
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Check if word1 is a prefix of word2 but longer
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return ""; // Invalid ordering
    }

    // Find the first different character
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      const char1 = word1[j];
      const char2 = word2[j];

      if (char1 !== char2) {
        // char1 comes before char2
        if (!graph.get(char1)!.has(char2)) {
          graph.get(char1)!.add(char2);
          inDegree.set(char2, inDegree.get(char2)! + 1);
        }
        break;
      }
    }
  }

  // Topological sort using Kahn's algorithm
  const queue: string[] = [];
  const result: string[] = [];

  // Find all characters with no incoming edges
  for (const [char, degree] of inDegree) {
    if (degree === 0) {
      queue.push(char);
    }
  }

  while (queue.length > 0) {
    const char = queue.shift()!;
    result.push(char);

    // Remove this character and decrease in-degree of neighbors
    for (const neighbor of graph.get(char)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if we have a valid ordering
  if (result.length !== inDegree.size) {
    return ""; // Cycle detected
  }

  return result.join("");
}

export function generateAlienWords(): string[] {
  return ["wrt", "wrf", "er", "ett", "rftt"];
}

export function generateAlienWordsComplex(): string[] {
  return ["z", "x", "z"]; // This should return empty string (invalid)
}