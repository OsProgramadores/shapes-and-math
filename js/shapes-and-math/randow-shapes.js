import { setupCanvas, get_random_color } from '../app.js';
const buttonRand = document.getElementById("button3");
var myVarInterval = 0;
//draws a circle centered at x,y and with radius = radius
function drawCircle(context, x, y, radius, color) {
  //defines filling color
  context.fillStyle = color;

  //draws circle
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);

  //fills with color
  context.fill();
}

//draws a parallelogram
function drawParallelogram(context, x1, y1, x2, y2, side, color) {
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
function drawTriangle(context, x1, y1, x2, y2, x3, y3, color) {
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
function drawShapes(c, context) {
  //Determines Canvas dimennsion
  const windowWidth = c.width
  const windowHeight = c.height

  //Draws circle
  //selects random center
  var x = Math.floor((Math.random() * windowWidth) + 1);
  var y = Math.floor((Math.random() * windowHeight) + 1);

  //selects random radius
  var radius = Math.floor((Math.random() * windowHeight) / 2);

  //selects random color
  var color = get_random_color();

  //Draws circle
  drawCircle(context, x, y, radius, color);

  //selects three random points and a random color and draws a triangle
  var x1 = Math.floor((Math.random() * windowWidth) + 1);
  var y1 = Math.floor((Math.random() * windowHeight) + 1);
  var x2 = Math.floor((Math.random() * windowWidth) + 1);
  var y2 = Math.floor((Math.random() * windowHeight) + 1);
  var x3 = Math.floor((Math.random() * windowWidth) + 1);
  var y3 = Math.floor((Math.random() * windowHeight) + 1);

  //selects random color
  var color = get_random_color();

  //draws triangle
  drawTriangle(context, x1, y1, x2, y2, x3, y3, color);

  //selects two points and a random side and draws a paralellogram
  var x4 = Math.floor((Math.random()*windowWidth) + 1);
  var y4 = Math.floor((Math.random()*windowHeight) + 1);
  var x5 = Math.floor((Math.random()*windowWidth) + 1);
  var y5 = Math.floor((Math.random()*windowHeight) + 1);
  var side = Math.floor((Math.random()*windowWidth) + 1);

  //selects random color
  var color2 = get_random_color();

  //draws parallelogram
  drawParallelogram(context, x4, y4, x5, y5, side, color2);
}

function randomDrawing() {
  var [c, context] = setupCanvas();
  myVarInterval = setInterval(function () { drawShapes(c, context) }, 240);
}

export const drawRand = buttonRand.addEventListener("click", randomDrawing);
