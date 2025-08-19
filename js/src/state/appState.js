/**
 * Application state management
 */

let lastFunctionCalled = null;
const animationIntervals = new Set();
let animationFrameId = null;

/**
 * Tracks the last function called
 * @param {string} funcName - Name of the function being called
 */
export const setLastFunction = (funcName) => {
  lastFunctionCalled = funcName;
};

/**
 * Registers an animation interval for cleanup
 * @param {number} intervalId - The interval ID from setInterval
 */
export const registerInterval = (intervalId) => {
  animationIntervals.add(intervalId);
  return intervalId;
};

/**
 * Registers an animation frame for cleanup
 * @param {number} id - The animation frame ID from requestAnimationFrame
 * @returns {number} The registered animation frame ID
 */
export const registerAnimationFrame = (id) => {
  // Don't cancel the previous frame here to allow for smooth transitions
  animationFrameId = id;
  return id;
};

/**
 * Clears all registered intervals and animation frames
 * @param {boolean} clearCanvas - Whether to clear the canvas
 */
export const clearAllIntervals = (clearCanvas = false) => {
  // Clear any intervals
  animationIntervals.forEach(intervalId => {
    clearInterval(intervalId);
  });
  animationIntervals.clear();
  
  // Clear any animation frames
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  // Clear the canvas if requested
  if (clearCanvas) {
    const [canvas, context] = setupCanvas();
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};

/**
 * Gets the name of the last called function
 * @returns {string|null} Name of the last called function or null
 */
export const getLastFunction = () => lastFunctionCalled;

/**
 * Resets the application state
 */
export const resetState = () => {
  lastFunctionCalled = null;
  clearAllIntervals();
};
