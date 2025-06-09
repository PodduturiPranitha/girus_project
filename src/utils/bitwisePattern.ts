/**
 * Bitwise Matching Pattern
 * Find the next larger integer with the same number of binary 1s
 */

export function nextLargerWithSameBits(n: number): number {
  if (n <= 0) return -1;

  // Count the number of 1s in the original number
  const originalOnes = countOnes(n);
  
  // Start checking from n + 1
  let candidate = n + 1;
  
  // Keep searching until we find a number with the same number of 1s
  while (countOnes(candidate) !== originalOnes) {
    candidate++;
    // Prevent infinite loop for edge cases
    if (candidate > n * 2) return -1;
  }
  
  return candidate;
}

export function nextLargerOptimized(n: number): number {
  if (n <= 0) return -1;
  
  const bits = n.toString(2).split('').map(Number);
  const len = bits.length;
  
  // Find the rightmost 0 that has at least one 1 to its right
  let i = len - 1;
  while (i >= 0 && bits[i] === 1) i--;
  
  if (i < 0) {
    // All bits are 1, need to add a bit
    const ones = countOnes(n);
    return (1 << (len + 1)) | ((1 << (ones - 1)) - 1);
  }
  
  // Flip the bit at position i
  bits[i] = 1;
  
  // Count 1s to the right of position i
  let onesCount = 0;
  for (let j = i + 1; j < len; j++) {
    if (bits[j] === 1) onesCount++;
    bits[j] = 0;
  }
  
  // Place onesCount - 1 ones at the rightmost positions
  for (let j = len - 1; j >= len - (onesCount - 1); j--) {
    bits[j] = 1;
  }
  
  return parseInt(bits.join(''), 2);
}

function countOnes(n: number): number {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

export function getBinaryRepresentation(n: number): string {
  return n.toString(2);
}

export function generateTestNumbers(): number[] {
  return [6, 12, 15, 23, 31];
}