// Mock the modules first, with simple mocks that don't reference out-of-scope variables
jest.mock('../../shapes-and-math/lorenz.js', () => ({
  stopLorenz: jest.fn(),
  drawLorenz: jest.fn(),
}));

// Mock app.js with simple mocks
jest.mock('../../app.js', () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn(),
  getQuantityOfDotsSelectedByUser: jest.fn(),
}));

// Now import the modules after setting up the mocks
const connectionsModule = require('../../shapes-and-math/connections.js');
const app = require('../../app.js');

// Setup mocks and DOM elements in a beforeAll block
beforeAll(() => {
  // Setup DOM elements
  document.body.innerHTML = `
    <div id="button2"></div>
    <div id="button9"></div>
    <button id="buttonStop"></button>
    <button id="buttonLorenz"></button>
  `;
  
  // Setup mock implementations
  app.get_random_color.mockReturnValue('#ff0000');
  app.getQuantityOfDotsSelectedByUser.mockReturnValue(5);
  
  // Setup mock canvas and context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  app.setupCanvas.mockReturnValue([canvas, ctx]);
});

describe('Connections Module', () => {
  let mockContext;
  let mockCanvas;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock canvas and context
    mockContext = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: "",
      clearRect: jest.fn(),
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext),
    };

    // Mock setupCanvas to return our mock canvas and context
    mockSetupCanvas.mockReturnValue([mockCanvas, mockContext]);
  });

  // Simple test to verify the test file is being picked up
  test('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  describe("drawConnection function", () => {
    it("should call setupCanvas and clear the canvas", () => {
      // When
      connectionsModule.drawConnection();

      // Then
      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });
  });

  describe("selectDots function", () => {
    it("should return an array of dots with the specified quantity", () => {
      // Given
      const qtyDots = 5;
      const context = { width: 800, height: 600 };

      // When
      const result = connectionsModule.selectDots(qtyDots, context);

      // Then
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(qtyDots);
      result.forEach(dot => {
        expect(dot).toHaveLength(2);
        expect(dot[0]).toBeGreaterThanOrEqual(0);
        expect(dot[0]).toBeLessThanOrEqual(context.width);
        expect(dot[1]).toBeGreaterThanOrEqual(0);
        expect(dot[1]).toBeLessThanOrEqual(context.height);
      });
    });
  });

  describe("connectLines function", () => {
    it("should connect all dots with lines", () => {
      // Given
      const dots = [[10, 20], [30, 40], [50, 60]];
      const color = "#ff0000";

      // When
      connectionsModule.connectLines(mockContext, dots, color);

      // Then
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.strokeStyle).toBe(color);
      expect(mockContext.stroke).toHaveBeenCalled();
      // Verify lineTo was called for each connection
      expect(mockContext.moveTo).toHaveBeenCalledWith(dots[0][0], dots[0][1]);
      expect(mockContext.lineTo).toHaveBeenCalledWith(dots[1][0], dots[1][1]);
      expect(mockContext.lineTo).toHaveBeenCalledWith(dots[2][0], dots[2][1]);
    });
  });
});
