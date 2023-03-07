//Defines class line
//class lines provides the method to draw a 2 dimennsion line segment between points P1 and P2.
//P1 coordinates = x1, y1
//P2 coordinates = x2, y2
export class Line {
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

