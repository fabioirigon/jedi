const Vector2 = Phaser.Math.Vector2;

class Movement {

    constructor(max_speed = Infinity) {
        this.acceleration = new Vector2();
        this.velocity = new Vector2();
        this.max_speed = max_speed;
    }
    
    setVelocity(x = 0, y = 0) {
        this.velocity.set(x, y);

        if(this.velocity.length() > this.max_speed) {
            this.velocity.setLength(this.max_speed);
        }
        
        return this;
    }

    addVelocity(velocity) {
        this.velocity.add(velocity);

        if(this.velocity.length() > this.max_speed) {
            this.velocity.setLength(this.max_speed);
        }

        return this;
    }

    setMaxSpeed(max_speed) {
        this.max_speed = max_speed;
        return this;
    }
    
    applyAcceleration(x, y, scale_factor, delta) {
        this.acceleration.set(x, y).scale(scale_factor * delta);
        this.addVelocity(this.acceleration);

        return this;
    }
    
    applyDrag(delta, drag) {
        let vx = this.velocity.x;
        let vy = this.velocity.y;
        drag *= delta;

        if(this.acceleration.x == 0) {
            if (vx - drag > 0) {
                vx -= drag;
            } else if (vx + drag < 0) {
                vx += drag;
            } else {
                vx = 0;
            }
        }

        if(this.acceleration.y == 0) {
            if (vy - drag > 0) {
                vy -= drag;
            } else if (vy + drag < 0) {
                vy += drag;
            } else {
                vy = 0;
            }
        }

        this.velocity.set(vx, vy);

        return this;
    }

    stop() {
        this.acceleration.reset();
        this.velocity.reset();

        return this;
    }
}