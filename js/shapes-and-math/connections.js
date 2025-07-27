import { 
  get_random_color, 
  setupCanvas, 
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
const selectDots = (qtyDots, context) => {
  let i, x, y, dot;
  let arr = [];

  //creates an array with random x,y coordinates
  for (i = 0; i < qtyDots; i++) {
    let x = Math.floor((Math.random() * context.width) + 1);
    let y = Math.floor((Math.random() * context.height) + 1);

    dot = [x, y];
    arr.push(dot);
  }

  return (arr);
}
//cp

const connectLines = (context, dots, color) => {
  // dots is array of x,y coordinates
  // color is the color to be used to color inside the polygon formed after connecting the dots
  let i, x, y, x1, y1, dot, dot1;

  //connects all dots on array dots
  for (i = 0; i < (dots.length - 1); i++) {
    dot = dots[i];

    //dots until penultimate
    let linesToBeConnected = dots.slice(dots.indexOf(dot), dots.length);
    x = dot[0];
    y = dot[1];

    //connect all dots for iteration to penultimate
    linesToBeConnected.forEach(function (ponto) {
      x1 = ponto[0];
      y1 = ponto[1];
      buildLine(context, x, y, x1, y1, color);
    }, this);
  }

  //Connects last dot on array back to first dot
  dot = dots[0];
  x = dot[0];
  y = dot[1];
  context.lineTo(x, y);
  context.strokeStyle = color;
  context.stroke();

  //Fills polygon with defined color
  //context.fill();
}
const draw = () => {
  const [c,context] = setupCanvas();
  let quantity = getQuantityOfDotsSelectedByUser();
  if (quantity > 1){
    connectLines(context, selectDots(quantity, c), get_random_color());
  }
}

// The main function to draw the connections
export const drawConnection = () => {
  // Clear any existing intervals
  const [canvas, context] = setupCanvas();
  if (!canvas || !context) return;
  
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the connections
  draw();
};

// Set up the button click handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const connectionButton = document.getElementById("button2");
  if (connectionButton) {
    connectionButton.addEventListener("click", drawConnection);
  }
});
