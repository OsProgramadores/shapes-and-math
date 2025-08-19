/**
 * Canvas utility functions
 */

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

/**
 * Clears the canvas
 * @param {HTMLCanvasElement} canvas - The canvas element to clear
 * @param {CanvasRenderingContext2D} context - The 2D rendering context
 */
export const clearCanvas = (canvas, context) => {
  if (!canvas || !context) {
    console.error('Cannot clear canvas: canvas or context not provided');
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
};
