import { setupCanvas } from '../app.js';
import { Point } from '../classes/point.js';

let continuaAnime = true;
let animationFrameId = null;
let toroide = null;
let w = 0;
let h = 0;
let context = null;
const pi = Math.PI;

class Torus {
    constructor(innerRadius = 10, outterRadius = 20, vertexQuantity = 20) {
        this.point = [];
        this.color = "rgb(100,0,255)";
        this.innerRadius = innerRadius;
        this.outterRadius = outterRadius;
        this.numVertexes = 0;
        this.vertexQuantity = vertexQuantity;
        this.rotation = 0;
        this.distance = 0;
        this.init();
    }
    init() {
        let increment = pi / this.vertexQuantity;
        for (let alpha = increment; alpha <= 2 * pi; alpha += increment) {
            for (let beta = increment; beta <= 2 * pi; beta += increment) {
                let p = (this.point[this.numVertexes] = new Point());
                p.x = (this.outterRadius + this.innerRadius * Math.cos(beta)) * Math.cos(alpha);
                p.y = (this.outterRadius + this.innerRadius * Math.cos(beta)) * Math.sin(alpha);
                p.z = this.innerRadius * Math.sin(beta);
                this.numVertexes++;
            }
        }
    }
    draw() {
        if (!context) {
            console.error("No context available in Torus.draw()");
            return;
        }
        
        let x, y;
        let p = new Point();
        for (let i = 0; i < this.numVertexes; i++) {
            p.x = this.point[i].x;
            p.y = this.point[i].y;
            p.z = this.point[i].z;
            p.rotateX(this.rotation); // Rotate around X axis
            p.rotateY(this.rotation); // Rotate around Y axis
            // p.rotateZ(this.rotation); // Uncomment to enable Z rotation
            
            // Project 3D point to 2D
            x = p.getProjection(this.distance, p.x, w / 2.0, 100.0);
            y = p.getProjection(this.distance, p.y, h / 2.0, 100.0);
            
            // Draw the point with the current context
            p.draw(x, y, context);
        }
    }
    update() {
        this.rotation += pi / 360.0;
        this.distance = 700;
    }
}
// The main function to draw the torus
export const torusDraw = () => {
  // Stop any existing animation
  torusStop();
  
  // Reset animation flag
  continuaAnime = true;
  
  // Setup canvas and get context
  const [canvas, ctx] = setupCanvas();
  if (!canvas || !ctx) return;
  
  // Set global variables
  context = ctx;
  w = canvas.width;
  h = canvas.height;
  
  // Initialize torus if not already done
  if (!toroide) {
    toroide = new Torus();
  }
  
  // Clear the canvas
  context.clearRect(0, 0, w, h);
  
  // Start the animation loop
  const animate = () => {
    if (!continuaAnime) return;
    
    context.save();
    context.clearRect(0, 0, w, h);
    toroide.draw();
    context.restore();
    toroide.update();
    
    animationFrameId = window.requestAnimationFrame(animate);
  };
  
  animate();
};

// Function to stop the animation
export const torusStop = () => {
  continuaAnime = false;
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};
