import { jest } from "@jest/globals";

// Mock the app.js module as it is not necessary for the unit tests
jest.unstable_mockModule("../app.js", () => ({
  setupCanvas: jest.fn(),
  get_random_color: jest.fn(),
  getQuantityOfDotsSelectedByUser: jest.fn(),
}));

// Mock the necessary dom elements, if you check the path.js file
// that the only dom call is to retrieve the button element
document.body.innerHTML = `<div id="button1"></div>`;
const button = document.getElementById("button1");
button.addEventListener = jest.fn();

// The module that will be tested
const pathModule = await import("./path.js");

describe("Path file unit tests", () => {
  let mockContext;

  beforeEach(() => {
    // Create a mock context to use in unit tests
    mockContext = {
      width: 800,
      height: 600,
      strokeStyle: "",
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    };
  });

  describe("selectDots function tests", () => {
    it("Should return an array of dots with the specified quantity", () => {
      // Given
      const qtyDots = 5;

      // When
      const result = pathModule.selectDots(qtyDots, mockContext);

      // Then
      expect(result.length).toBe(5);
    });

    it("Should return dots within the specified context boundaries", () => {
      // Given
      const qtyDots = 5;

      // When
      const result = pathModule.selectDots(qtyDots, mockContext);

      // Then the x and y coordinates of each dot should be positve and less than the context width and height respectively
      result.forEach((dot) => {
        expect(dot[0]).toBeGreaterThanOrEqual(1); // Ensure x coordinate is positive
        expect(dot[0]).toBeLessThanOrEqual(mockContext.width); // Ensure x coordinate is less than context width
        expect(dot[1]).toBeGreaterThanOrEqual(1); // Ensure y coordinate is positive
        expect(dot[1]).toBeLessThanOrEqual(mockContext.height); // Ensure y coordinate is less than context height
      });
    });

  });

  describe("connectDots function tests", () => {
    it("Should connect two dots in the array", () => {
      // Given
      const dots = [
        [100, 100],
        [200, 200]
      ];
      const color = "red";

      // When
      pathModule.connectDots(mockContext, dots, color);

      // Then
      expect(mockContext.beginPath).toHaveBeenCalledTimes(1);
      expect(mockContext.moveTo).toHaveBeenCalledWith(100, 100);
      expect(mockContext.lineTo).toHaveBeenCalledWith(200, 200);
      expect(mockContext.strokeStyle).toBe("red");
    });

    it("Should not connect any dots if the array is empty", () => {
      // Given
      const dots = [];
      const color = "red";

      // When
      pathModule.connectDots(mockContext, dots, color);

      // Then
      expect(mockContext.beginPath).not.toHaveBeenCalled();
      expect(mockContext.moveTo).not.toHaveBeenCalled();
      expect(mockContext.lineTo).not.toHaveBeenCalled();
    });

    it("shoul not connect any dots if the array size is 1", () => {
      // Given
      const dots = [[100, 100]];
      const color = "red";

      // When
      pathModule.connectDots(mockContext, dots, color);

      // Then
      expect(mockContext.beginPath).not.toHaveBeenCalled();
      expect(mockContext.moveTo).not.toHaveBeenCalled();
      expect(mockContext.lineTo).not.toHaveBeenCalled();
    });
  });
});
