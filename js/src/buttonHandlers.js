// Import animation functions
import { drawPath } from '@/visualizations/path.js';
import { drawConnection } from '@/visualizations/connections.js';
import { drawRand, stopRand } from '@/visualizations/random-shapes.js';
import { drawStick, stopStick } from '@/visualizations/random-stick-doll.js';
import { drawBoxes, stopBoxes } from '@/visualizations/boxes.js';
import { drawLorenz, stopLorenz } from '@/visualizations/lorenz.js';
import { drawTorus as torusDraw, stopTorus as torusStop } from '@/visualizations/torus.js';

// Import state management
import { setLastFunction, clearAllIntervals, getLastFunction } from '@/state/appState.js';

// Animation function map for easier management
const ANIMATION_FUNCTIONS = {
  drawPath: { start: drawPath, stop: null },
  drawConnection: { start: drawConnection, stop: null },
  drawRand: { start: drawRand, stop: stopRand },
  drawStick: { start: drawStick, stop: stopStick },
  drawBoxes: { start: drawBoxes, stop: stopBoxes },
  drawLorenz: { start: drawLorenz, stop: stopLorenz },
  torusDraw: { start: torusDraw, stop: torusStop }
};

/**
 * Sets up all button listeners for the application
 * @param {Function} clear - Function to clear the canvas
 * @param {Function} setLastFunc - Function to set the last called function
 */
export const setupButtonListeners = (clear, setLastFunc) => {
  // Set up animation buttons (1-7)
  for (let i = 1; i <= 7; i++) {
    const button = document.getElementById(`button${i}`);
    if (!button) continue;
    
    // Map button numbers to their corresponding animation functions
    const buttonMap = {
      1: 'drawPath',
      2: 'drawConnection',
      3: 'drawRand',
      4: 'drawStick',
      5: 'drawBoxes',
      6: 'drawLorenz',
      7: 'torusDraw'
    };
    
    const funcName = buttonMap[i];
    if (!funcName) continue;
    
    button.addEventListener('click', () => {
      console.log('Starting animation:', funcName);
      
      // Stop any currently running animation
      const lastFunc = getLastFunction();
      if (lastFunc && ANIMATION_FUNCTIONS[lastFunc]?.stop) {
        ANIMATION_FUNCTIONS[lastFunc].stop();
      }
      
      // Update the last function called
      setLastFunction(funcName);
      
      // Clear the canvas and start the new animation
      clear();
      ANIMATION_FUNCTIONS[funcName].start();
    });
  }

  // Clear Canvas Button (Button 8)
  const buttonClear = document.getElementById('button8');
  if (buttonClear) {
    buttonClear.addEventListener('click', () => {
      console.log('Clear canvas button clicked');
      clear();
    });
  }
  
  // Stop Animation Button (Button 9)
  const buttonStop = document.getElementById('button9');
  if (buttonStop) {
    buttonStop.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Stop button clicked, stopping all animations');
      
      try {
        // Call all stop functions to ensure complete cleanup
        Object.values(ANIMATION_FUNCTIONS).forEach(({ stop }) => {
          if (typeof stop === 'function') {
            try {
              console.log('Calling stop function');
              stop();
            } catch (err) {
              console.error('Error in stop function:', err);
            }
          }
        });
        
        // Clear all intervals and animation frames
        clearAllIntervals();
        
        console.log('All animations stopped');
        
      } catch (error) {
        console.error('Error stopping animations:', error);
        // Make sure to clear everything on error
        clearAllIntervals();
      }
    });
  }
};
