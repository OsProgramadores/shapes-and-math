// Minimal Jest setup for clean testing
import { jest } from '@jest/globals';

// Mock the buttonHandlers module to prevent circular dependencies
jest.unstable_mockModule('js/buttonHandlers.js', () => ({
  setupButtonListeners: jest.fn()
}));

// Mock basic DOM elements
global.document = {
  getElementById: jest.fn(),
  createElement: jest.fn(),
  addEventListener: jest.fn(),
  body: {
    innerHTML: '',
    appendChild: jest.fn(),
  }
};

global.window = {
  requestAnimationFrame: jest.fn(cb => {
    setTimeout(cb, 16);
    return 1;
  }),
  cancelAnimationFrame: jest.fn(),
  innerWidth: 800,
  innerHeight: 600,
};

// Mock Canvas API
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  fillStyle: '',
  strokeStyle: '',
};

global.HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

// Make available globally
global.mockContext = mockContext;
