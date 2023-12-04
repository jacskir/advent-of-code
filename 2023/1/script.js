"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function part1(input) {
  let sum = 0;
  for (const line of input) {
    const firstNumber = line.match(/\d/);
    const lastNumber = line.match(/\d(?=[^\d]*$)/);
    sum += Number(firstNumber + lastNumber);
  }
  console.log(`part1: ${sum}`);
}

const input = loadFile(path.join(__dirname, "input.txt")).split("\r\n");
part1(input);
