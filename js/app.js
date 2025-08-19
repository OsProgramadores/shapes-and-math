/**
 * Main application entry point
 */

// Core dependencies
import { loadCanvas } from './createcanvas.js';
import { setupButtonListeners } from './buttonHandlers.js';

// State management
import { resetState, setLastFunction, registerInterval } from './src/state/appState.js';

// Utilities
import { clearCanvas } from './src/utils/canvas.js';
import { initializeSlider } from './src/utils/ui.js';

// Re-export commonly used utilities for backward compatibility
export { getRandomColor, get_random_color } from './src/utils/color.js';
export { getQuantityOfDotsSelectedByUser } from './src/utils/ui.js';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Load the canvas
    const canvas = loadCanvas("divCanvas");
    if (!canvas) {
      throw new Error('Failed to initialize canvas');
    }

    // Initialize UI components
    initializeSlider();
    
    // Set up button listeners
    setupButtonListeners(clear, setLastFunction);
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
});

/**
 * Clears the canvas and resets the application state
 * @param {boolean} resetStateFlag - Whether to reset the application state (default: true)
 */
export const clear = (resetStateFlag = true) => {
  try {
    const [canvas, context] = setupCanvas();
    if (!canvas || !context) {
      throw new Error('Canvas or context not available');
    }
    
    // Clear the canvas
    clearCanvas(canvas, context);
    
    // Reset application state if requested
    if (resetStateFlag) {
      resetState();
    }
    
  } catch (error) {
    console.error('Error in clear function:', error);
  }
};

/**
 * Sets up and returns a canvas context
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]|[null, null]} Canvas and context or nulls if setup fails
 */
export const setupCanvas = () => {
  const canvas = document.getElementById("main-canvas");
  if (!canvas) {
    console.error('Canvas not found');
    return [null, null];
  }
  
  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Could not get 2D context');
    return [null, null];
  }

  return [canvas, context];
};


