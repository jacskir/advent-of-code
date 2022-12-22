"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function getStacks(layout) {
  layout = layout.split(`\r\n`);
  layout.pop();

  const stacks = [[], [], [], [], [], [], [], [], []];

  for (const line of layout) {
    let charCount = 0;
    let stack = 0;
    for (const char of line) {
      if (charCount === 4) {
        charCount = 0;
        stack += 1;
      }
      if (char !== " " && char !== "[" && char != "]") {
        stacks[stack].push(char);
      }
      charCount += 1;
    }
  }

  for (const [i, stack] of stacks.entries()) {
    stacks[i].reverse();
  }

  return stacks;
}

function getInstructions(moves) {
  const instructions = [];
  for (const move of moves.split("\r\n")) {
    let i = 0;

    let instruction = {
      amount: undefined,
      from: undefined,
      to: undefined,
    };
    for (const str of move.split(" ")) {
      if (!isNaN(str)) {
        if (i === 0) instruction.amount = Number(str);
        else if (i === 1) instruction.from = Number(str);
        else if (i === 2) instruction.to = Number(str);
        i++;
      }
    }
    instructions.push(instruction);
  }

  return instructions;
}

function getAnswer(stacks) {
  let output = "";
  for (const stack of stacks) {
    output += stack[stack.length - 1];
  }
  return output;
}

function deepCopyArrayOfArrays(value) {
  return JSON.parse(JSON.stringify(value));
}

function part1(stacks, instructions) {
  for (const instruction of instructions) {
    for (let i = 0; i < instruction.amount; i++) {
      stacks[instruction.to - 1].push(stacks[instruction.from - 1].pop());
    }
  }
  console.log(`part1: ${getAnswer(stacks)}`);
}

function part2(stacks, instructions) {
  for (const instruction of instructions) {
    const move = stacks[instruction.from - 1].slice(-instruction.amount);

    for (let i = 0; i < instruction.amount; i++) {
      stacks[instruction.from - 1].pop();
    }

    stacks[instruction.to - 1] = stacks[instruction.to - 1].concat(move);
  }
  console.log(`part2: ${getAnswer(stacks)}`);
}

const [layout, moves] = loadFile(path.join(__dirname, "input.txt")).split(
  "\r\n\r\n"
);
const stacks = getStacks(layout);
const instructions = getInstructions(moves);
part1(deepCopyArrayOfArrays(stacks), instructions);
part2(deepCopyArrayOfArrays(stacks), instructions);
