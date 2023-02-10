import { setupCanvas } from '../app.js';
const buttonLorenz = document.getElementById("button6");
const buttonStop = document.getElementById("button9");
let myVarInterval = 0;
let continueAnime = true;
// `points` is array of x, y, z coordinates, but z is
// used only in calculations, since the canvas context
// is 2D. `time` is used to animate the attractor
const drawLorenzAttractor = (c, context, points, time) => {
  let centerX = c.width/2;
  let centerY = c.height/2;
  let scale = c.width / 100;

  // clear canvas for redrawing
  context.clearRect(0, 0, c.width, c.height);

  context.beginPath();
  context.moveTo(centerX, centerY);

  for (let i = 0; i < time; i++) {
    let x = points[i].x;
    let y = points[i].y;

    context.lineTo(centerX + (x * scale), centerY + (y * scale));
  }

  context.strokeStyle = "#990099";
  context.stroke();
}

const lorenz = () => {
  let [c, context] = setupCanvas();

  // initial position can't be (0,0,0), since it is a fixed point
  let initialPosition = {
    x: 0.1,
    y: 0.1,
    z: 0.1,
  };

  let points = [initialPosition];
  let max = 10000;

  for (let i = 0; i < max; i++) {
    let point = points[i];
    let newPoint = calcLorenz(point.x, point.y, point.z);

    points.push(calcLorenz(point.x, point.y, point.z));
  }

  let t = 0;
  let speed = 10;

  myVarInterval = setInterval(function () {
    drawLorenzAttractor(c, context, points, Math.min(t, max));
    t += speed;
  }, 100);
}

const calcLorenz = (x, y, z) => {
  let dt = 0.01;

  // params used by Lorenz
  let a = 10;
  let b = 8/3;
  let c = 28;

  // Lorenz's equations
  let dx = (a * (y - x)) * dt;
  let dy = (x * (c - z) - y) * dt;
  let dz = ((x * y) - (b * z)) * dt;

  return {
    x: x + dx,
    y: y + dy,
    z: z + dz,
  };
}
const stop = () => { continueAnime = false; }

export const stopLorenz = buttonStop.addEventListener("click", stop);
export const drawLorenz = buttonLorenz.addEventListener("click", lorenz);
