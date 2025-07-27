// Mock dependencies
jest.mock('js/app.js', () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn().mockReturnValue('#ffff00')
}));

// Mock Point class
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

jest.mock('js/classes/point.js', () => ({
  Point: jest.fn().mockImplementation((...args) => new MockPoint(...args))
}));

// Import the modules after setting up mocks
const torusModule = require('js/shapes-and-math/torus.js');
const torusDraw = torusModule.torusDraw;
const { setupCanvas, get_random_color } = require('js/app.js');
const { Point } = require('js/classes/point.js');

describe('Torus module tests', () => {
  let mockContext, mockCanvas;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockContext = {
      clearRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillStyle: "",
      strokeStyle: "",
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext),
    };

    setupCanvas.mockReturnValue([mockCanvas, mockContext]);
  });

  describe("torusDraw function", () => {
    it("should set up the canvas and clear it", () => {
      torusModule.torusDraw();
      expect(setupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('Torus Drawing Functionality', () => {
    let points = [];

    beforeEach(() => {
      // Reset mocks and create a clean state for each test
      jest.clearAllMocks();
      
      // Create a mock canvas and context
      mockContext = {
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        strokeStyle: '',
        fillStyle: '',
        clearRect: jest.fn(),
        fill: jest.fn(),
        save: jest.fn(),
        restore: jest.fn()
      };

      mockCanvas = {
        width: 800,
        height: 600,
        getContext: jest.fn().mockReturnValue(mockContext)
      };

      // Setup the mock canvas and context
      setupCanvas.mockReturnValue([mockCanvas, mockContext]);
      
      // Reset points array and Point mock implementation
      points = [];
      Point.mockImplementation((...args) => {
        const point = new MockPoint(...args);
        points.push(point);
        return point;
      });
    });

    test('should initialize and draw a torus', () => {
      // When
      torusDraw();

      // Then
      expect(setupCanvas).toHaveBeenCalled();
      expect(Point).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });
  });

  // Test the torusDraw function with controlled animation frames
  describe("Torus drawing functionality", () => {
    let originalRequestAnimationFrame;
    let originalCancelAnimationFrame;
    let frameCount = 0;
    const maxFrames = 2; // Run for 2 frames to verify animation starts and stops
    
    beforeEach(() => {
      // Reset frame count
      frameCount = 0;
      
      // Save original functions
      originalRequestAnimationFrame = global.requestAnimationFrame;
      originalCancelAnimationFrame = global.cancelAnimationFrame;
      
      // Mock requestAnimationFrame
      global.requestAnimationFrame = jest.fn(cb => {
        // Only execute the callback if we haven't reached maxFrames
        if (frameCount < maxFrames) {
          frameCount++;
          // Use setTimeout to avoid blocking and allow other operations to complete
          return setTimeout(() => cb(performance.now()), 0);
        }
        // Return a non-zero value to simulate a valid animation frame ID
        return 123; // Any non-zero value would work here
      });
      
      // Mock cancelAnimationFrame to track if it's called
      global.cancelAnimationFrame = jest.fn();
    });
    
    afterEach(() => {
      // Restore original functions
      global.requestAnimationFrame = originalRequestAnimationFrame;
      global.cancelAnimationFrame = originalCancelAnimationFrame;
    });
    
    it("should start and stop animation properly", () => {
      // Call torusDraw which starts the animation
      torusDraw();
      
      // Verify requestAnimationFrame was called at least once
      expect(global.requestAnimationFrame).toHaveBeenCalled();
      
      // Get the callback from the first requestAnimationFrame call
      const firstCallback = global.requestAnimationFrame.mock.calls[0][0];
      
      // Execute the first callback
      firstCallback(performance.now());
      
      // Verify requestAnimationFrame was called again for the next frame
      expect(global.requestAnimationFrame).toHaveBeenCalledTimes(2);
      
      // Get the callback from the second requestAnimationFrame call
      const secondCallback = global.requestAnimationFrame.mock.calls[1][0];
      
      // Execute the second callback
      secondCallback(performance.now());
      
      // After maxFrames, we expect requestAnimationFrame to have been called maxFrames + 1 times
      // (initial call + maxFrames continuations)
      expect(global.requestAnimationFrame).toHaveBeenCalledTimes(maxFrames + 1);
      
      // Verify that cancelAnimationFrame was called to stop the animation
      // This is a more reliable check than counting requestAnimationFrame calls
      expect(global.cancelAnimationFrame).toHaveBeenCalled();
    });
  });
});
