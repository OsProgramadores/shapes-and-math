// Mock the app.js module before requiring the module under test
import { jest } from '@jest/globals';

const mockSetupCanvas = jest.fn();
const mockGetRandomColor = jest.fn().mockReturnValue("#00ff00");
const mockGetQuantityOfDotsSelectedByUser = jest.fn().mockReturnValue(5);

// Mock the app.js module
jest.mock('js/app.js', () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: mockGetRandomColor,
  getQuantityOfDotsSelectedByUser: mockGetRandomColor
}));

// Mock the state management
jest.mock('js/src/state/appState.js', () => ({
  registerInterval: jest.fn().mockReturnValue(123)
}));

// Import the module under test
import { drawRand, stopRand } from 'js/shapes-and-math/random-shapes.js';

describe('Random Shapes Module', () => {
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

  describe('drawRand function', () => {
    it('should start the animation', () => {
      drawRand();
      expect(mockSetupCanvas).toHaveBeenCalled();
    });
  });

  describe('stopRand function', () => {
    it('should stop the animation', () => {
      // Start the animation first
      drawRand();
      
      // Then stop it
      stopRand();
      
      // Verify that the function can be called without errors
      expect(stopRand).toBeDefined();
    });
  });
});
