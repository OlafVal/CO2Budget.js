

function setup() {
    createCanvas(400, 200);
}

function draw() {
    background(175);

    text("World co2 Budget left: ", 20, 20*1);

    text("Budget (1.5 °C Scenario): " + co2Budget(1.5, 1).budget, 20, 20*3);
    text("Countdown (1.5 °C Scenario): " 
        + co2Budget(1.5, 1).years + "y "
        + co2Budget(1.5, 1).months + "m "
        + co2Budget(1.5, 1).days + "d "
        + co2Budget(1.5, 1).hours + "h "
        + co2Budget(1.5, 1).minutes + "m "
        + co2Budget(1.5, 1).seconds + "s ", 
        20, 20*4);
    
    text("Budget (2 °C Scenario): " + co2Budget(2, 1).budget, 20, 20*6);
    text("Countdown (2 °C Scenario): " 
        + co2Budget(2, 1).years + "y "
        + co2Budget(2, 1).months + "m "
        + co2Budget(2, 1).days + "d "
        + co2Budget(2, 1).hours + "h "
        + co2Budget(2, 1).minutes + "m "
        + co2Budget(2, 1).seconds + "s ", 
        20, 20*7);

    text("According to the MCC-Berlin", 20, 20*9);
}

function mousePressed() {
    window.location.href = "https://www.mcc-berlin.net/fileadmin/data/clock/carbon_clock.htm";
}
