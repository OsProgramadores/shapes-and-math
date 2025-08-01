import { torusDraw, torusStop } from './shapes-and-math/torus.js';
import { drawBoxes, stopBoxes } from './shapes-and-math/boxes.js';
import { drawConnection } from './shapes-and-math/connections.js';
import { drawLorenz, stopLorenz } from './shapes-and-math/lorenz.js';
import { drawPath } from './shapes-and-math/path.js'; 
import { drawRand } from './shapes-and-math/randow-shapes.js';
import { drawStick } from './shapes-and-math/randon-stick-doll.js';
import { loadCanvas } from './createcanvas.js';

//Defines variable that will handle routines that are executed at a specific interval
let myVarInterval = 0;
export let lastFunctionCalled;

// Initialize the app when DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  // Load the canvas and get a reference to it
  const canvas = loadCanvas("divCanvas");
  
  if (!canvas) {
    console.error('Failed to initialize canvas');
    return;
  }
  
  // Initialize other components that depend on the canvas
  initializeApp(canvas);
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
  
  // Set up clear button
  const buttonClear = document.getElementById("button8");
  if (buttonClear) {
    buttonClear.addEventListener("click", clear);
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

const clear = () => {
  const [canvas, context] = setupCanvas();
  if (!canvas || !context) {
    console.error('Could not clear canvas: canvas or context not available');
    return;
  }
  
  // Clear any running animations
  clearInterval(myVarInterval);
  
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Reset any other application state if needed
  lastFunctionCalled = null;
}

// Add event listeners for other buttons
const setupButtonListeners = () => {
  // Button 1: Draw Path
  const button1 = document.getElementById('button1');
  if (button1) {
    button1.addEventListener('click', () => {
      lastFunctionCalled = 'drawPath';
      clear();
      drawPath();
    });
  }
  
  // Button 2: Draw Connections
  const button2 = document.getElementById('button2');
  if (button2) {
    button2.addEventListener('click', () => {
      lastFunctionCalled = 'drawConnection';
      clear();
      drawConnection();
    });
  }
  
  // Button 3: Draw Random Shapes
  const buttonRand = document.getElementById("button3");
  if (buttonRand) {
    buttonRand.addEventListener('click', () => {
      lastFunctionCalled = 'drawRand';
      clear();
      drawRand();
    });
  }

  // Button 7: Draw Torus
  const drawButton = document.getElementById("button7");
  if (drawButton) {
    drawButton.addEventListener("click", torusDraw);
  }
  
  // Button 9: Stop Animation
  const buttonStop = document.getElementById("button9");
  if (buttonStop) {
    buttonStop.addEventListener('click', () => {
      clearInterval(myVarInterval);
    });
  }
};

// Initialize button listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupButtonListeners();
});
