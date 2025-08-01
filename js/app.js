import { loadCanvas } from './createcanvas.js';
import { setupButtonListeners } from './buttonHandlers.js';

// Defines variable that will handle routines that are executed at a specific interval
window.myVarInterval = 0;
let lastFunctionCalled;

// Export a function to update the last function called
export const setLastFunction = (funcName) => {
  lastFunctionCalled = funcName;
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load the canvas and get a reference to it
  const canvas = loadCanvas("divCanvas");
  
  if (!canvas) {
    console.error('Failed to initialize canvas');
    return;
  }
  
  // Initialize other components that depend on the canvas
  initializeApp(canvas);
  
  // Set up button listeners with dependencies
  setupButtonListeners(clear, setLastFunction, lastFunctionCalled);
});

function initializeApp(canvas) {
  // Set up the slider
  const slider = document.getElementById("myRange");
  const output = document.getElementById("sliderValue");
  if (slider && output) {
    output.textContent = slider.value;
    slider.oninput = function() {
      output.textContent = this.value;
    };
  }
}

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

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Clear previous interval
  clearInterval(myVarInterval);
  return [canvas, context];
}

// Selects random colors
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// For backward compatibility
export const get_random_color = getRandomColor;

export const getQuantityOfDotsSelectedByUser = () => {
  const output = document.getElementById('sliderValue');
  if (!output) {
    console.warn('Slider value element not found');
    return 50; // Default value
  }
  return Number.parseInt(output.textContent || '50', 10);
}



// Clear function to reset the canvas and application state
export const clear = () => {
  const [canvas, context] = setupCanvas();
  if (!canvas || !context) {
    console.error('Could not clear canvas: canvas or context not available');
    return;
  }
  
  // Clear any running animations
  clearInterval(window.myVarInterval);
  
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Reset any other application state if needed
  lastFunctionCalled = null;
};


