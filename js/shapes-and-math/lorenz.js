import { setupCanvas } from '../app.js';
const buttonLorenz = document.getElementById("button6");
var myVarInterval = 0;
// `points` is array of x, y, z coordinates, but z is
// used only in calculations, since the canvas context
// is 2D. `time` is used to animate the attractor
const drawLorenzAttractor = (c, context, points, time) => {
  var centerX = c.width/2;
  var centerY = c.height/2;
  var scale = c.width / 100;

  // clear canvas for redrawing
  context.clearRect(0, 0, c.width, c.height);

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

const lorenz = () => {
  var [c, context] = setupCanvas();

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
    drawLorenzAttractor(c, context, points, Math.min(t, max));
    t += speed;
  }, 100);
}

const calcLorenz = (x, y, z) => {
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

export const drawLorenz = buttonLorenz.addEventListener("click", lorenz);
