import { 
  setupCanvas, 
  get_random_color,
  getQuantityOfDotsSelectedByUser 
} from '../app.js';

const buildLine = (context, x, y, x1, y1, color) => {
  //build line from x,y to x1,y1
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  context.strokeStyle = color;
  context.stroke();
}

//Selects a qtyDots of dots based on the current context boundaries - returns an array of dots x,y coordinates
export const selectDots = (qtyDots, context) => {
  var i, x, y, dot, arr;
  var arr = [];

  //creates an array with random x,y coordinates
  for (i = 0; i < qtyDots; i++) {
    var x = Math.floor((Math.random() * context.width) + 1);
    var y = Math.floor((Math.random() * context.height) + 1);

    dot = [x, y];
    arr.push(dot);
  }

  return (arr);
}

//connects points based on coordinated contained on x,y array
export const connectDots = (context, dots, color) => {
  // dots is array of x,y coordinates
  // color is the color to be used to color inside the polygon formed after connecting the dots
  var i, x, y, x1, y1, dot, dot1;

  //connects all dots on array dots
  for (i = 0; i < (dots.length - 1); i++) {
    dot = dots[i];
    dot1 = dots[i + 1];
    x = dot[0];
    y = dot[1];
    x1 = dot1[0];
    y1 = dot1[1];
    buildLine(context, x, y, x1, y1, color);
  }
}

const draw = () => {
  var [c,context] = setupCanvas();
  let quantity = getQuantityOfDotsSelectedByUser();
  connectDots(context, selectDots(quantity, c), get_random_color());
}

// The main function to draw the path
export const drawPath = () => {
  // Clear any existing intervals
  const [canvas, context] = setupCanvas();
  if (!canvas || !context) return;
  
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the path
  draw();
};

// Set up the button click handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const buttonPath = document.getElementById("button1");
  if (buttonPath) {
    buttonPath.addEventListener("click", drawPath);
  }
});
