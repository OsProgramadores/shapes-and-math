import { jest } from "@jest/globals";

// Mock the app.js module
jest.unstable_mockModule("../app.js", () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn().mockReturnValue("#00ff00"),
  getQuantityOfDotsSelectedByUser: jest.fn().mockReturnValue(5),
}));

// Mock the DOM elements
document.body.innerHTML = `
  <div id="button3"></div>
  <div id="button9"></div>
`;

// Import the module after setting up mocks
const shapesModule = await import("../randow-shapes.js");

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
      getContext: jest.fn().mockReturnValue(mockContext),
    };

    // Mock setupCanvas to return our mock canvas and context
    const { setupCanvas } = await import("../app.js");
    setupCanvas.mockReturnValue([mockCanvas, mockContext]);
  });

  describe("drawRand function", () => {
    it("should set up the canvas and clear it", () => {
      // When
      shapesModule.drawRand();

      // Then
      const { setupCanvas } = await import("../app.js");
      expect(setupCanvas).toHaveBeenCalled();
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
      const x1 = 100, y1 = 100, x2 = 200, y2 = 100, side = 50, color = "#00ff00";

      // When
      shapesModule.drawParallelogram(mockContext, x1, y1, x2, y2, side, color);

      // Then
      expect(mockContext.fillStyle).toBe(color);
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.moveTo).toHaveBeenCalledWith(x1, y1);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x1 + side, y1);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x2 + side, y2);
      expect(mockContext.lineTo).toHaveBeenCalledWith(x2, y2);
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
