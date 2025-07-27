import { jest } from "@jest/globals";

// Mock the app.js module
jest.unstable_mockModule("../app.js", () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn().mockReturnValue("#ff00ff"),
  getQuantityOfDotsSelectedByUser: jest.fn().mockReturnValue(4),
}));

// Mock the Rectangle class
jest.unstable_mockModule("../classes/rectangle.js", () => ({
  Rectangle: jest.fn().mockImplementation(() => ({
    draw: jest.fn()
  }))
}));

// Mock the DOM elements
document.body.innerHTML = `
  <div id="button5"></div>
  <div id="button9"></div>
`;

// Import the module after setting up mocks
const boxesModule = await import("../boxes.js");
const { Rectangle } = await import("../classes/rectangle.js");

describe("Boxes module tests", () => {
  let mockContext;
  let mockCanvas;
  let mockRectangle;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock canvas and context
    mockContext = {
      clearRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext),
    };

    // Mock setupCanvas to return our mock canvas and context
    const { setupCanvas } = await import("../app.js");
    setupCanvas.mockReturnValue([mockCanvas, mockContext]);

    // Create a new mock instance for each test
    mockRectangle = {
      draw: jest.fn()
    };
    Rectangle.mockImplementation(() => mockRectangle);
  });

  describe("drawBoxes function", () => {
    it("should set up the canvas and clear it", () => {
      // When
      boxesModule.drawBoxes();

      // Then
      const { setupCanvas } = await import("../app.js");
      expect(setupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });

    it("should create rectangles with random positions and sizes", () => {
      // When
      boxesModule.drawBoxes();

      // Then
      expect(Rectangle).toHaveBeenCalledWith(
        mockContext,
        expect.any(Number), // x1
        expect.any(Number), // y1
        expect.any(Number), // width
        expect.any(Number)  // height
      );
      expect(mockRectangle.draw).toHaveBeenCalled();
    });
  });

  describe("drawRandonRectangle function", () => {
    it("should create a rectangle with random position and size", () => {
      // Given
      const c = { width: 800, height: 600 };
      const context = mockContext;

      // When
      boxesModule.drawRandonRectangle(c, context);

      // Then
      expect(Rectangle).toHaveBeenCalledWith(
        context,
        expect.any(Number), // x1
        expect.any(Number), // y1
        expect.any(Number), // width
        expect.any(Number)  // height
      );
      expect(mockRectangle.draw).toHaveBeenCalled();
    });

    it("should not draw if continueAnime is false", () => {
      // Given
      const c = { width: 800, height: 600 };
      const context = mockContext;
      boxesModule.stopBoxes();

      // When
      boxesModule.drawRandonRectangle(c, context);

      // Then
      expect(mockRectangle.draw).not.toHaveBeenCalled();
    });
  });

  describe("stopBoxes function", () => {
    it("should set continueAnime to false", () => {
      // When
      boxesModule.stopBoxes();
      
      // Then
      const c = { width: 800, height: 600 };
      const context = mockContext;
      boxesModule.drawRandonRectangle(c, context);
      expect(mockRectangle.draw).not.toHaveBeenCalled();
    });
  });
});
