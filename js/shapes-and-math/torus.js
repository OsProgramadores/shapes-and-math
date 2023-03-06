import { setupCanvas } from '../app.js';
import { Point } from '../classes/point.js';

const [ c, context ] = setupCanvas(); 
const stopButton = document.getElementById("button9");
const drawButton = document.getElementById("button7");
let continuaAnime = true;
const w = c.width;
const h = c.height;
const pi = 3.1415926535897932384626433832795028841971;
document.body.appendChild(c);

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
        let x, y;
        let p = new Point();
        for (let i = 0; i < this.numVertexes; i++) {
            p.x = this.point[i].x;
            p.y = this.point[i].y;
            p.z = this.point[i].z;
            p.rotateX(this.rotation); // Orientação de giro no eixo x
            p.rotateY(this.rotation); // Orientação de giro no eixo y
            //p.rotateZ(this.rotation); // Orientação de giro no eixo z
            x = p.getProjection(this.distance, p.x, w / 2.0, 100.0);
            y = p.getProjection(this.distance, p.y, h / 2.0, 100.0);
            p.draw(x, y);
        }
    }
    update() {
        this.rotation += pi / 360.0;
        this.distance = 700;
    }
}
const toroide = new Torus();
const draw = () => {
  if (!continuaAnime) { continuaAnime = true;return; }
  window.requestAnimationFrame(draw);
  context.save();
  context.clearRect(0, 0, w, h);
  toroide.draw();
  context.restore();
  toroide.update();
}

const stop = () => { continuaAnime = false; }

export const torusStop = stopButton.addEventListener("click", stop);
export const torusDraw = drawButton.addEventListener("click", draw);
