import { Line } from './line.js';
//Class Rectangle provides the method to draw a 2 dimensional rectangle with the top left vertice positioned on x1,y2
export class Rectangle {
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
