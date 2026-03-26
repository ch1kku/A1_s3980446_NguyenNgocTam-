//This sketch is based on concepts learned from Renick Bell’s lesson. It has been further developed through the addition of animation and custom arrays to better realize my intended visual outcomes. RMIT Renick (2026) 'p5js week 04: arrays and transformations' [coding], RMIT University, Saigon South. https://renickbell.net/doku.php?id=p5js-week-04

// Array of flowers.
let flowers = [];
let myColorsPetals = [
  "#FF8CEB",
  "#FF8CA3",
  "#FFE68C",
  "#4CA852",
  "#52B8FF",
  "#B98FFF",
  "#6CD640",
  "#FFB83D",
  "#F78AFF",
  "#FF91C8",
  "#FF578F",
];
//I want to achieve the ASCII style then I have to assign variable with bunch of letters in string.
let myCharacters = [
  "*",
  "·",
  "✧",
  "❀",
  "˖",
  "°",
  "$",
  "%",
  "&",
  "@",
  "#",
  "!",
  "<",
  ">",
  "/",
];

let myColors = ["#61FF29", "#6C6C6C"];
let pickedColors = [];

let cellSize = 20;
let cols, rows;

function setup() {
  createCanvas(600, 600);

  frameRate(10);
  textAlign(CENTER, CENTER);
  flowerPower();

  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  for (let i = 0; i < 3; i++) {
    pickedColors.push(pick(myColors));
  }
}

function draw() {
  background("#CFFFCB");

  //text(`${mouseX}, ${mouseY}`, 20, 20); //to help identify the (x,y) position

  drawASCII();
  fill("#88B465");
  rect(60, 60, 480, 480);
  //noStroke();

  for (let flower of flowers) {
    //animate blooming flower from thr size 0 to the target size

    if (flower.currentSize < flower.targetSize) {
      flower.currentSize += flower.growthSpeed;
    }
    drawFlower(flower);
  }
}

//this one generate how many flowers you put. It is now randomly generate 200 flowers.
function flowerPower() {
  for (let i = 0; i < 200; i += 1) {
    let flower = createFlower();
    flowers.push(flower);
  }
}
//create a box of flower
function createFlower() {
  //setting the flower variable so it like flower( x, y, targetSize, currentSize, growthSpeed, lifespan, color)

  let flower = {
    x: random(60, 550),
    y: random(60, 550),
    targetSize: random(10, 40),
    currentSize: 0,
    growthSpeed: random(0.5, 2), // bloom speed
    lifespan: random(255, 300),
    color: random(myColorsPetals),
  };

  //there is a problem with this codeincompatibility with mobile devices, where the sketch fails to load on. Although the issue has not been resolved, it functions correctly on desktop, so it has been kept in its current form.

  if (mouseX > 150 && mouseX < 250 && mouseY > 175 && mouseY < 225) {
  } else return flower;
}

//grid of ASCII characters.
function randomInteger(min, max) {
  return Math.floor(min + (max - min) * Math.random());
}

function pick(inputArray) {
  return inputArray[randomInteger(0, inputArray.length)];
}

function drawASCII() {
  //Divide the canvas into rows and columns (rows, cols)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Calculate center position of each cell
      let px = x * cellSize + cellSize / 2;
      let py = y * cellSize + cellSize / 2;

      push();
      translate(px, py);
      drawChar(cellSize * 0.8);
      pop();
    }
  }
}

function drawChar(size) {
  noStroke();
  fill(pick(pickedColors));

  textSize(size);

  let c = pick(myCharacters);

  text(c, 0, 0);
}
//draw flowers

function drawFlower(flower) {
  push();
  let t = frameCount * 0.025 + flower.x * 0.01 + flower.y * 0.01;
  let sway = sin(t) * 2;
  let s = flower.currentSize;

  blendMode(BLEND);

  translate(flower.x, flower.y);
  rotate(sway);

  let breathe = 1 + sin(t * 1.5) * 0.03;
  scale(breathe);
  //noStroke();
  stroke("#142669");
  strokeWeight(0.55);
  fill(flower.color);

  for (let i = 0; i < 5; i++) {
    rotate(TWO_PI / 5);
    ellipse(0, s / 2, s / 3, s);
  }
  //create the core (the center?) of the flowers
  fill("#FFE903");
  circle(0, 0, s / 3);

  fill("#303442");
  circle(0, 0, s / 5);

  fill("#F0FEFF");
  circle(0, 0, s / 10);

  pop();
}
