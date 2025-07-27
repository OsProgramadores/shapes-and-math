// Mock the app.js module before requiring the module under test
const mockSetupCanvas = jest.fn();
const mockGetRandomColor = jest.fn().mockReturnValue("#00ff00");
const mockGetQuantityOfDotsSelectedByUser = jest.fn().mockReturnValue(5);

jest.mock("../../app.js", () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: mockGetRandomColor,
  getQuantityOfDotsSelectedByUser: mockGetQuantityOfDotsSelectedByUser,
}));

// Import the app module after mocking
const app = require("../../app.js");
// Import the module under test
const shapesModule = require("../randow-shapes.js");

describe("Random Shapes module tests", () => {
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
      fill: jest.fn(),
      arc: jest.fn(),
      fillStyle: "",
      strokeStyle: "",
      clearRect: jest.fn(),
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext)
    };

    // Mock setupCanvas to call clearRect and return our mock canvas and context
    mockSetupCanvas.mockImplementation(() => {
      mockContext.clearRect(0, 0, mockCanvas.width, mockCanvas.height);
      return [mockCanvas, mockContext];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("drawRand function", () => {
    it("should set up the canvas and clear it", () => {
      // When
      shapesModule.drawRand();

      // Then
      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });
  });

  describe("drawCircle function", () => {
    it("should draw a circle with the given parameters", () => {
      // Given
      const x = 100;
      const y = 100;
      const radius = 50;
      const color = "#00ff00";

      // When
      shapesModule.drawCircle(mockContext, x, y, radius, color);

      // Then
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.arc).toHaveBeenCalledWith(x, y, radius, 0, 2 * Math.PI);
      expect(mockContext.fillStyle).toBe(color);
      expect(mockContext.fill).toHaveBeenCalled();
    });
  });

  describe("drawParallelogram function", () => {
    it("should draw a parallelogram with the given parameters", () => {
      // Given
      let x1 = 100, y1 = 100, x2 = 200, y2 = 100, side = 50, color = "#00ff00";
      
      // The implementation modifies x2/y2 if they are equal to x1/y1
      let expectedX2 = x2;
      let expectedY2 = y2;
      if (x1 === x2) expectedX2 = x2 + 1;
      if (y1 === y2) expectedY2 = y2 + 1;

      // When
      shapesModule.drawParallelogram(mockContext, x1, y1, x2, y2, side, color);

      // Then
      expect(mockContext.fillStyle).toBe(color);
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.moveTo).toHaveBeenCalledWith(x1, y1);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x1 + side, y1);
      expect(mockContext.lineTo).toHaveBeenCalledWith(expectedX2 + side, expectedY2);
      expect(mockContext.lineTo).toHaveBeenCalledWith(expectedX2, expectedY2);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x1, y1);
      expect(mockContext.stroke).toHaveBeenCalled();
      expect(mockContext.fill).toHaveBeenCalled();
    });
  });

  describe("drawTriangle function", () => {
    it("should draw a triangle with the given parameters", () => {
      // Given
      const x1 = 100, y1 = 100, x2 = 200, y2 = 100, x3 = 150, y3 = 50, color = "#00ff00";

      // When
      shapesModule.drawTriangle(mockContext, x1, y1, x2, y2, x3, y3, color);

      // Then
      expect(mockContext.fillStyle).toBe(color);
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.moveTo).toHaveBeenCalledWith(x1, y1);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x2, y2);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x3, y3);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x1, y1);
      expect(mockContext.stroke).toHaveBeenCalled();
      expect(mockContext.fill).toHaveBeenCalled();
    });
  });
});
