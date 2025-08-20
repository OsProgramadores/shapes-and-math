// Mock the DOM
const { JSDOM } = require('jsdom');

// Set up a basic DOM environment
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <button id="button6">Lorenz</button>
      <button id="button9">Stop</button>
      <canvas id="canvas"></canvas>
    </body>
  </html>
`);

global.window = dom.window;
global.document = dom.window.document;

// Mock the app module
jest.mock('../../app.js', () => ({
  setupCanvas: jest.fn().mockReturnValue([
    { width: 800, height: 600 },
    {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: ''
    }
  ])
}));

// Import the module to test
const lorenzModule = require('../lorenz.js');

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  // Reset the animation flag
  lorenzModule.continueAnime = true;
  // Clear any existing intervals
  clearInterval(global.myVarInterval);
});

describe('Lorenz Attractor', () => {
  describe('calcLorenz', () => {
    it('should calculate the next point in the Lorenz system', () => {
      const { calcLorenz } = lorenzModule;
      
      // Test with initial point
      const initialPoint = { x: 0.1, y: 0.1, z: 0.1 };
      const nextPoint = calcLorenz(initialPoint.x, initialPoint.y, initialPoint.z);
      
      // Check that the point has moved
      expect(nextPoint).toHaveProperty('x');
      expect(nextPoint).toHaveProperty('y');
      expect(nextPoint).toHaveProperty('z');
      
      // The point should have moved from its initial position
      expect(nextPoint.x).not.toBe(initialPoint.x);
      expect(nextPoint.y).not.toBe(initialPoint.y);
      expect(nextPoint.z).not.toBe(initialPoint.z);
    });
  });

  describe('drawLorenz', () => {
    it('should set up an animation interval when the button is clicked', () => {
      // Simulate button click
      document.getElementById('button6').click();
      
      // Check that setupCanvas was called
      const { setupCanvas } = require('../../app.js');
      expect(setupCanvas).toHaveBeenCalled();
      
      // Check that an interval was set up
      expect(global.myVarInterval).toBeDefined();
    });

    it('should stop the animation when stop button is clicked', () => {
      // Start the animation
      document.getElementById('button6').click();
      
      // Stop the animation
      document.getElementById('button9').click();
      
      // Check that the animation was stopped
      expect(lorenzModule.continueAnime).toBe(false);
    });
  });
});
