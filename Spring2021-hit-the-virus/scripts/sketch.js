// Code in this function is run once, when the sketch is started.
let cnv;
let times = 9;

const WELCOME = 0;
const READY = 1;
const SHOOTING = 2;
const END = 3;

let virus, ready, ball;
let gameState = WELCOME;

let hasButton = false;

function preload() {
  // console.log("preloading!!");
  bgm = loadSound('sound/bgm.mp3');
  win = loadSound('sound/win.mp3');
  lose = loadSound('sound/lose.mp3');
  wallSound = loadSound('sound/wallbounce.mp3');
  hitSound = loadSound('sound/hit.mp3');
  fallSound = loadSound('sound/fall.mp3');

}



function setup() {
  getAudioContext().resume();

  angleMode(DEGREES);
  cnv = createCanvas(600, 600);
  cnv.parent("canvas-container");

  // ctx = getAudioContext()
  // ctx.resume().then(() => {
  //   // console.log('Audio Context is now ON');
  //   bgm.loop();
  //   bgm.play();
  // })
  // getAudioContext().resume();
  bgm.loop();
  bgm.play();
  // win.loop() = false;
  // lose.loop() = false;

  virus = new Virus();
  ready = new Ready();
  ball = new Ball();
}

// function touchStarted() {
//   getAudioContext().resume();
// }

function draw() {
  background(0);

  if (times <= 0 || virus.length <= 0) {
    gameState = END;
    bgm.stop();
  }



  if (gameState === WELCOME) {
    push();
    noStroke();
    fill(150);
    rect(width / 2 - 98, height - 138, 205, 45, 3);
    fill(230);
    rect(width / 2 - 100, height - 140, 200, 40, 3);

    fill(0);
    textAlign(CENTER, CENTER);
    textFont('Orbitron');
    textSize(25);
    text('SPACE', width / 2, height - 120 + random(-2, 2));

    textFont('Orbitron');
    textSize(50);
    fill('yellow');
    text("HIT THE VIRUS", width / 2 + 4, height / 2 - 56 + random(-5, 5));
    fill(255, 0, 255);
    text("HIT THE VIRUS", width / 2, height / 2 - 60 + random(-5, 5));
    pop();

  } else if (gameState === END) {

    if (virus.length <= 0) {

      // console.log('winnnn')
      push();
      textFont('Orbitron');
      textSize(50);
      textAlign(CENTER, CENTER);
      fill('yellow');
      text("YOU WIN!", width / 2 + 4, height / 2 - 56 + random(-5, 5));
      fill(255, 0, 255);
      text("YOU WIN!", width / 2, height / 2 - 60 + random(-5, 5));
      pop();

      winsound();


    } else if (times <= 0) {

      // console.log('loseeeeee')
      textFont('Orbitron');
      textSize(50);
      textAlign(CENTER, CENTER);
      fill(230);
      text("YOU LOSE:(", width / 2 + 4, height / 2 - 56);
      fill(130);
      text("YOU LOSE:(", width / 2, height / 2 - 60);

      push();
      lose.play();
      noLoop();
      pop();

    }
    if (!hasButton) {
      button = createButton('RESTART');
      button.parent('button-container');
      button.style('font-size', '30px');
      // button.style('font', Orbitron)
      button.mousePressed(reset);
      // button.keyPressed(reset);
      hasButton = !hasButton;
    }

  } else if (gameState === READY) {
    ready.move();
    ready.draw();

    virus.distractFrom(ready.center, ready.length);
    virus.move();
    virus.checkBorder();
    virus.draw();

    ready.times();

  } else if (gameState === SHOOTING) {

    if (virus.checkCollision(ball.pos, ball.size)) {
      // console.log("hit virus");
      // hittimes++;
      times--;
      virus.blood();
      gameState = READY;
      // console.log(hittimes, times);
      hitSound.play()

    }

    virus.move();
    virus.checkBorder();
    virus.draw();

    ball.move();
    ball.checkBorder();
    ball.draw();

    ready.times();

    if (ball.checkFallout()) {
      // console.log("noooo")
      times--;
      gameState = READY;
      // console.log(times);
      fallSound.play();
    }
  }

}


function keyPressed() {
  getAudioContext().resume()
  if (gameState === WELCOME) {
    gameState++;
    // console.log(gameState);
  } else if (gameState === READY) {
    ball.setPosition(ready.actualPos);
    ball.setVelocity(ready.pos.copy().mult(0.1));
    gameState++;
    // console.log(gameState);
  }
}

function reset() {
  location.reload();
}

function winsound() {
  win.play();
  noLoop();
}
