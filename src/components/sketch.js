import Boid from "./boid";

export default function sketch(p){
    let canvas;
    let boids = [];
    let num_boids = 1;

    var title = "Flocking Algorithm";
    var name = "Ron Rounsifer";

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth-1, p.windowHeight-1, p.WEBGL);
      p.translate(-p.width/2,-p.height/2,0);
      p.noStroke();
      p.fill(255, 255, 255);
      p.textSize(48);
      p.textAlign(p.CENTER);
      
      for (var i = 0; i < num_boids; i++) {
       // let x_pos = Math.floor(Math.random() * p.windowWidth) + 1;
       // let y_pos = Math.floor(Math.random() * p.windowHeight) + 1;
        let x_pos = p.width/2;
        let y_pos = p.height/2;
        let acc = p.createVector(0, 0);
        let vel = p.createVector(Math.round(Math.random()) * 2 - 1, Math.round(Math.random()) * 8 - 1);
        let pos = p.createVector(x_pos, y_pos);
        let radius = 10;
        
        boids.push(new Boid(p, acc, vel, pos, radius));
        p.circle(x_pos, y_pos, radius);
        p.fill('white');
    }
  }
    
    p.mouseClicked = () => {
      let acc = p.createVector(0, 0);
      let vel = p.createVector(Math.round(Math.random()) * 2 - 1, Math.round(Math.random()) * 2 - 1);
      let pos = p.createVector(p.mouseX, p.mouseY);
      let radius = 10;
      boids.push(new Boid(p, acc, vel, pos, radius));
      p.circle(p.mouseX, p.mouseY, radius);
      p.fill('white')
    }

    p.draw = () => {
      p.background('#282c34');
      p.translate(-p.width/2,-p.height/2,0);
      // Spinning
      //let time = p.millis();
      //p.rotateX(time/5000);
      //p.orbitControl();
      //p.rotateZ(time/5000);
      p.text(title,0,0);
      
      
      boids.forEach((boid) => {
        boid.move(boids);
        boid.display();
      })
    }
}