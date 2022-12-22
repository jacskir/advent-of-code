"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function calcCalorieCounts(input) {
  let calorieCount = 0;
  const calorieCounts = [];
  for (const cal of input.split("\r\n")) {
    if (cal !== "") {
      calorieCount += Number(cal);
    } else {
      calorieCounts.push(calorieCount);
      calorieCount = 0;
    }
  }
  return calorieCounts;
}

function part1(input) {
  const topCalorieCount = calcCalorieCounts(input)
    .sort((a, b) => a - b)
    .slice(-1);
  console.log(`part1: ${topCalorieCount}`);
}

function part2(input) {
  const topThreeCaloriesSum = calcCalorieCounts(input)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((total, num) => total + num, 0);
  console.log(`part2: ${topThreeCaloriesSum}`);
}

const input = loadFile(path.join(__dirname, "input.txt"));
part1(input);
part2(input);
