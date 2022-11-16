class Ball {
    constructor() {
        this.size = 25;
        this.pos = createVector();
        this.vel = createVector();
    }


    move() {
        this.pos.add(this.vel);
    }

    draw() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

    }

    checkBorder() {
        if (this.pos.x > width - this.size || this.pos.x < this.size) {
            this.vel.x *= -1;
            this.pos.x = this.pos.x < width / 2 ? this.size : width - this.size;
            // console.log("hit x");
            wallSound.play();
        }
        if (this.pos.y < this.size) {
            this.vel.y *= -1;
            this.pos.y = this.pos.y < height / 2 ? this.size : height - this.size;
            // console.log("hit y");
            wallSound.play();
        }
    }

    checkFallout() {
        if (this.pos.y > height + this.size) return true;
        else false;

    }

    setPosition(pos) {
        this.pos.set(pos);
    }

    setVelocity(vel) {
        this.vel.set(vel);
        // console.log(this.vel)
    }

}