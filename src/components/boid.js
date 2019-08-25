/******************************************************************
 * A boid that will fly around the universe.
 * 
 * @author Ron Rounsifer
 ******************************************************************/
import { Component } from 'react';

/******************************************************************
 * A Total Daily Exercise Expenditure calculator form.
 ******************************************************************/
class Boid extends Component {

    constructor(p, acc, vel, pos, radius) {
        super();
        this.p = p;
        this.acceleration = acc;
        this.velocity = vel;
        this.position = pos;
        this.radius = radius;
        this.max_speed = 3.0;
        this.max_force = 0.03;
        this.vision = 75;
    }

    move = (boids) => {

        // implement the 3 checks here
        // 1 - Separation
        // 2 - Alignment
        // 3 - Cohesion
        let sep = this.separationForce(boids);
        let align = this.alignmentForce(boids);
        let coh = this.cohesionForce(boids);

        // arbitrary weights
        sep = sep.mult(1.5);
        align = align.mult(1.0);
        coh = coh.mult(1.0);

        this.applyForce(sep);
        this.applyForce(align);
        this.applyForce(coh);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_speed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        
        // check window boundaries
        if (this.position.x <= 0) {
            this.position.x = this.p.windowWidth - 1;
        } 
        if (this.position.x >= this.p.windowWidth) {
            this.position.x = 1;
        }
        if (this.position.y <= 0){
            this.position.y = this.p.windowHeight - 1;
        }
        if (this.position.y >= this.p.windowHeight) {
            this.position.y = 1;
        }
    }

    applyForce = (force) => {
        this.acceleration.add(force);
        this.acceleration.limit(this.max_speed);
    }


    separationForce = (flock) => {
        let sep_dist = this.radius * 2;
        let steer = this.p.createVector(0,0);
        let count = 0.0;

        flock.forEach((boid) => {
            let dist = this.position.dist(boid.position);
            if ((dist > 0) && (dist < sep_dist)) {
                // Calculate a vector that points away from the close boid
                let diff = this.position.sub(boid.position);
                diff.normalize();
                diff.div(dist);
                steer.add(diff);
                count += 1.0;
            }
        })
        if (count > 0) {
            steer.div(count);
            steer.normalize();
            steer.mult(this.max_speed);
            steer.sub(this.velocity);
            steer.limit(this.max_force);
            return steer;
        } else {
            return this.p.createVector(0,0);
        }
    }

    /**
     * Calculate the average velocity of each boids neighbors.
     */
    alignmentForce = (flock) => {
        let count = 0.0;
        let sum = this.p.createVector(0,0);
        flock.forEach((boid) => {

            // only align with those that are close enough
            // to the current boid
            let dist = this.position.dist(boid.position);
            if ((dist > 0) && (dist < this.vision)) {
                sum.add(boid.velocity);
                count += 1.0;
            }
        });
        if (count > 0) {

            // Return steering force vector if there are other boids
            // close by
            sum.div(count);
            sum.normalize();
            sum.mult(this.max_speed);

            // steering force formula
            let steer = sum.sub(this.velocity);
            steer.limit(this.max_force)
            return steer;
        } else {
            // Return 0 force vector if no other boids are close
            return new this.p.createVector(0,0);
        }
    }

    /**
     * Calculate the average position of each boids neighbors.
     */
    cohesionForce = (flock) => {
        
        let sum = this.p.createVector(0,0);
        let count = 0;
        flock.forEach((boid) => {
            let dist = this.position.dist(boid.position);
            if ((dist > this.radius) && (dist < this.vision)) {
                sum.add(boid.position);
                count++;
            }
        });

        if (count > 0) {
            // Return steering force vector if there are other boids
            // close by
            sum.div(count);
            let desired = sum.sub(this.position);
            desired.normalize();
            desired.mult(this.max_speed);
            let steer = desired.sub(this.velocity);
            steer.limit(this.max_force);
            return steer;
        } else {
            // Return 0 force vector if no other boids are close
            return this.p.createVector(0,0);
        }

    }

    /**
     * Displays the boid on the canvas.
     */
    display = () => {
        this.p.fill('white');
        this.p.circle(this.position.x, this.position.y, this.radius);
    }
}

export default Boid;