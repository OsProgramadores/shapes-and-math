// Basic test file for torus.js
// This is a simple test to verify the module loads and exports the expected functions
import { drawTorus, stopTorus } from '@/visualizations/torus.js';

describe('torus module', () => {
  it('should export drawTorus and stopTorus functions', () => {
    expect(typeof drawTorus).toBe('function');
    expect(typeof stopTorus).toBe('function');
  });

  it('stopTorus should not throw when called without starting', () => {
    expect(() => stopTorus()).not.toThrow();
  });
});
