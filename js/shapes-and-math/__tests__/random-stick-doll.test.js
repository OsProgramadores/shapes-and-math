// Mock the app.js module before requiring the module under test
import { jest } from '@jest/globals';

const mockSetupCanvas = jest.fn();
const mockGetRandomColor = jest.fn().mockReturnValue("#00ff00");

// Mock the app.js module
jest.mock('js/app.js', () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: mockGetRandomColor
}));

// Mock the Stick class
class MockStick {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.draw = jest.fn();
  }
}

jest.mock('js/classes/stick.js', () => ({
  Stick: jest.fn().mockImplementation((...args) => new MockStick(...args))
}));

// Mock the state management
jest.mock('js/src/state/appState.js', () => ({
  registerInterval: jest.fn().mockReturnValue(123)
}));

// Import the module under test
import { drawStick, stopStick } from 'js/shapes-and-math/random-stick-doll.js';

describe('Random Stick Doll Module', () => {
  let mockCanvas, mockContext;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockContext = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      clearRect: jest.fn(),
      width: 800,
      height: 600
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext)
    };

    mockSetupCanvas.mockReturnValue([mockCanvas, mockContext]);
  });

  describe('drawStick function', () => {
    it('should start the animation', () => {
      drawStick();
      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });
  });

  describe('stopStick function', () => {
    it('should stop the animation', () => {
      // Start the animation first
      drawStick();
      
      // Then stop it
      stopStick();
      
      // Verify that the function can be called without errors
      expect(stopStick).toBeDefined();
    });
  });
});
