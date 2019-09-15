// co2DataVisualisation beta
// example by olaf val

var fSize = 20;
var scenario = 1.5;
var agr = 1.000;

var speed1 = 100; // speed
var t1; // timer
var tilesW = 40;
var tilesH = 20;
var tilesNr, tilesRealNr, tilesCount, tilesLost, bigTile, bigTileX;
var budgetCurrend = 0;
var budgetOnCreen = 0;
var budgetRemaining = 0;
var budgetWatched = 0;
var budgetStart15 = 0;
var budgetStart2 = 0;
var newScreen = 0;
var rightFrame;
var fX, fY;
var ktColor;

var menueMode = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    t1 = millis();
    ktColor = color(61, 39, 9);

    button = createButton('switchTheMenue');
    button.position(width - fSize * 3, fSize / 2);
    button.style('opacity', 0);
    button.mousePressed(switchMenue);

    button2 = createButton('switchTheMenue');
    button2.position(width - fSize * 3, fSize / 2);
    button2.style('opacity', 0);
    button2.mousePressed(switchScenario);

    budgetStart15 = co2Budget(1.5, agr).budget;
    budgetStart2 = co2Budget(2, agr).budget;
}

function switchScenario(){
    if(scenario == 1.5){
        scenario = 2;
    }else{
        scenario = 1.5;
    }
}

function draw() {
    if (millis() > t1 + speed1) {
        background(140, 129, 115);

        if (height > width) {
            fSize = width / 20;
        } else {
            fSize = height / 20;
        }

        t1 = millis();
        // visualisation
        tilesNr = width / tilesW * (height / tilesH);
        tilesCount = 0;
        rightFrame = 0;
        for (fY = 0; fY < ((height - (tilesH + fSize * 4)) / tilesH); fY++) {
            for (fH = 0; fH < ((width - (tilesW + fSize)) / tilesW); fH++) {
                if (tilesLost < tilesCount) {
                    // unspent co2 100 tons
                    strokeCap(PROJECT);
                    strokeWeight(1);
                    noFill();
                    stroke(61, 39, 9);
                    ktColor = color(61, 39, 9);
                } else {
                    // lost co2 1 kt tons
                    strokeCap(PROJECT);
                    strokeWeight(1);
                    stroke(0);
                    fill(0);
                    ktColor = color(200);
                }
                if (rightFrame < fH * tilesW + (fSize / 2) + tilesW - 3) {
                    rightFrame = fH * tilesW + (fSize / 2) + tilesW - 3;
                }
                rect(fH * tilesW + (fSize / 2), fY * tilesH + (fSize * 2), tilesW - 3, tilesH - 3);
                tilesCount++;
                noStroke();
                fill(ktColor);
                textSize(12);
                text("1kt", fH * tilesW + 8 + (fSize / 2), fY * tilesH + 14 + (fSize * 2));
                // text(tilesCount, fH * tilesW + 5 + (fSize/2), fY * tilesH + 12 + (fSize/2) );
            }
        }

        budgetCurrend = co2Budget(scenario, agr).budget;

        // lost co2 past
        noStroke();
        fill(0);
        rect(fSize / 2, 0, rightFrame - fSize / 2, fSize * 2 - 3);
        fill(214, 199, 190);
        // fill(61, 39, 9);
        textAlign(CENTER);
        textSize(fSize/3*2);
        if(scenario == 1.5){
            budgetWatched = (budgetStart15 - budgetCurrend) + 1600;
        }
        if(scenario == 2){
            budgetWatched = (budgetStart2 - budgetCurrend) + 1600;
        }
        
        text(numberWithCommas(int(budgetWatched / 1000) ) + " kt watched", width / 2, fSize * 1.1);

        // remaining budget
        stroke(61, 39, 9);
        noFill();
        rect(fSize / 2, height - fSize * 2 - 3, rightFrame - fSize / 2, height);
        noStroke();
        fill(61, 39, 9);
        textAlign(CENTER);
        textSize(fSize/3*2);
        text(numberWithCommas(budgetRemaining / 1000) + " kt remaining", width / 2, height - fSize * 0.8);

        tilesRealNr = tilesCount;
        if (newScreen == 0) {
            newScreen = 1;
            bigTileX = int(co2Budget(scenario, agr).budget / 1000);
            budgetRemaining = budgetCurrend - tilesRealNr * 1000;
            bigTile = bigTileX - tilesRealNr;
        }
        tilesLost = tilesRealNr - (int(budgetCurrend / 1000) - bigTile);
        if (tilesLost > tilesRealNr) {
            newScreen = 0;
        }
        /*
        // show variables text
        fill(0);
        noStroke();
        textSize(14);
        text("tilesRealNr: " + tilesRealNr + " bigTileX: " + bigTileX + " bigTile: " + bigTile + " tilesLost: " + tilesLost, 20, height - 5);
        */
        if (menueMode == 0) {
            infoBox();
        } else {
            aboutBox();
        }

        hamburgerMenue();
    }
}

function hamburgerMenue() {
    button.position(width - fSize * 4, 0);
    button.size(fSize * 3, fSize * 2);
    noFill();
    stroke(255);
    strokeCap(ROUND);
    strokeWeight(fSize / 10);
    if (menueMode == 0) {
        // hamburger
        line(width - fSize * 3, fSize / 2, width - fSize * 2, fSize / 2);
        line(width - fSize * 3, fSize / 1, width - fSize * 2, fSize / 1);
        line(width - fSize * 3, fSize / 1.33, width - fSize * 2, fSize / 1.33);
    } else {
        // X
        line(width - fSize * 3, fSize / 2, width - fSize * 2, fSize / 1);
        line(width - fSize * 3, fSize / 1, width - fSize * 2, fSize / 2);
    }
}

function aboutBox() {
    // text box
    fill(0, 175)
    noStroke();
    rect(fSize * 2, height / 12 * 2, width - fSize * 4, height / 12 * 8);

    // text
    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(fSize);
    text("1,5°C Scenario", fSize * 4, height / 12 * 3);
    text("2°C Scenario", fSize * 4, height / 12 * 4);
    textSize(fSize / 3 * 2);
    text("co2DataVisualisation", fSize * 3, height / 12 * 5);
    textSize(fSize / 2);
    
    text("based on Carbon-Clock", fSize * 3, height / 12 * 5.5);
    text("by MCC-Berlin", fSize * 3, height / 12 * 6);
    text("build with p5*js", fSize * 3, height / 12 * 7);
    text("project by Olaf Val", fSize * 3, height / 12 * 8);
    text("cc-by-sa-4.0", fSize * 3, height / 12 * 8.5);


    // radio buttons
    noFill();
    stroke(255);
    ellipseMode(CENTER);
    ellipse(fSize * 3.33, height / 12 * 3 - fSize / 3, fSize / 3 * 2, fSize / 3 * 2);
    ellipse(fSize * 3.33, height / 12 * 4 - fSize / 3, fSize / 3 * 2, fSize / 3 * 2);

    fill(255);
    noStroke();
    if(scenario == 1.5){
        ellipse(fSize * 3.33, height / 12 * 3 - fSize / 3, fSize / 3, fSize / 3);    
    }else{
        ellipse(fSize * 3.33, height / 12 * 4 - fSize / 3, fSize / 3, fSize / 3);
    }
    button2.show();
    button2.position(fSize * 2.9, height / 12 * 3 - fSize);
    button2.size(fSize * 10, height / 12 * 2);
}

function infoBox() {
    button2.hide();

    // text box
    fill(0, 175)
    noStroke();
    rect(fSize, height / 12 * 6 - (fSize * 1.5), (height - fSize) - (height / 12 * 5 - fSize), (height - fSize) - (height / 12 * 6 - fSize));

    // text
    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(fSize);

    if (scenario == 1.5) {
        text("Worlds co2 Budget", fSize * 2, height / 12 * 6);
        text("1.5°C Scenario", fSize * 2, height / 12 * 7);
    }
    if (scenario == 2) {
        text("Worlds co2 Budget", fSize * 2, height / 12 * 6);
        text("2°C Scenario", fSize * 2, height / 12 * 7);
    }
    text(numberWithCommas(co2Budget(scenario, agr).budget) + " tons", fSize * 2, height / 12 * 8);
    text("Time left", fSize * 2, height / 12 * 9.5);
    text(
        co2Budget(scenario, agr).years + "y " +
        co2Budget(scenario, agr).months + "m " +
        co2Budget(scenario, agr).days + "d " +
        co2Budget(scenario, agr).hours + ":" +
        co2Budget(scenario, agr).minutes + ":" +
        co2Budget(scenario, agr).seconds + " ",
        fSize * 2, height / 12 * 10.5);
}

function switchMenue() {
    if (menueMode == 0) {
        menueMode = 1;
    } else {
        menueMode = 0;
        newScreen = 0;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function windowResized() {
    newScreen = 0;
    resizeCanvas(windowWidth, windowHeight);
}