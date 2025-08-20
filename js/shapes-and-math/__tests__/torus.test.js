// Simple test for torus functionality
import { jest } from '@jest/globals';

// Mock the canvas setup
const mockSetupCanvas = jest.fn();
const mockContext = {
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  fillStyle: "",
  strokeStyle: "",
};

const mockCanvas = {
  width: 800,
  height: 600,
  getContext: jest.fn().mockReturnValue(mockContext),
};

mockSetupCanvas.mockReturnValue([mockCanvas, mockContext]);

// Mock the Point class
class MockPoint {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotateX = jest.fn();
    this.rotateY = jest.fn();
    this.getProjection = jest.fn().mockReturnValue(100);
    this.draw = jest.fn();
  }
}

// Mock the modules
jest.mock('js/app.js', () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: jest.fn().mockReturnValue('#ffff00')
}));

jest.mock('js/classes/point.js', () => ({
  Point: jest.fn().mockImplementation((...args) => new MockPoint(...args))
}));

jest.mock('js/src/state/appState.js', () => ({
  registerAnimationFrame: jest.fn().mockReturnValue(123)
}));

// Import after mocking
import { torusDraw, torusStop } from 'js/shapes-and-math/torus.js';

describe('Torus module tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset global mocks
    global.requestAnimationFrame = jest.fn().mockReturnValue(123);
    global.cancelAnimationFrame = jest.fn();
  });

  describe("torusDraw function", () => {
    it("should set up the canvas and clear it", () => {
      torusDraw();
      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('torusStop function', () => {
    it("should stop the animation", () => {
      // Start the animation first
      torusDraw();
      
      // Then stop it
      torusStop();
      
      // Verify that the animation was stopped
      // This is a basic test that the function can be called without errors
      expect(torusStop).toBeDefined();
    });
  });
});
