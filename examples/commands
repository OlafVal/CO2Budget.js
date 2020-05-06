// CO2-Budget-Commands
// by Olaf Val

var co2B
var l;

function preload() {
  i = loadImage('trees.jpg');
}

function setup() {
  createCanvas(600, 600);
  co2B = new Co2Budget(1.5, 1);
}

function draw() {

  imageMode(CENTER);
  image(i, width / 2, height / 2, width, width);

  // Co2-Budget Values - - - - - - - - - - -  
  textSize(18);
  fill(255);
  l = 0;
  
  text('C02-Budget:', 100, 80 + 20 * l);
  l++;
  text(co2B.budgetT() + ' tons', 100, 80 + 20 * l);
  l++;
  text(co2B.budgetTString() + ' tons', 100, 80 + 20 * l);
  l++;
  l++;
  text(co2B.budgetKt() + ' kilotons', 100, 80 + 20 * l);
  l++;
  text(co2B.budgetKtString() + ' kilotons', 100, 80 + 20 * l);
  l++;
  l++;
  text(co2B.budgetMt() + ' megatons', 100, 80 + 20 * l);
  l++;
  text(co2B.budgetMtString() + ' megatons', 100, 80 + 20 * l);
  l++;
  l++;
  text(co2B.budgetGt() + ' gigatons', 100, 80 + 20 * l);
  l++;
  l++;
  l++;
  text("Countdown:", 100, 80 + 20 * l);
  l++;
  text(co2B.seconds() + ' seconds', 100, 80 + 20 * l);
  l++;
  text(co2B.minutes() + ' minutes', 100, 80 + 20 * l);
  l++;
  text(co2B.hours() + ' hours', 100, 80 + 20 * l);
  l++;
  text(co2B.days() + ' days', 100, 80 + 20 * l);
  l++;
  text(co2B.months() + ' months', 100, 80 + 20 * l);
  l++;
  text(co2B.years() + ' years', 100, 80 + 20 * l);
  l++;
  l++;
  text(co2B.time(), 100, 80 + 20 * l);
  
  // Co2-Budget Commands - - - - - - - - - - -
  textSize(14);
  fill(255);
  l = 1;
  
  text('co2B.budgetT()', 350, 80 + 20 * l);
  l++;
  text('co2B.budgetTString()', 350, 80 + 20 * l);
  l++;
  l++;
  text('co2B.budgetKt()', 350, 80 + 20 * l);
  l++;
  text('co2B.budgetKtString()', 350, 80 + 20 * l);
  l++;
  l++;
  text('co2B.budgetMt()', 350, 80 + 20 * l);
  l++;
  text('co2B.budgetMtString()', 350, 80 + 20 * l);
  l++;
  l++;
  text('co2B.budgetGt()', 350, 80 + 20 * l);
  l++;
  l++;
  l++;
  l++;
  text('co2B.seconds()', 350, 80 + 20 * l);
  l++;
  text('co2B.minutes()', 350, 80 + 20 * l);
  l++;
  text('co2B.hours()', 350, 80 + 20 * l);
  l++;
  text('co2B.days()', 350, 80 + 20 * l);
  l++;
  text('co2B.months()', 350, 80 + 20 * l);
  l++;
  text('co2B.years()', 350, 80 + 20 * l);
  l++;
  l++;
  text('co2B.time()', 350, 80 + 20 * l);
 
}
