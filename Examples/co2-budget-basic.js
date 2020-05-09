// CO2-Budget-Basic
// by Olaf Val

var co2B

function preload() {
  i = loadImage('trees.jpg');
}

function setup() {
  createCanvas(600, 600);
  co2B = new Co2Budget(1.5, 1);

  textSize(32);
  fill(255);
  textAlign(CENTER);
  imageMode(CENTER);
}

function draw() {
  image(i, width / 2, height / 2, width, width);

  text('World C02-Budget: ', width / 2, height / 3 * 1);
  text(co2B.budgetTString() + ' tons', width / 2, height / 2 * 1);
  text(co2B.time(), width / 2, height / 3 * 2);
}
