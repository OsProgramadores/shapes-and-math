/**
 * Application state management
 */

let lastFunctionCalled = null;
const animationIntervals = new Set();

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
 * Clears all registered intervals
 */
export const clearAllIntervals = () => {
  animationIntervals.forEach(intervalId => {
    clearInterval(intervalId);
  });
  animationIntervals.clear();
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
