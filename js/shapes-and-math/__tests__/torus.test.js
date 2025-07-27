import { jest } from "@jest/globals";

// Mock dependencies
jest.unstable_mockModule("../app.js", () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn().mockReturnValue("#ffff00"),
}));

jest.unstable_mockModule("../classes/point.js", () => ({
  Point: jest.fn().mockImplementation(() => ({
    x: 0, y: 0, z: 0,
    rotateX: jest.fn(),
    rotateY: jest.fn(),
    getProjection: jest.fn().mockReturnValue(100),
    draw: jest.fn()
  }))
}));

// Import the module after setting up mocks
const torusModule = await import("../torus.js");
const { Point } = await import("../classes/point.js");

describe("Torus module tests", () => {
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

    const { setupCanvas } = await import("../app.js");
    setupCanvas.mockReturnValue([mockCanvas, mockContext]);
  });

  describe("torusDraw function", () => {
    it("should set up the canvas and clear it", () => {
      torusModule.torusDraw();
      const { setupCanvas } = await import("../app.js");
      expect(setupCanvas).toHaveBeenCalled();
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe("Torus class", () => {
    it("should initialize with correct number of vertexes", () => {
      const torus = new torusModule.Torus(10, 20, 10);
      expect(torus.numVertexes).toBeGreaterThan(0);
    });
  });
});
