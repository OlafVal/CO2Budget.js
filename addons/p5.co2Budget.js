// p5.co2Budget Library
// by Olaf Val
// based on Carbon-Clock 
// by Mercator Research Institute on Global Commons and Climate Change (MCC) gGmbH
// https://www.mcc-berlin.net/fileadmin/data/clock/carbon_clock.htm
// Version 0.5 | 02.06.2019
// CC BY-SA 4.0

var secondsPerYear = 3600. * 24 * 365.25;
var startDate = new Date(2021, 0, 1, 0, 0, 0);
var initialAnnualEmissions = 42.2 * 1e+9; // 1.5 (117.0 * 1e+9 = 2,0°)
var annualGrowthRate = 1.000; // 1.022;
var totalBudget = 422 * 1e+9; // 1,5° (1170 * 1e+9 = 2,0°)
var yearsRemaining;
var dd = 0;

p5.prototype.co2Budget = function(x, y) {
    annualGrowthRate = y;

    // switch scenarios (1.5°C or 2°C)
    if(x == 1.5) {
        totalBudget = 361 * 1e+9;
    }
    if(x == 2) {
        totalBudget = 1111 * 1e+9;
    }

    // get remaining carbon budget
    var worldBudget = {budget:0, seconds:0, minutes:0, hours:0, days:0, months:0, years:0};
    worldBudget.budget = getBudgetLeft().toFixed(0);

    // get budget time (countdown)
    myTimer();
    worldBudget.seconds = dd[1];
    worldBudget.minutes = dd[2];
    worldBudget.hours = dd[3];
    worldBudget.days = dd[4];
    worldBudget.months = dd[5];
    worldBudget.years = dd[6];
    return worldBudget;
}



// ----------------------------------------------------------------------------------------------------------------- - - - - -

function myTimer() {
    dd = countdownTime(getDoomTime()).split(" ").reverse();
}

function countdownTime(target) {

    var now = new Date(), yd, md, dd, hd, nd, sd, ms, out = [];

    if ((target.getTime() - now.getTime()) > 0) {
        yd = target.getFullYear() - now.getFullYear();
        md = target.getMonth() - now.getMonth();
        dd = target.getDate() - now.getDate();
        hd = target.getHours() - now.getHours();
        nd = target.getMinutes() - now.getMinutes();
        sd = target.getSeconds() - now.getSeconds();
    }
    else {
        yd = -target.getFullYear() + now.getFullYear();
        md = -target.getMonth() + now.getMonth();
        dd = -target.getDate() + now.getDate();
        hd = -target.getHours() + now.getHours();
        nd = -target.getMinutes() + now.getMinutes();
        sd = -target.getSeconds() + now.getSeconds();

        if (sd<0) {
          sd+=60
        }
    }
    // negatives need to be dealt with regardless whether the deadline has passed!
    while (true) {
        if (md < 0) {
            yd--;
            md += 12;
        }
        if (dd < 0) {
            md--;
            dd += getDaysInMonth(now.getMonth() - 1, now.getFullYear());
        }
        if (hd < 0) {
            dd--;
            hd += 24;
        }
        if (nd < 0) {
            hd--;
            nd += 60;
        }
        if (sd < 0) {
            nd--;
            sd += 60;
        }
        if (md >= 0 && yd >= 0 && dd >= 0 && hd >= 0 && nd >= 0 && sd >= 0)
            break;
    }

    if (true) //(yd > 0)
        out.push(yd + " " + (yd == 1 ? "" : ""));
    if (md < 10 && md >= 0)
        out.push("0" + md + " " + (md == 1 ? "" : ""));
    else if (md >= 10)
        out.push(md + " ");
    if (dd < 10 && dd >= 0)
        out.push("0" + dd + " " + (dd == 1 ? "" : ""));
    else if (dd >= 10)
        out.push(dd + " ");
    if (Math.abs(hd) < 10 && Math.abs(hd) >= 0)
        out.push("0" + hd + " " + (hd == 1 ? "" : ""));
    else if (hd >= 10)
        out.push(hd + " ");
    else console.log(hd)
    if (nd < 10 && nd >= 0)
        out.push("0" + nd + " " + (nd == 1 ? "" : ""));
    else if (nd >= 10)
        out.push(nd + " ");
    if (sd < 10 && sd >= 0)
        out.push("0" + sd + " " + (sd == 1 ? "" : ""));
    else if (sd >= 10)
        out.push(sd + " ");

    if ((target.getTime() - now.getTime()) > 0) {
        ms = 99 - now.getMilliseconds().toString().slice(0, 2);
    }
    else {
        ms = now.getMilliseconds().toString().slice(0, 2);
    }
    if (ms < 10 && ms >= 0)
        out.push("0" + ms + "" + (ms == 1 ? "" : ""));
    else if (ms >= 10)
        out.push(ms + "");

    return out.join("");
}

function getDaysInMonth(month, year) {
    if (typeof year == "undefined")
        year = 2015;
    // any non-leap-year works as default
    var currmon = new Date(year, month)
    var nextmon = new Date(year, month + 1);
    return Math.floor((nextmon.getTime() - currmon.getTime()) / (24 * 3600 * 1000));
}

function sPassed() {
    var now = new Date();
    var diff = [];
    diff = Math.floor((now.getTime() - startDate.getTime()) / 1000.);
    return diff;
}

function getCurrentEmissionsPerS() {
    res = initialAnnualEmissions / secondsPerYear * Math.pow(annualGrowthRate, sPassed(startDate) / secondsPerYear);
    return res;
}

function getBudgetLeft() {
    if (annualGrowthRate == 1) {
        budgetUsed = sPassed(startDate) / secondsPerYear * initialAnnualEmissions;
    }
    else {
        budgetUsed = (initialAnnualEmissions / Math.log(annualGrowthRate)) * (Math.pow(annualGrowthRate, sPassed(startDate) / secondsPerYear) - 1);
    }
    res = (totalBudget - budgetUsed);
    return res;
}

function getDoomTime() {
    if (annualGrowthRate == 1) {
        yearsRemaining = totalBudget / initialAnnualEmissions;
    }
    else {
        yearsRemaining = Math.log((totalBudget) / (initialAnnualEmissions) * Math.log(annualGrowthRate) + 1) / Math.log(annualGrowthRate);
    }
    d = new Date(startDate.getTime() + yearsRemaining * secondsPerYear * 1000);
    return d;
}


