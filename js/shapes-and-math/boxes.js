import { setupCanvas } from '../app.js';
import { Rectangle } from '../classes/rectangle.js';
import { registerInterval } from '../src/state/appState.js';

let continueAnime = true;
let myVarInterval = null;

const drawRandonRectangle = (c, context) => {
  const windowWidth = c.width;
  const windowHeight = c.height;

  let x1 = Math.floor((Math.random() * windowWidth) + 1);
  let y1 = Math.floor((Math.random() * windowHeight) + 1);
  let width = Math.floor((Math.random() * windowWidth) + 1);
  let height = Math.floor((Math.random() * windowHeight) + 1);

  let myRectangle = new Rectangle(context, x1, y1, width, height);
  if (!continueAnime){ return; }
  myRectangle.draw();
}

// The main function to draw boxes
export const drawBoxes = () => {
  // Clear any existing interval
  clearInterval(myVarInterval);
  
  // Reset animation flag
  continueAnime = true;
  
  // Start the animation
  const [c, context] = setupCanvas();
  if (!c || !context) return;
  
  // Clear the canvas
  context.clearRect(0, 0, c.width, c.height);
  
  // Start the animation loop
  myVarInterval = registerInterval(
    setInterval(() => { 
      if (continueAnime) {
        drawRandonRectangle(c, context);
      }
    }, 240)
  );
};

// Function to stop the animation
export const stopBoxes = () => {
  continueAnime = false;
  clearInterval(myVarInterval);
};