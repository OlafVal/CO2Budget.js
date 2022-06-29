// Co2Budget Class for p5js
// by Olaf Val
// based on Carbon-Clock
// by Mercator Research Institute on Global Commons and Climate Change (MCC) gGmbH
// https://www.mcc-berlin.net/fileadmin/data/clock/carbon_clock.htm
// Version 0.6 | 29.06.2022
// CC BY-SA 4.0

function Co2Budget(x, y) {

  this.secondsPerYear = 3600 * 24 * 365.25;
  this.startDate = new Date(2021, 0, 1, 0, 0, 0);
  this.initialAnnualEmissions = 42.2 * 1e+9; // 1.5 (117.0 * 1e+9 = 2,0°)
  this.annualGrowthRate = 1.000; // 1.022;
  this.totalBudget = 422 * 1e+9; // 1,5° (1170 * 1e+9 = 2,0°)
  this.yearsRemaining;
  this.dd = [];

  this.annualGrowthRate = y;

  // switch scenarios (1.5°C or 2°C)
  if (x == 1.5) {
    this.totalBudget = 361 * 1e+9;
  }
  if (x == 2) {
    this.totalBudget = 1111 * 1e+9;
  }

  this.budgetT = function() {
    return int(this.getBudgetLeft().toFixed(0));
  }
  this.budgetTString = function() {
    return numberWithCommas(this.getBudgetLeft().toFixed(0));
  }
  this.budgetKt = function() {
    return int((this.getBudgetLeft().toFixed(0) / 1000).toFixed(0));
  }
  this.budgetKtString = function() {
    return numberWithCommas((this.getBudgetLeft().toFixed(0) / 1000).toFixed(0));
  }
  this.budgetMt = function() {
    // return round(this.getBudgetLeft().toFixed(0) / 1000000);
    return int((this.getBudgetLeft().toFixed(0) / 1000000).toFixed(2));
  }
  this.budgetMtString = function() {
    // return round(this.getBudgetLeft().toFixed(0) / 1000000);
    return numberWithCommas((this.getBudgetLeft().toFixed(0) / 1000000).toFixed(2));
  }
  this.budgetGt = function() {
    return int((this.getBudgetLeft().toFixed(0) / 1000000000).toFixed(2));
  }

  this.seconds = function() {
    this.myTimer();
    return int(this.dd[1]);
  }
  this.minutes = function() {
    this.myTimer();
    return int(this.dd[2]);
  }
  this.hours = function() {
    this.myTimer();
    return int(this.dd[3]);
  }
  this.days = function() {
    this.myTimer();
    return int(this.dd[4]);
  }
  this.months = function() {
    this.myTimer();
    return int(this.dd[5]);
  }
  this.years = function() {
    this.myTimer();
    return int(this.dd[6]);
  }
    this.time = function() {
    this.myTimer();
    return this.dd[6] + 'y/' + this.dd[5] + 'm/' + this.dd[4] + 'd ' + this.dd[3] + 'h:' + this.dd[2] + 'm:' + this.dd[1] + 's';
  }

  // -----------------------------------------------------

  this.myTimer = function() {
    this.dd = this.countdownTime(this.getDoomTime()).split(" ").reverse();
  }

  this.countdownTime = function(target) {

    var now = new Date();
    var yd, md, dd, hd, nd, sd, ms;
    var out = [];

    if ((target.getTime() - now.getTime()) > 0) {
      yd = target.getFullYear() - now.getFullYear();
      md = target.getMonth() - now.getMonth();
      dd = target.getDate() - now.getDate();
      hd = target.getHours() - now.getHours();
      nd = target.getMinutes() - now.getMinutes();
      sd = target.getSeconds() - now.getSeconds();
    } else {
      yd = -target.getFullYear() + now.getFullYear();
      md = -target.getMonth() + now.getMonth();
      dd = -target.getDate() + now.getDate();
      hd = -target.getHours() + now.getHours();
      nd = -target.getMinutes() + now.getMinutes();
      sd = -target.getSeconds() + now.getSeconds();

      if (sd < 0) {
        sd += 60
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
        dd += this.getDaysInMonth(now.getMonth() - 1, now.getFullYear());
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
    else if (hd >= 10) out.push(hd + " ");
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
    } else {
      ms = now.getMilliseconds().toString().slice(0, 2);
    }
    if (ms < 10 && ms >= 0)
      out.push("0" + ms + "" + (ms == 1 ? "" : ""));
    else if (ms >= 10)
      out.push(ms + "");

    return out.join("");
  }

  this.getDaysInMonth = function(month, year) {
    if (typeof year == "undefined")
      year = 2015;
    // any non-leap-year works as default
    var currmon = new Date(year, month)
    var nextmon = new Date(year, month + 1);
    return Math.floor((nextmon.getTime() - currmon.getTime()) / (24 * 3600 * 1000));
  }

  this.sPassed = function() {
    var now = new Date();
    var diff = [];
    diff = Math.floor((now.getTime() - this.startDate.getTime()) / 1000);
    return diff;
  }

  this.getCurrentEmissionsPerS = function() {
    res = this.initialAnnualEmissions / this.secondsPerYear * Math.pow(this.annualGrowthRate, this.sPassed(this.startDate) / this.secondsPerYear);
    return res;
  }

  this.getBudgetLeft = function() {
    if (this.annualGrowthRate == 1) {
      this.budgetUsed = this.sPassed(this.startDate) / this.secondsPerYear * this.initialAnnualEmissions;
    } else {
      this.budgetUsed = (this.initialAnnualEmissions / Math.log(this.annualGrowthRate)) * (Math.pow(this.annualGrowthRate, sPassed(this.startDate) / this.secondsPerYear) - 1);
    }
    res = (this.totalBudget - this.budgetUsed);
    return res;
  }

  this.getDoomTime = function() {
    if (this.annualGrowthRate == 1) {
      this.yearsRemaining = this.totalBudget / this.initialAnnualEmissions;
    } else {
      this.yearsRemaining = Math.log((this.totalBudget) / (this.initialAnnualEmissions) * Math.log(this.annualGrowthRate) + 1) / Math.log(this.annualGrowthRate);
    }
    this.d = new Date(this.startDate.getTime() + this.yearsRemaining * this.secondsPerYear * 1000);
    return this.d;
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
