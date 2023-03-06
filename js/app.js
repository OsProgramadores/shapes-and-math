import { torusDraw, torusStop } from './shapes-and-math/torus.js';
import { drawBoxes, stopBoxes } from './shapes-and-math/boxes.js';
import { drawConnection } from './shapes-and-math/connections.js';
import { drawLorenz, stopLorenz } from './shapes-and-math/lorenz.js';
import { drawPath } from './shapes-and-math/path.js'; 
import { drawRand } from './shapes-and-math/randow-shapes.js';
import { drawStick } from './shapes-and-math/randon-stick-doll.js';

//Defines variable that will handle routines that are executed at a specific interval
let myVarInterval = 0;
export let lastFunctionCalled;

export const setupCanvas = () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');

  //Clears the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Clear previous myVarInterval settings
  clearInterval(myVarInterval);
  return [canvas, context];
}

//selects random colors
export const get_random_color = () => {
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

export let getQuantityOfDotsSelectedByUser = () => {
  let dots = document.getElementById('sliderValue').innerHTML
  return Number.parseInt(dots);
}

const clear = () => {
  const [c, context] = setupCanvas();
  clearInterval();
  context.clearRect(0, 0, c.width, c.height);
}

const buttonClear = document.getElementById("button8");
let clearButton = buttonClear.addEventListener("click", clear);
