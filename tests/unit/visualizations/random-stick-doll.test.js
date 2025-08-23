import { jest } from '@jest/globals';

// Mock modules with ESM-safe API
const mockSetupCanvas = jest.fn();
const mockGetRandomColor = jest.fn();
const mockRegisterInterval = jest.fn((interval) => interval);

// Mock modules before importing the module under test
jest.unstable_mockModule('@/app.js', () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: mockGetRandomColor,
}));

jest.unstable_mockModule('@/core/shapes/stick.js', () => ({
  default: jest.fn().mockImplementation(() => ({
    draw: jest.fn(),
  })),
}));

jest.unstable_mockModule('@/state/appState.js', () => ({
  registerInterval: mockRegisterInterval,
}));

// Import the module and assign functions
let drawStick, stopStick;

// Import the module and assign the functions
describe('random-stick-doll', () => {
  const originalSetInterval = global.setInterval;
  const originalClearInterval = global.clearInterval;
  let clearRectMock, contextMock, canvasMock, intervalId;

  beforeAll(async () => {
    // Import the module and assign the functions
    const module = await import('@/visualizations/random-stick-doll.js');
    drawStick = module.drawStick;
    stopStick = module.stopStick;
    
    // Set up fake timers
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock canvas and context
    clearRectMock = jest.fn();
    contextMock = {
      clearRect: clearRectMock,
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn()
    };
    
    canvasMock = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(contextMock)
    };
    
    // Mock setupCanvas to return our mock canvas and context
    mockSetupCanvas.mockReturnValue([canvasMock, contextMock]);
    
    // Mock setInterval/clearInterval
    intervalId = 1234;
    global.setInterval = jest.fn().mockReturnValue(intervalId);
    global.clearInterval = jest.fn();
    
    // Reset the module cache and re-import with mocks
    jest.resetModules();
  });

  afterAll(() => {
    document.body.innerHTML = ''; // cleanup
    global.setInterval = originalSetInterval;
    global.clearInterval = originalClearInterval;
    jest.useRealTimers();
  });

  describe('drawStick', () => {
    it('clears previous interval and resets animation', () => {
      drawStick();

      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(contextMock.clearRect).toHaveBeenCalledWith(0, 0, canvasMock.width, canvasMock.height);
      expect(global.setInterval).toHaveBeenCalled();
      expect(mockRegisterInterval).toHaveBeenCalledWith(intervalId);
    });

    it('does nothing if setupCanvas returns falsy values', () => {
      mockSetupCanvas.mockReturnValueOnce([null, null]);

      drawStick();

      expect(contextMock.clearRect).not.toHaveBeenCalled();
      expect(global.setInterval).not.toHaveBeenCalled();
    });
  });

  describe('stopStick', () => {
    it('clears interval and disables animation', () => {
      // Mock the registerInterval to return a specific interval ID
      const testIntervalId = 1234;
      mockRegisterInterval.mockReturnValueOnce(testIntervalId);
      
      // First set up the animation
      drawStick();
      
      // Verify registerInterval was called
      expect(mockRegisterInterval).toHaveBeenCalled();
      
      // Clear mocks to track clearInterval calls
      jest.clearAllMocks();
      
      // Now stop the animation
      stopStick();
      
      // Verify clearInterval was called with the test interval ID
      expect(global.clearInterval).toHaveBeenCalledWith(testIntervalId);
    });

    it('does not throw if called multiple times', () => {
        expect(() => {
          stopStick();
          stopStick();
        }).not.toThrow();
      
        // No interval was active, so clearInterval should not be called
        expect(global.clearInterval).not.toHaveBeenCalled();
      });      
  });
});
