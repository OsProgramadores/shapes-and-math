// Basic test file for torus.js
// This is a simple test to verify the module loads and exports the expected functions
import { torusDraw, torusStop } from '../torus.js';

describe('torus module', () => {
  it('should export torusDraw and torusStop functions', () => {
    expect(typeof torusDraw).toBe('function');
    expect(typeof torusStop).toBe('function');
  });

  it('torusStop should not throw when called without starting', () => {
    expect(() => torusStop()).not.toThrow();
  });
});
