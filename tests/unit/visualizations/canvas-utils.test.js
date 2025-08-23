// Test canvas utility functions
import { jest } from '@jest/globals';

describe('Canvas Utility Functions', () => {
  let mockContext;
  let mockCanvas;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
    };

    mockCanvas = {
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue(mockContext)
    };
  });

  describe('Drawing Functions', () => {
    it('should draw a line between two points', () => {
      // Simulate drawing a line
      const drawLine = (context, x1, y1, x2, y2, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.stroke();
      };

      drawLine(mockContext, 10, 20, 30, 40, '#ff0000');

      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.moveTo).toHaveBeenCalledWith(10, 20);
      expect(mockContext.lineTo).toHaveBeenCalledWith(30, 40);
      expect(mockContext.stroke).toHaveBeenCalled();
      expect(mockContext.strokeStyle).toBe('#ff0000');
    });

    it('should draw a circle', () => {
      // Simulate drawing a circle
      const drawCircle = (context, x, y, radius, color) => {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
      };

      drawCircle(mockContext, 100, 100, 50, '#00ff00');

      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.arc).toHaveBeenCalledWith(100, 100, 50, 0, 2 * Math.PI);
      expect(mockContext.fill).toHaveBeenCalled();
      expect(mockContext.fillStyle).toBe('#00ff00');
    });

    it('should clear canvas', () => {
      // Simulate clearing canvas
      const clearCanvas = (context, canvas) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
      };

      clearCanvas(mockContext, mockCanvas);

      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('Animation Functions', () => {
    it('should handle requestAnimationFrame', () => {
      const mockRequestAnimationFrame = jest.fn();
      global.requestAnimationFrame = mockRequestAnimationFrame;

      const animate = () => {
        // Simulate animation loop
        requestAnimationFrame(animate);
      };

      animate();

      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should handle interval-based animations', () => {
      jest.useFakeTimers();
      const mockFunction = jest.fn();

      const intervalId = setInterval(mockFunction, 100);

      jest.advanceTimersByTime(300);

      expect(mockFunction).toHaveBeenCalledTimes(3);

      clearInterval(intervalId);
      jest.useRealTimers();
    });
  });
}); 