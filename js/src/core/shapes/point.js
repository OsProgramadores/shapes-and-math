const pi = 3.1415926535897932384626433832795028841971;

export class Point {
  constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
  }
  rotateX(amount) {
      let y = this.y;
      this.y = (y * Math.cos(amount)) + (this.z * Math.sin(amount) * -1.0);
      this.z = (y * Math.sin(amount)) + (this.z * Math.cos(amount));
  }
  rotateY(amount) {
      let x = this.x;
      this.x = x * Math.cos(amount) + this.z * Math.sin(amount) * -1.0;
      this.z = x * Math.sin(amount) + this.z * Math.cos(amount);
  }
  rotateZ(amount) {
      let x = this.x;
      this.x = (x * Math.cos(amount)) + (this.y * Math.sin(amount) * -1.0);
      this.y = (x * Math.sin(amount)) + (this.y * Math.cos(amount));
  }
  getProjection(distance, xy, offSet, offSetZ) {
      return (distance * xy) / (this.z - offSetZ) + offSet;
  }
  draw(x, y, context, size = 1.5, color = "rgb(0,0,0)") {
      if (!context) {
          console.error("No context provided to Point.draw()");
          return;
      }
      context.save();
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, size, 0, 2 * Math.PI, true);
      context.fill();
      context.restore();
  }
}
