"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

function hasDuplicateStrings(list) {
  for (let i = 0; i < list.length; i++) {
    if (list.indexOf(list[i]) !== i) {
      return true; // duplicate string found
    }
  }
  return false; // no duplicate strings found
}

function calcCharsBeforeFirstMarker(input, markerLength) {
  const marker = [];
  for (const [i, char] of [...input].entries()) {
    marker.push(char);
    if (marker.length === markerLength + 1) marker.shift();
    if (marker.length === markerLength) {
      if (!hasDuplicateStrings(marker)) return i + 1;
    }
  }
}

const input = loadFile(path.join(__dirname, "input.txt"));
console.log(`part1: ${calcCharsBeforeFirstMarker(input, 4)}`);
console.log(`part2: ${calcCharsBeforeFirstMarker(input, 14)}`);
