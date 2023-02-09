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

//Class stick provides a method to draw a 2 dimensional stick from a x and a y coordinate and a specific radius
class Stick {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius/2;
  }

  draw() {
    drawCircle(this.context, this.x, this.y, this.radius, get_random_color());

    var line1 = new Line(this.context, this.x, this.y + this.radius, this.x, this.y + 2*this.radius);
    line1.draw();

    var line2 = new Line(this.context, this.x, this.y + 1.5*this.radius, this.x - this.radius/2.5,
                         this.y + 1.75*this.radius);
    line2.draw();

    var line3 = new Line(this.context, this.x, this.y + 1.5*this.radius, this.x + this.radius/2.5,
                         this.y + 1.75*this.radius);
    line3.draw();

    var line4 = new Line(this.context, this.x, this.y + 2*this.radius, this.x - this.radius/2.5,
                         this.y + 3.0*this.radius);
    line4.draw();

    var line5 = new Line(this.context, this.x, this.y + 2*this.radius, this.x + this.radius/2.5,
                         this.y + 3.0*this.radius);
    line5.draw();
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
//cp
function drawRandonRectangle(context) {

  windowWidth = context.canvas.width;
  windowHeight = context.canvas.height;

  var x1 = Math.floor((Math.random() * windowWidth) + 1);
  var y1 = Math.floor((Math.random() * windowHeight) + 1);
  var width = Math.floor((Math.random() * windowWidth) + 1);
  var height = Math.floor((Math.random() * windowWidth) + 1);

  var myRectangle = new Rectangle(context, x1, y1, width, height);
  myRectangle.draw();

}

function drawRandomStick(context) {

  windowWidth = context.canvas.width;
  windowHeight = context.canvas.height;
  var x1 = Math.floor((Math.random() * windowWidth) + 1);
  var y1 = Math.floor((Math.random() * windowHeight) + 1);

  var radius = Math.floor((Math.random() * windowHeight) / 2);

  var myStick = new Stick(context, x1, y1, radius);
  myStick.draw();
}

// `points` is array of x, y, z coordinates, but z is
// used only in calculations, since the canvas context
// is 2D. `time` is used to animate the attractor
function drawLorenzAttractor(context, points, time) {
  var centerX = context.canvas.width/2;
  var centerY = context.canvas.height/2;
  var scale = context.canvas.width / 100;

  // clear canvas for redrawing
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.beginPath();
  context.moveTo(centerX, centerY);

  for (var i = 0; i < time; i++) {
    var x = points[i].x;
    var y = points[i].y;

    context.lineTo(centerX + (x * scale), centerY + (y * scale));
  }

  context.strokeStyle = "#990099";
  context.stroke();
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
  var dots = document.getElementById('sliderValue').innerHTML
  
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

function stick() {
  var context = setupCanvas();
  myVarInterval = setInterval(function () { drawRandomStick(context); }, 1000);
}

function lorenz() {
  var context = setupCanvas();

  // initial position can't be (0,0,0), since it is a fixed point
  var initialPosition = {
    x: 0.1,
    y: 0.1,
    z: 0.1,
  };

  var points = [initialPosition];
  var max = 10000;

  for (var i = 0; i < max; i++) {
    var point = points[i];
    var newPoint = calcLorenz(point.x, point.y, point.z);

    points.push(calcLorenz(point.x, point.y, point.z));
  }

  var t = 0;
  var speed = 10;

  myVarInterval = setInterval(function () {
    drawLorenzAttractor(context, points, Math.min(t, max));
    t += speed;
  }, 100);
}

function calcLorenz(x, y, z) {
  var dt = 0.01;

  // params used by Lorenz
  var a = 10;
  var b = 8/3;
  var c = 28;

  // Lorenz's equations
  var dx = (a * (y - x)) * dt;
  var dy = (x * (c - z) - y) * dt;
  var dz = ((x * y) - (b * z)) * dt;

  return {
    x: x + dx,
    y: y + dy,
    z: z + dz,
  };
}


