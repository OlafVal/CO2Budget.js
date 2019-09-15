var zoomSpeed = 4000; // speed
var i = [];
var n = 0;
var t, b, f;
var stri = "";
var zoom = 0;
var fSize = 20;
var scenario = 1.5;
var annualGrowthRate = 1.000;

function preload() {
    i[0] = loadImage("images/c1.png");
    i[1] = loadImage("images/pl1.jpg");
    i[2] = loadImage("images/pl2.jpg");
    i[3] = loadImage("images/p1.png");
    i[4] = loadImage("images/m1.png");
    i[5] = loadImage("images/w1.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    t = millis();
}

function draw() {
    background(0);

    f = int(millis() - t);
    b = map(f, 0, zoomSpeed, 255, 100);

    // image
    imageMode(CENTER);
    if (height > width) {
        fSize = width / 20;
        zoom = int(map(f, 0, zoomSpeed, 0, width / 4));
        image(i[n], width / 2, height / 2, width / 2 + zoom, width / 2 + zoom);
    } else {
        fSize = height / 20;
        zoom = int(map(f, 0, zoomSpeed, 0, height / 4));
        image(i[n], width / 2, height / 2, height / 2 + zoom, height / 2 + zoom);
    }


    // blend from black
    fill(0, b);
    rect(0, 0, width, height);

    if (millis() > t + zoomSpeed) {
        t = millis();
        n++;
        if (n > i.length - 1) {
            n = 0;
            if (scenario == 1.5) {
                scenario = 2;
            } else {
                scenario = 1.5;
            }
        }
    }

    fill(255);
    textAlign(CENTER);
    textSize(fSize);

    if (scenario == 1.5) {
        text("Worlds co2 Budget", width / 2, height / 12 * 4);
        text("1.5°C Scenario", width / 2, height / 12 * 5);
        text(numberWithCommas(co2Budget(1.5, annualGrowthRate).budget) + " tons", width / 2, height / 12 * 6);
        text("Time left", width / 2, height / 12 * 8);
        text(
            co2Budget(1.5, annualGrowthRate).years + "y " +
            co2Budget(1.5, annualGrowthRate).months + "m " +
            co2Budget(1.5, annualGrowthRate).days + "d " +
            co2Budget(1.5, annualGrowthRate).hours + ":" +
            co2Budget(1.5, annualGrowthRate).minutes + ":" +
            co2Budget(1.5, annualGrowthRate).seconds + " ",
            width / 2, height / 12 * 9);
    }

    if (scenario == 2) {
        text("Worlds co2 Budget", width / 2, height / 12 * 4);
        text("2°C Scenario", width / 2, height / 12 * 5);
        text(numberWithCommas(co2Budget(2, annualGrowthRate).budget) + " tons", width / 2, height / 12 * 6);
        text("Time left", width / 2, height / 12 * 8);
        text(
            co2Budget(2, annualGrowthRate).years + "y " +
            co2Budget(2, annualGrowthRate).months + "m " +
            co2Budget(2, annualGrowthRate).days + "d " +
            co2Budget(2, annualGrowthRate).hours + ":" +
            co2Budget(2, annualGrowthRate).minutes + ":" +
            co2Budget(2, annualGrowthRate).seconds + " ",
            width / 2, height / 12 * 9);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}