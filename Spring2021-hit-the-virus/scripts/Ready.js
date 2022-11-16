class Ready {
    constructor() {
        this.size = 25;
        this.length = 100;
        this.center = createVector(width / 2, height);

        this.angle = 90;
        this.angleStep = 3;

        this.pos = createVector();
        this.actualPos = createVector();
    }

    move() {
        this.angle += this.angleStep;

        if (this.angle >= 150 || this.angle <= 30) {
            this.angleStep *= -1;
        }
        this.pos.set(this.length * cos(this.angle), -this.length * sin(this.angle));
        this.actualPos = this.center.copy().add(this.pos);
    }


    draw() {
        stroke(255);
        fill(255);
        line(this.center.x, this.center.y, this.actualPos.x, this.actualPos.y);
        ellipse(this.actualPos.x, this.actualPos.y, this.size, this.size);
        ellipse(this.center.x, this.center.y, this.length * 0.8, this.length * 0.8);


    }

    times() {
        fill(0);
        textFont('Orbitron');
        textAlign(CENTER, CENTER);
        textSize(28);
        text(times, 290, 583, 30);


    }
}
