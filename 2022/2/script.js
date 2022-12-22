"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function processInput(input) {
  const rounds = input.split("\r\n");
  for (let [i, round] of rounds.entries()) {
    rounds[i] = round.split(" ");
  }
  return rounds;
}

function part1(rounds) {
  let score = 0;
  for (const [opp, me] of rounds) {
    if (me === "X") {
      score += 1;
      if (opp === "A") score += 3;
      if (opp === "B") score += 0;
      if (opp === "C") score += 6;
    } else if (me === "Y") {
      score += 2;
      if (opp === "A") score += 6;
      if (opp === "B") score += 3;
      if (opp === "C") score += 0;
    } else if (me === "Z") {
      score += 3;
      if (opp === "A") score += 0;
      if (opp === "B") score += 6;
      if (opp === "C") score += 3;
    }
  }
  console.log(`part1: ${score}`);
}

function part2(rounds) {
  let score2 = 0;
  for (const [opp, me] of rounds) {
    if (me === "X") {
      score2 += 0;
      if (opp === "A") score2 += 3;
      if (opp === "B") score2 += 1;
      if (opp === "C") score2 += 2;
    } else if (me === "Y") {
      score2 += 3;
      if (opp === "A") score2 += 1;
      if (opp === "B") score2 += 2;
      if (opp === "C") score2 += 3;
    } else if (me === "Z") {
      score2 += 6;
      if (opp === "A") score2 += 2;
      if (opp === "B") score2 += 3;
      if (opp === "C") score2 += 1;
    }
  }
  console.log(`part2: ${score2}`);
}

const input = loadFile(path.join(__dirname, "input.txt"));
const rounds = processInput(input);
part1(rounds);
part2(rounds);
