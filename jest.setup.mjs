// Set up global mocks and test environment for Jest
import { jest } from '@jest/globals';

// Mock the global document and window objects
global.document = {
  getElementById: jest.fn((id) => ({
    addEventListener: jest.fn(),
  })),
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

// Mock the global setInterval and clearInterval
global.setInterval = jest.fn();
global.clearInterval = jest.fn();

// Mock the global console to keep test output clean
global.console = {
  ...console,
  // Uncomment to debug
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
};
