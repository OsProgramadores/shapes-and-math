// Jest setup for testing with DOM and Canvas
import { jest } from '@jest/globals';

// Mock the buttonHandlers module to prevent circular dependencies
jest.unstable_mockModule('@/buttonHandlers.js', () => ({
  setupButtonListeners: jest.fn()
}));

// Mock the app.js module
jest.unstable_mockModule('@/app.js', () => ({
  setupCanvas: jest.fn().mockReturnValue([
    { width: 800, height: 600, getContext: () => ({
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      fillStyle: '',
      strokeStyle: ''
    })},
    { clearRect: jest.fn() }
  ]),
  get_random_color: jest.fn().mockReturnValue('#ffffff'),
  getQuantityOfDotsSelectedByUser: jest.fn().mockReturnValue(10)
}));

// Mock the appState module
jest.unstable_mockModule('@/state/appState.js', () => ({
  setLastFunction: jest.fn(),
  registerInterval: jest.fn((fn) => setInterval(fn, 100)),
  registerAnimationFrame: jest.fn((fn) => requestAnimationFrame(fn)),
  clearAllIntervals: jest.fn(() => {
    const maxIntervalId = setInterval(() => {}, 10000);
    for (let i = 0; i < maxIntervalId; i++) {
      clearInterval(i);
    }
  }),
  getLastFunction: jest.fn(),
  resetState: jest.fn()
}));

// Mock basic DOM elements
global.document = {
  getElementById: jest.fn().mockImplementation((id) => ({
    id,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    value: '',
    checked: false
  })),
  createElement: jest.fn().mockImplementation((tagName) => ({
    tagName: tagName.toUpperCase(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    setAttribute: jest.fn(),
    style: {},
    getContext: () => ({
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn()
    })
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  body: {
    innerHTML: '',
    appendChild: jest.fn(),
    style: {}
  },
  documentElement: {
    style: {}
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
