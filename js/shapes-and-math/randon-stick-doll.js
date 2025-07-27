import { 
  setupCanvas, 
  get_random_color
} from '../app.js';
import { Stick } from '../classes/stick.js';

let myVarInterval = 0;
let continueAnime = true;

const drawRandomStick = (c, context) => {

  const windowWidth = c.width;
  const  windowHeight = c.height;
  let x1 = Math.floor((Math.random() * windowWidth) + 1);
  let y1 = Math.floor((Math.random() * windowHeight) + 1);

  let radius = Math.floor((Math.random() * windowHeight) / 2);

  let myStick = new Stick(context, x1, y1, radius);
  if (!continueAnime){ return; }
  myStick.draw();
}

const stick = () => {
  const [c, context] = setupCanvas();
  myVarInterval = setInterval(() => { drawRandomStick(c, context); }, 1000);
}

const stop = () => { continueAnime = false; };

// The main function to draw stick dolls
export const drawStick = () => {
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
  myVarInterval = setInterval(() => { 
    drawRandomStick(c, context); 
  }, 1000);
};

// Function to stop the animation
export const stopStick = () => {
  continueAnime = false;
  clearInterval(myVarInterval);
};

// Set up the button click handlers when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const buttonStick = document.getElementById("button4");
  const buttonStop = document.getElementById("button9");
  
  if (buttonStick) {
    buttonStick.addEventListener("click", drawStick);
  }
  
  if (buttonStop) {
    buttonStop.addEventListener("click", stopStick);
  }
});
