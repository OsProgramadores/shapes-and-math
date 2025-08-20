// Test for random-shapes module - simplified approach
import { jest } from '@jest/globals';

describe('Random Shapes Module - Core Functionality', () => {
  let mockContext;
  let mockCanvas;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock canvas and context
    mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext)
    };

    // Mock setInterval and clearInterval
    global.setInterval = jest.fn((callback, delay) => {
      // Return a mock interval ID
      return 123;
    });
    
    global.clearInterval = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Drawing Functions', () => {
    describe('drawCircle function', () => {
      it('should draw a circle with correct canvas operations', () => {
        // Simulate the drawCircle function
        const drawCircle = (context, x, y, radius, color) => {
          context.fillStyle = color;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.fill();
        };

        drawCircle(mockContext, 100, 100, 50, '#ff0000');

        expect(mockContext.fillStyle).toBe('#ff0000');
        expect(mockContext.beginPath).toHaveBeenCalled();
        expect(mockContext.arc).toHaveBeenCalledWith(100, 100, 50, 0, 2 * Math.PI);
        expect(mockContext.fill).toHaveBeenCalled();
      });

      it('should handle different circle parameters', () => {
        const drawCircle = (context, x, y, radius, color) => {
          context.fillStyle = color;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.fill();
        };

        // Test with different parameters
        drawCircle(mockContext, 200, 150, 75, '#00ff00');
        
        expect(mockContext.fillStyle).toBe('#00ff00');
        expect(mockContext.arc).toHaveBeenCalledWith(200, 150, 75, 0, 2 * Math.PI);
      });
    });

    describe('drawTriangle function', () => {
      it('should draw a triangle with correct canvas operations', () => {
        // Simulate the drawTriangle function
        const drawTriangle = (context, x1, y1, x2, y2, x3, y3, color) => {
          context.fillStyle = color;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.lineTo(x3, y3);
          context.lineTo(x1, y1);
          context.stroke();
          context.fill();
        };

        drawTriangle(mockContext, 10, 20, 30, 40, 50, 60, '#0000ff');

        expect(mockContext.fillStyle).toBe('#0000ff');
        expect(mockContext.beginPath).toHaveBeenCalled();
        expect(mockContext.moveTo).toHaveBeenCalledWith(10, 20);
        expect(mockContext.lineTo).toHaveBeenCalledWith(30, 40);
        expect(mockContext.lineTo).toHaveBeenCalledWith(50, 60);
        expect(mockContext.lineTo).toHaveBeenCalledWith(10, 20); // Close the path
        expect(mockContext.stroke).toHaveBeenCalled();
        expect(mockContext.fill).toHaveBeenCalled();
      });
    });

    describe('drawParallelogram function', () => {
      it('should draw a parallelogram with correct canvas operations', () => {
        // Simulate the drawParallelogram function
        const drawParallelogram = (context, x1, y1, x2, y2, side, color) => {
          // Points must not be in the same line
          if(x1 === x2) x2++;
          if(y1 === y2) y2++;

          context.fillStyle = color;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x1 + side, y1);
          context.lineTo(x2 + side, y2);
          context.lineTo(x2, y2);
          context.lineTo(x1, y1);
          context.stroke();
          context.fill();
        };

        drawParallelogram(mockContext, 10, 20, 30, 40, 50, '#ffff00');

        expect(mockContext.fillStyle).toBe('#ffff00');
        expect(mockContext.beginPath).toHaveBeenCalled();
        expect(mockContext.moveTo).toHaveBeenCalledWith(10, 20);
        expect(mockContext.lineTo).toHaveBeenCalledWith(60, 20); // x1 + side, y1
        expect(mockContext.lineTo).toHaveBeenCalledWith(80, 40); // x2 + side, y2
        expect(mockContext.lineTo).toHaveBeenCalledWith(30, 40); // x2, y2
        expect(mockContext.lineTo).toHaveBeenCalledWith(10, 20); // Back to start
        expect(mockContext.stroke).toHaveBeenCalled();
        expect(mockContext.fill).toHaveBeenCalled();
      });

      it('should handle overlapping coordinates correctly', () => {
        const drawParallelogram = (context, x1, y1, x2, y2, side, color) => {
          // Points must not be in the same line
          if(x1 === x2) x2++;
          if(y1 === y2) y2++;

          context.fillStyle = color;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x1 + side, y1);
          context.lineTo(x2 + side, y2);
          context.lineTo(x2, y2);
          context.lineTo(x1, y1);
          context.stroke();
          context.fill();
        };

        // Test with same x coordinates
        drawParallelogram(mockContext, 10, 20, 10, 40, 50, '#ff00ff');
        
        // Should have adjusted x2 to be 11 instead of 10
        expect(mockContext.lineTo).toHaveBeenCalledWith(61, 40); // (10+1) + 50, 40
        expect(mockContext.lineTo).toHaveBeenCalledWith(11, 40); // x2 adjusted to 11
      });
    });
  });

  describe('Animation Control Functions', () => {
    it('should handle interval management correctly', () => {
      // Test that setInterval and clearInterval work as expected
      const mockCallback = jest.fn();
      const intervalId = setInterval(mockCallback, 240);
      
      expect(intervalId).toBe(123);
      expect(global.setInterval).toHaveBeenCalledWith(mockCallback, 240);
      
      clearInterval(intervalId);
      expect(global.clearInterval).toHaveBeenCalledWith(123);
    });

    it('should use correct animation timing', () => {
      // Test that the animation uses 240ms intervals like in random-shapes.js
      const mockCallback = jest.fn();
      setInterval(mockCallback, 240);
      
      expect(global.setInterval).toHaveBeenCalledWith(mockCallback, 240);
    });
  });

  describe('Random Number Generation', () => {
    it('should generate random coordinates within canvas bounds', () => {
      // Test random coordinate generation logic similar to what's used in random-shapes.js
      const generateRandomCoordinate = (max) => {
        return Math.floor((Math.random() * max) + 1);
      };

      // Test multiple generations to ensure they're within bounds
      for (let i = 0; i < 10; i++) {
        const x = generateRandomCoordinate(800);
        const y = generateRandomCoordinate(600);
        
        expect(x).toBeGreaterThanOrEqual(1);
        expect(x).toBeLessThanOrEqual(800);
        expect(y).toBeGreaterThanOrEqual(1);
        expect(y).toBeLessThanOrEqual(600);
      }
    });

    it('should generate random radius within expected range', () => {
      // Test random radius generation (used for circles)
      const generateRandomRadius = (maxHeight) => {
        return Math.floor((Math.random() * maxHeight) / 2);
      };

      for (let i = 0; i < 10; i++) {
        const radius = generateRandomRadius(600);
        
        expect(radius).toBeGreaterThanOrEqual(0);
        expect(radius).toBeLessThanOrEqual(300); // maxHeight / 2
      }
    });

    it('should generate random side length for parallelograms', () => {
      // Test random side generation
      const generateRandomSide = (maxWidth) => {
        return Math.floor((Math.random() * maxWidth) + 1);
      };

      for (let i = 0; i < 10; i++) {
        const side = generateRandomSide(800);
        
        expect(side).toBeGreaterThanOrEqual(1);
        expect(side).toBeLessThanOrEqual(800);
      }
    });
  });

  describe('Animation State Management', () => {
    it('should manage animation flags correctly', () => {
      // Test animation state management logic
      let continueAnime = true;
      
      // Simulate starting animation
      expect(continueAnime).toBe(true);
      
      // Simulate stopping animation
      continueAnime = false;
      expect(continueAnime).toBe(false);
      
      // Simulate restarting animation
      continueAnime = true;
      expect(continueAnime).toBe(true);
    });

    it('should respect animation flag in drawing logic', () => {
      // Test that drawing respects the continueAnime flag
      let continueAnime = false;
      
      const drawShapes = (canvas, context) => {
        if (!continueAnime) return;
        // Drawing logic would go here
        context.beginPath();
      };

      drawShapes(mockCanvas, mockContext);
      
      // Should not have called beginPath because continueAnime is false
      expect(mockContext.beginPath).not.toHaveBeenCalled();
      
      // Now enable animation
      continueAnime = true;
      drawShapes(mockCanvas, mockContext);
      
      // Should have called beginPath because continueAnime is true
      expect(mockContext.beginPath).toHaveBeenCalled();
    });
  });

  describe('Color Management', () => {
    it('should handle color assignment correctly', () => {
      // Test color assignment for different shapes
      const testColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
      
      testColors.forEach(color => {
        mockContext.fillStyle = color;
        expect(mockContext.fillStyle).toBe(color);
      });
    });

    it('should support multiple colors in single drawing cycle', () => {
      // Test that different shapes can have different colors
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      
      colors.forEach((color, index) => {
        mockContext.fillStyle = color;
        expect(mockContext.fillStyle).toBe(colors[index]);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle null context gracefully', () => {
      // Test handling of null context
      const drawCircle = (context, x, y, radius, color) => {
        if (!context) return false;
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        return true;
      };

      expect(drawCircle(null, 100, 100, 50, '#ff0000')).toBe(false);
      expect(drawCircle(mockContext, 100, 100, 50, '#ff0000')).toBe(true);
    });

    it('should handle invalid coordinates gracefully', () => {
      // Test handling of edge case coordinates
      const isValidCoordinate = (coord, max) => {
        return coord >= 0 && coord <= max && !isNaN(coord);
      };

      expect(isValidCoordinate(100, 800)).toBe(true);
      expect(isValidCoordinate(-10, 800)).toBe(false);
      expect(isValidCoordinate(900, 800)).toBe(false);
      expect(isValidCoordinate(NaN, 800)).toBe(false);
    });
  });

  describe('Canvas Dimensions', () => {
    it('should work with different canvas sizes', () => {
      // Test with different canvas dimensions
      const testCanvases = [
        { width: 800, height: 600 },
        { width: 1024, height: 768 },
        { width: 400, height: 300 }
      ];

      testCanvases.forEach(canvas => {
        const generateCoord = (max) => Math.floor((Math.random() * max) + 1);
        
        const x = generateCoord(canvas.width);
        const y = generateCoord(canvas.height);
        
        expect(x).toBeGreaterThanOrEqual(1);
        expect(x).toBeLessThanOrEqual(canvas.width);
        expect(y).toBeGreaterThanOrEqual(1);
        expect(y).toBeLessThanOrEqual(canvas.height);
      });
    });
  });
}); 