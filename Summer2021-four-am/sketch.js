// By Roni Kaufman

let kMax; // maximal value for the parameter "k" of the blobs
let step = 0.03; // difference in time between two consecutive blobs
let n = 100; // total number of blobs
let radius = 0; // radius of the base circle
let inter = 0.01; // difference of base radii of two consecutive blobs
let maxNoise = 500; // maximal value for the parameter "noisiness" for the blobs

let kkk = 1;

let video;
let poseNet;
let pose;
let skeleton;
let leng;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  angleMode(DEGREES);
  noFill();
  // noLoop();
  kMax = random(1.6, 2.0);

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  leng = poses.length;
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    // if (poses.length >1) {
    //   t = true
    // }
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  let t = frameCount * 0.01;
  let k = kMax;

  for (let i = n; i > 0; i--) {
    let alpha = 1 - i / n; //颜色外深内浅
    stroke(0.8, alpha); //数值在0-1之间有亮暗区别
    let size = radius + i * inter;
    // let k = kMax * sqrt(1-i / n) * 3; 离散程度 但电脑会跑很累
    let noisiness = maxNoise * (1 - i / n);

    push();
    // scale(1-pose.keypoints[1].score);
    // scale(1-pose.keypoints[1].score);
    scale(kkk)
    blob(size, width / 2, height / 2, k, t - i * step, noisiness);
    pop();

  }

  if (pose) {
    console.log(leng);
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    if (pose.keypoints[1].score < 0.5 && kkk < 1.05) { //1.05控制大小上
      kkk = kkk * (1 + pose.keypoints[1].score * 0.3)
    } else if (pose.keypoints[1].score > 0.9 && kkk > 0.25) { //0.25控制大小下限
      kkk = kkk * (pose.keypoints[1].score)
    }

    if (leng > 2) { //does not appear when there're more than 2 people
      kkk = lerp(kkk, 0.15, 0.2);
      console.log('noooooooooooo')
    }

    // console.log("yes",pose.keypoints[1].score)
  } else {
    kkk = 1;
    // console.log("no")
  }


}

// Creates and draws a blob
// size is the radius (before noise) of the base circle
// (xCenter, yCenter) is the position of the center of the blob
// k is the tightness of the blob (0 = perfect circle, higher = more spiky)
// t is the time
// noisiness is the magnitude of the noise (i.e. how far it streches out)

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
  let angleStep = 360 * 0.1;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
    let cosT = cos(theta);
    let sinT = sin(theta);

    r1 = cosT + 1;
    r2 = sinT + 1;

    let r = size + noise(k * r1, k * r2, t) * noisiness;
    let x = r * cosT;
    let y = r * sinT;
    curveVertex(x, y);
  }
  endShape();
}
