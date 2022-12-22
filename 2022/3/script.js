"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function charToPriority(char) {
  const charCode = char.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  } else if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }
}

function part1(rucksacks) {
  let sum = 0;
  for (let rucksack of rucksacks) {
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(-(rucksack.length / 2));

    for (const item1 of [...compartment1]) {
      let match = false;
      for (const item2 of [...compartment2]) {
        if (item2 === item1) {
          sum += charToPriority(item2);
          match = true;
          break;
        }
      }
      if (match === true) break;
    }
  }
  console.log(`part1: ${sum}`);
}

function part2(rucksacks) {
  let sum = 0;
  let group = [];
  for (let [i, rucksack] of rucksacks.entries()) {
    group.push(rucksack);

    if (group.length === 3) {
      for (const item1 of [...group[0]]) {
        let match = false;
        for (const item2 of [...group[1]]) {
          for (const item3 of [...group[2]]) {
            if (item3 === item2 && item2 === item1) {
              sum += charToPriority(item2);
              match = true;
              break;
            }
          }
          if (match === true) break;
        }
        if (match === true) break;
      }

      group = [];
    }
  }
  console.log(`part2: ${sum}`);
}

const rucksacks = loadFile(path.join(__dirname, "input.txt")).split("\r\n");
part1(rucksacks);
part2(rucksacks);
