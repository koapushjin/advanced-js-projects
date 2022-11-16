class Virus {
    constructor() {
        this.pos = createVector(random() * width, random() * height);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = 50;
        this.color = 240;
        this.length = 75;

    }

    distractFrom(pos, length) {
        let direction = this.pos.copy().sub(pos);
        let distance = direction.mag();
        if (distance < length * 2) {
            this.acc.add(direction.mult(0.1 / abs(distance - length)));
        }

    }

    move() {
        this.acc.add(p5.Vector.random2D().mult(0.2));
        this.acc.limit(1);

        this.vel.add(this.acc);
        this.vel.limit(5);

        this.pos.add(this.vel);
    }

    checkBorder() {
        if (this.pos.x > width - this.size || this.pos.x < this.size) {
            this.vel.x *= -1;
            this.acc.x *= -1;
            this.pos.x = this.pos.x < width / 2 ? this.size : width - this.size;
        }
        if (this.pos.y > height - this.size || this.pos.y < this.size) {
            this.vel.y *= -1;
            this.acc.y *= -1;
            this.pos.y = this.pos.y < height / 2 ? this.size : height - this.size;
        }
    }

    checkCollision(pos, size) {
        if (p5.Vector.dist(this.pos, pos) < this.size + size) return true;
        else return false;
    }

    draw() {
        noStroke();
        fill(this.color, 0, this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

        fill(225)
        rect(this.pos.x - 38, this.pos.y - 48, 75, 7, 10)
        fill("red")
        rect(this.pos.x - 38, this.pos.y - 48, this.length, 7, 10)
        if (this.length < 75) {
            this.length = this.length + 0.1;
            rect(this.pos.x - 38, this.pos.y - 48, this.length, 7, 10)
        }


        for (let i = 0; i < 10; i += 1) {
            fill("yellow")
            let offset = p5.Vector.random2D().mult(random(5, 40));
            let tempPos = this.pos.copy().add(offset);
            ellipse(tempPos.x, tempPos.y, random(5, 10), random(5, 10));
        }
    }



    blood() {
        this.length -= 30;
    }

}
