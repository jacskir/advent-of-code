"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function processPairs(input) {
  return input.map((pair) =>
    pair.split(",").map((elf) => elf.split("-").map((assmnt) => Number(assmnt)))
  );
}

function fullyContains(pair) {
  return (
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
  );
}

function overlaps(pair) {
  return (
    (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
    (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
    (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
  );
}

function part1(pairs) {
  let sum = 0;
  for (const pair of pairs) {
    if (fullyContains(pair)) sum += 1;
  }
  console.log(`part1: ${sum}`);
}

function part2(pairs) {
  let sum = 0;
  for (const pair of pairs) {
    if (overlaps(pair)) sum += 1;
  }
  console.log(`part2: ${sum}`);
}

const input = loadFile(path.join(__dirname, "input.txt")).split("\r\n");
const pairs = processPairs(input);
part1(pairs);
part2(pairs);
