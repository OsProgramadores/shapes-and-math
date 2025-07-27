// Using CommonJS for Jest setup
// Note: 'jest' is already available globally in Jest's environment

// Mock the global document and window objects
global.document = {
  getElementById: jest.fn(),
  addEventListener: jest.fn(),
  body: {
    innerHTML: '',
    appendChild: jest.fn(),
  },
  createElement: jest.fn().mockImplementation((tagName) => ({
    tagName: tagName.toUpperCase(),
    addEventListener: jest.fn(),
    appendChild: jest.fn(),
    style: {},
  })),
};

global.window = {
  requestAnimationFrame: jest.fn((callback) => {
    if (typeof callback === 'function') {
      callback();
    }
    return 1;
  }),
  cancelAnimationFrame: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  innerWidth: 1024,
  innerHeight: 768,
};

// Mock the CanvasRenderingContext2D
const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
};

// Mock the HTMLCanvasElement
global.HTMLCanvasElement = class {
  getContext() {
    return mockContext;
  }
};

// Make mockContext available globally for tests
global.mockContext = mockContext;
