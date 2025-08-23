import { setupCanvas } from '@/app.js';
import { registerInterval } from '@/state/appState.js';

// Store animation state in an object to ensure proper scoping
const lorenzState = {
  animationInterval: null,
  isAnimating: false
};
// `points` is array of x, y, z coordinates, but z is
// used only in calculations, since the canvas context
// is 2D. `time` is used to animate the attractor
const drawLorenzAttractor = (c, context, points, time) => {
  let centerX = c.width/2;
  let centerY = c.height/2;
  let scale = c.width / 100;
  
  if (!lorenzState.isAnimating) { return; }

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

export const drawLorenz = () => {
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
  lorenzState.isAnimating = true;
  let t = 0;
  let speed = 10;

  // Clear any existing interval
  if (lorenzState.animationInterval) {
    clearInterval(lorenzState.animationInterval);
  }

  // Set up new animation loop and register it
  lorenzState.animationInterval = registerInterval(setInterval(() => {
    if (!lorenzState.isAnimating) {
      clearInterval(lorenzState.animationInterval);
      return;
    }
    drawLorenzAttractor(c, context, points, Math.min(t, max));
    t += speed;
  }, 100));
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
export const stopLorenz = () => { 
  lorenzState.isAnimating = false;
  if (lorenzState.animationInterval) {
    clearInterval(lorenzState.animationInterval);
    lorenzState.animationInterval = null;
  }
}
