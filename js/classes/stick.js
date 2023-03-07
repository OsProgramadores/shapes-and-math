import { get_random_color } from '../app.js';
import { Line } from './line.js';
//Class stick provides a method to draw a 2 dimensional stick from a x and a y coordinate and a specific radius
export class Stick {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius/2;
  }

  drawCircle(context, x, y, radius, color) {
    //defines filling color
    context.fillStyle = color;

    //draws circle
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);

    //fills with color
    context.fill();
  }

  draw() {
    this.drawCircle(this.context, this.x, this.y, this.radius, get_random_color());

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
