import { setupCanvas } from '../app.js';
import { Rectangle } from '../classes/rectangle.js';
const boxesButton = document.getElementById("button5");
const buttonStop = document.getElementById("button9");
let continueAnime = true;

const drawRandonRectangle = (c, context) => {
  const windowWidth = c.width;
  const windowHeight = c.height;

  let x1 = Math.floor((Math.random() * windowWidth) + 1);
  let y1 = Math.floor((Math.random() * windowHeight) + 1);
  let width = Math.floor((Math.random() * windowWidth) + 1);
  let height = Math.floor((Math.random() * windowWidth) + 1);

  let myRectangle = new Rectangle(context, x1, y1, width, height);
  if (!continueAnime){ return; }
  myRectangle.draw();
}

const boxes = () => {
  const [c,context] = setupCanvas();
  setInterval(() => { drawRandonRectangle(c,context); }, 240);
}

const stop = () => { continueAnime = false; }

export const drawBoxes = boxesButton.addEventListener("click", boxes);
export const stopBoxes = buttonStop.addEventListener("click", stop);
