import { setupCanvas, get_random_color } from '@/app.js';
import { registerInterval } from '@/state/appState.js';

let myVarInterval = 0;
let continueAnime = true;
//draws a circle centered at x,y and with radius = radius
const drawCircle = (context, x, y, radius, color) => {
  //defines filling color
  context.fillStyle = color;

  //draws circle
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);

  //fills with color
  context.fill();
}

//draws a parallelogram
const drawParallelogram = (context, x1, y1, x2, y2, side, color) => {
    //points must not be in the same line
    if(x1 === x2)
        x2++;

    if(y1 === y2)
        y2++;

    //parallelograms will be filled with color
    context.fillStyle = color;

    //drawing line between points
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x1 + side, y1);
    context.lineTo(x2 + side, y2);
    context.lineTo(x2, y2);
    context.lineTo(x1,y1);
    context.stroke();

    //Fills parallelogram with defined color
    context.fill();
}

//draws a triangle
const drawTriangle = (context, x1, y1, x2, y2, x3, y3, color) => {
  //triangle will be filled with color
  context.fillStyle = color;

  //draws lines connecting three points
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x1, y1);
  context.stroke();

  //Fills triangle with defined color
  context.fill();
}

//draws multiple shapes
const drawShapes = (c, context) => {
  if (!continueAnime){ return; }

  //Determines Canvas dimennsion
  const windowWidth = c.width
  const windowHeight = c.height

  //Draws circle
  //selects random center
  let x = Math.floor((Math.random() * windowWidth) + 1);
  let y = Math.floor((Math.random() * windowHeight) + 1);

  //selects random radius
  let radius = Math.floor((Math.random() * windowHeight) / 2);

  //selects random color
  let color = get_random_color();

  //Draws circle
  drawCircle(context, x, y, radius, color);

  //selects three random points and a random color and draws a triangle
  let x1 = Math.floor((Math.random() * windowWidth) + 1);
  let y1 = Math.floor((Math.random() * windowHeight) + 1);
  let x2 = Math.floor((Math.random() * windowWidth) + 1);
  let y2 = Math.floor((Math.random() * windowHeight) + 1);
  let x3 = Math.floor((Math.random() * windowWidth) + 1);
  let y3 = Math.floor((Math.random() * windowHeight) + 1);

  //selects random color
  let color2 = get_random_color();

  //draws triangle
  drawTriangle(context, x1, y1, x2, y2, x3, y3, color2);

  //selects two points and a random side and draws a paralellogram
  let x4 = Math.floor((Math.random()*windowWidth) + 1);
  let y4 = Math.floor((Math.random()*windowHeight) + 1);
  let x5 = Math.floor((Math.random()*windowWidth) + 1);
  let y5 = Math.floor((Math.random()*windowHeight) + 1);
  let side = Math.floor((Math.random()*windowWidth) + 1);

  //selects random color
  let color3 = get_random_color();

  //draws parallelogram
  drawParallelogram(context, x4, y4, x5, y5, side, color3);
}

const randomDrawing = () => {
  const [c, context] = setupCanvas();
  myVarInterval = registerInterval(setInterval(() =>{ drawShapes(c, context) }, 240));
}

const stop = () => { continueAnime = false; };

// The main function to draw random shapes
export const drawRand = () => {
  // Clear any existing interval
  clearInterval(myVarInterval);
  
  // Reset animation flag
  continueAnime = true;
  
  // Start the animation
  randomDrawing();
};

// Function to stop the animation
export const stopRand = () => {
  continueAnime = false;
  if (myVarInterval) {
    clearInterval(myVarInterval);
    myVarInterval = 0;
  }
};

// Export functions for testing
export {
  drawCircle,
  drawParallelogram,
  drawTriangle,
  drawShapes
};
