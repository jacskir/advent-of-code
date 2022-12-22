"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

const input = loadFile(path.join(__dirname, "input.txt"));
const trees = input.split("\r\n").map((line) => (line = [...line]));
let visibleTrees = 0;
const scenicScores = [];

for (let i = 1; i < trees.length - 1; i++) {
  for (let j = 1; j < trees[i].length - 1; j++) {
    let sidesHidden = 0;
    let sides = [[], [], [], []];
    let viewDistances = [0, 0, 0, 0];

    for (let k = 0; k < i; k++) sides[0].push(trees[k][j]); // n
    for (let k = 0; k < j; k++) sides[1].push(trees[i][k]); // w
    for (let k = j + 1; k < trees[i].length; k++) sides[2].push(trees[i][k]); // e
    for (let k = i + 1; k < trees.length; k++) sides[3].push(trees[k][j]); // s

    // part 1
    for (const side of sides) {
      for (const tree of side) {
        if (tree >= trees[i][j]) {
          sidesHidden++;
          break;
        }
      }
    }
    if (sidesHidden !== 4) visibleTrees++;

    // part 2
    for (const [k, side] of sides.entries()) {
      if (k < 2) sides[k].reverse();
      for (const tree of side) {
        viewDistances[k]++;
        if (tree >= trees[i][j]) break;
      }
    }
    scenicScores.push(viewDistances.reduce((score, dist) => score * dist, 1));
  }
}

visibleTrees += 2 * (trees.length + (trees[0].length - 2));

console.log(`part1: ${visibleTrees}`);
console.log(`part2: ${Math.max(...scenicScores)}`);
