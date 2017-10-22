
//Defines variable that will handle routines that are executed at a specific interval
var myVarInterval = 0;
var lastFunctionCalled;

//Defines class line
//class lines provides the method to draw a 2 dimennsion line segment between points P1 and P2.
//P1 coordinates = x1, y1
//P2 coordinates = x2, y2
class Line {
  constructor(context, x1, y1, x2, y2) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    this.context.beginPath();
    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.stroke();
  }
}

//Class Rectangle provides the method to draw a 2 dimensional rectangle with the top left vertice positioned on x1,y2
class Rectangle {
  constructor(context, x1, y1, length, height) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.length = length;
    this.height = height;
  }

  draw() {
    var x2 = this.x1 + this.length;
    var y2 = this.y1 + this.height;

    var side1 = new Line(this.context, this.x1, this.y1, x2, this.y1);
    side1.draw();

    var side2 = new Line(this.context, x2, this.y1, x2, y2);
    side2.draw();

    var side3 = new Line(this.context, x2, y2, this.x1, y2);
    side3.draw();

    var side4 = new Line(this.context, this.x1, y2, this.x1, this.y1);
    side4.draw();
  }

}

//selects random colors
function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

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

// draws a rectangle at x1,y1
function drawAndFillRectangle(context, x1, y1, length, height) {
  //draws rectangle
  context.fillStyle = 'red';
  context.fillRect(x1, y1, length, height);
}

function buildLine(context, x, y, x1, y1, color) {
  //build line from x,y to x1,y1
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  context.strokeStyle = color;
  context.stroke();
}

//connects points based on coordinated contained on x,y array
function connectDots(context, dots, color) {
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

function connectLines(context, dots, color) {
  // dots is array of x,y coordinates
  // color is the color to be used to color inside the polygon formed after connecting the dots
  var i, x, y, x1, y1, dot, dot1;

  //connects all dots on array dots
  for (i = 0; i < (dots.length - 1); i++) {
    dot = dots[i];

    //dots until penultimate
    var linesToBeConnected = dots.slice(dots.indexOf(dot), dots.length);
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


//draws multiple shapes
function drawShapes(context) {
  //Determines Canvas dimennsion
  windowWidth = context.canvas.width
  windowHeight = context.canvas.height

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
}

//Selects a qtyDots of dots based on the current context boundaries - returns an array of dots x,y coordinates
function selectDots(qtyDots, context) {
  var i, x, y, dot, arr;
  var arr = [];

  //creates an array with random x,y coordinates
  for (i = 0; i < qtyDots; i++) {
    var x = Math.floor((Math.random() * context.canvas.width) + 1);
    var y = Math.floor((Math.random() * context.canvas.height) + 1);

    dot = [x, y];
    arr.push(dot);
  }

  return (arr);
}

function drawRandonRectangle(context) {

  windowWidth = context.canvas.width
  windowHeight = context.canvas.height

  var x1 = Math.floor((Math.random() * windowWidth) + 1);
  var y1 = Math.floor((Math.random() * windowHeight) + 1);
  var width = Math.floor((Math.random() * windowWidth) + 1);
  var height = Math.floor((Math.random() * windowWidth) + 1);

  var myRectangle = new Rectangle(context, x1, y1, width, height);
  myRectangle.draw();

}

function setupCanvas() {
  var canvas = document.getElementById("TheCanvas");
  var context = canvas.getContext('2d');

  //Clears the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Clear previous myVarInterval settings
  clearInterval(myVarInterval);
  return context;
}

function getQuantityOfDotsSelectedByUser() {
  var dots = document.getElementById("dots").value;
  
  return Number.parseInt(dots);
}

function drawPath() {
  var context = setupCanvas();
  let quantity = getQuantityOfDotsSelectedByUser();
  connectDots(context, selectDots(quantity, context), get_random_color());
}

function drawConnections() {
  var context = setupCanvas();
  let quantity = getQuantityOfDotsSelectedByUser();
  if (quantity > 1){
    connectLines(context, selectDots(quantity, context), get_random_color());
  }
}

function randomDrawing() {
  var context = setupCanvas();
  myVarInterval = setInterval(function () { drawShapes(context) }, 240);
}

function boxes() {
  var context = setupCanvas();
  myVarInterval = setInterval(function () { drawRandonRectangle(context); }, 240);
}