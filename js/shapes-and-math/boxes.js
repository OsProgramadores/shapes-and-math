import { setupCanvas } from '../app.js';
import { Rectangle } from '../classes/rectangle.js';
const boxesButton = document.getElementById("button5");
const buttonStop = document.getElementById("button9");
var myVarInterval = 0;
let continuaAnime = true;

const drawRandonRectangle = (c, context) => {

  const windowWidth = c.width;
  const windowHeight = c.height;

  var x1 = Math.floor((Math.random() * windowWidth) + 1);
  var y1 = Math.floor((Math.random() * windowHeight) + 1);
  var width = Math.floor((Math.random() * windowWidth) + 1);
  var height = Math.floor((Math.random() * windowWidth) + 1);

  var myRectangle = new Rectangle(context, x1, y1, width, height);
  if (!continuaAnime){ return; }
  myRectangle.draw();
}

const boxes = () => {
  var [c,context] = setupCanvas();
  setInterval(function () { drawRandonRectangle(c,context); }, 240);
}
const stop = () => {
  continuaAnime = false;
}

export const drawBoxes = boxesButton.addEventListener("click", boxes);
export const stopBoxes = buttonStop.addEventListener("click", stop);

