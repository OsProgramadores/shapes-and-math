import { 
  setupCanvas, 
  get_random_color
} from '../app.js';
import { Stick } from '../classes/stick.js';
const buttonStick = document.getElementById("button4");
const buttonStop = document.getElementById("button9");
let myVarInterval = 0;
let continueAnime = true;

const drawRandomStick = (c, context) => {

  const windowWidth = c.width;
  const  windowHeight = c.height;
  let x1 = Math.floor((Math.random() * windowWidth) + 1);
  let y1 = Math.floor((Math.random() * windowHeight) + 1);

  let radius = Math.floor((Math.random() * windowHeight) / 2);

  let myStick = new Stick(context, x1, y1, radius);
  if (!continueAnime){ return; }
  myStick.draw();
}

const stick = () => {
  const [c, context] = setupCanvas();
  myVarInterval = setInterval(() => { drawRandomStick(c, context); }, 1000);
}

const stop = () => { continueAnime = false; };

export const stopStick = buttonStop.addEventListener("click", stop);
export const drawStick = buttonStick.addEventListener("click", stick);
