import { drawPath } from './shapes-and-math/path.js';
import { drawConnection } from './shapes-and-math/connections.js';
import { drawRand, stopRand } from './shapes-and-math/randow-shapes.js';
import { drawStick, stopStick } from './shapes-and-math/randon-stick-doll.js';
import { drawBoxes, stopBoxes } from './shapes-and-math/boxes.js';
import { drawLorenz, stopLorenz } from './shapes-and-math/lorenz.js';
import { torusDraw, torusStop } from './shapes-and-math/torus.js';

// Export a function that sets up all button listeners
export const setupButtonListeners = (clear, setLastFunction, lastFunctionCalled) => {
  // Button 1: Draw Path
  const button1 = document.getElementById('button1');
  if (button1) {
    button1.addEventListener('click', () => {
      const funcName = 'drawPath';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawPath();
    });
  }
  
  // Button 2: Draw Connections
  const button2 = document.getElementById('button2');
  if (button2) {
    button2.addEventListener('click', () => {
      const funcName = 'drawConnection';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawConnection();
    });
  }
  
  // Button 3: Draw Random Shapes
  const buttonRand = document.getElementById("button3");
  if (buttonRand) {
    buttonRand.addEventListener('click', () => {
      const funcName = 'drawRand';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawRand();
    });
  }

  // Button 4: Draw Random Stick Doll 
  const buttonStick = document.getElementById("button4");
  if (buttonStick) {
    buttonStick.addEventListener("click", () => {
      const funcName = 'drawStick';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawStick();
    });
  }

  // Button 5: Draw Boxes
  const buttonBoxes = document.getElementById("button5");
  if (buttonBoxes) {
    buttonBoxes.addEventListener("click", () => {
      const funcName = 'drawBoxes';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawBoxes();
    });
  } 

  // Button 6: Draw Lorenz Attractor
  const buttonLorenz = document.getElementById("button6");
  if (buttonLorenz) {
    buttonLorenz.addEventListener("click", () => {
      const funcName = 'drawLorenz';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      drawLorenz();
    });
  }

  // Button 7: Draw Torus   
  const drawButton = document.getElementById("button7");
  if (drawButton) {
    drawButton.addEventListener("click", () => {
      const funcName = 'torusDraw';
      console.log('Starting animation:', funcName);
      setLastFunction(funcName);
      clear();
      torusDraw();
    });
  }

  // Button 8: Clear Canvas 
  const buttonClear = document.getElementById("button8");
  if (buttonClear) {
    buttonClear.addEventListener("click", clear);
  }
  
  // Button 9: Stop Animation
  const buttonStop = document.getElementById("button9");
  if (buttonStop) {
    buttonStop.addEventListener('click', (e) => {
      // Prevent default behavior that might be causing issues
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Stop button clicked, stopping all animations');
      
      // 1. First, call the specific stop function based on the last function called
      console.log('Last function called:', window.lastFunctionCalled);
      
      // 2. Stop all possible animation types regardless of lastFunctionCalled
      console.log('Stopping all animation types...');
      
      // Stop any interval-based animations
      clearInterval(window.myVarInterval);
      
      // Stop any requestAnimationFrame animations
      if (window.animationFrameId) {
        window.cancelAnimationFrame(window.animationFrameId);
        window.animationFrameId = null;
      }
      
      // Call all stop functions to ensure everything is stopped
      if (typeof stopLorenz === 'function') {
        console.log('Calling stopLorenz');
        stopLorenz();
      }
      
      if (typeof stopBoxes === 'function') {
        console.log('Calling stopBoxes');
        stopBoxes();
      }
      
      if (typeof stopStick === 'function') {
        console.log('Calling stopStick');
        stopStick();
      }
      
      if (typeof stopRand === 'function') {
        console.log('Calling stopRand');
        stopRand();
      }
      
      if (typeof torusStop === 'function') {
        console.log('Calling torusStop');
        torusStop();
      }
      
      // Reset the last function called
      setLastFunction(null);
      
      console.log('All animations should be stopped');
    });
  }
};
