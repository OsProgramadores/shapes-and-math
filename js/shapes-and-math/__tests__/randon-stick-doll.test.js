import { jest } from "@jest/globals";

// Mock the app.js module
jest.unstable_mockModule("../app.js", () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn().mockReturnValue("#0000ff"),
  getQuantityOfDotsSelectedByUser: jest.fn().mockReturnValue(3),
}));

// Mock the Stick class
jest.unstable_mockModule("../classes/stick.js", () => ({
  Stick: jest.fn().mockImplementation(() => ({
    draw: jest.fn()
  }))
}));

// Mock the DOM elements
document.body.innerHTML = `
  <div id="button4"></div>
  <div id="button9"></div>
`;

// Import the module after setting up mocks
const stickDollModule = await import("../randon-stick-doll.js");
const { Stick } = await import("../classes/stick.js");

describe("Random Stick Doll module tests", () => {
  let mockContext;
  let mockCanvas;
  let mockStick;

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
    mockStick = {
      draw: jest.fn()
    };
    Stick.mockImplementation(() => mockStick);
  });

  describe("drawStick function", () => {
    it("should set up the canvas and clear it", () => {
      // When
      stickDollModule.drawStick();

      // Then
      const { setupCanvas } = await import("../app.js");
      expect(setupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
    });

    it("should create a new Stick instance with random parameters", () => {
      // When
      stickDollModule.drawStick();

      // Then
      expect(Stick).toHaveBeenCalledWith(
        mockContext,
        expect.any(Number), // x1
        expect.any(Number), // y1
        expect.any(Number)  // radius
      );
    });
  });

  describe("drawRandomStick function", () => {
    it("should create a stick figure with random position and size", () => {
      // Given
      const c = { width: 800, height: 600 };
      const context = mockContext;

      // When
      stickDollModule.drawRandomStick(c, context);

      // Then
      expect(Stick).toHaveBeenCalledWith(
        context,
        expect.any(Number), // x1
        expect.any(Number), // y1
        expect.any(Number)  // radius
      );
      expect(mockStick.draw).toHaveBeenCalled();
    });

    it("should not draw if continuaAnime is false", () => {
      // Given
      const c = { width: 800, height: 600 };
      const context = mockContext;
      stickDollModule.stopStick();

      // When
      stickDollModule.drawRandomStick(c, context);

      // Then
      expect(mockStick.draw).not.toHaveBeenCalled();
    });
  });

  describe("stopStick function", () => {
    it("should set continuaAnime to false", () => {
      // When
      stickDollModule.stopStick();
      
      // Then
      const c = { width: 800, height: 600 };
      const context = mockContext;
      stickDollModule.drawRandomStick(c, context);
      expect(mockStick.draw).not.toHaveBeenCalled();
    });
  });
});
