"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

const input = loadFile(path.join(__dirname, "input.txt"));
const moves = input.split("\r\n").map((move) => (move = move.split(" ")));

function simulateRope(moves, knotAmount) {
  const knots = Array.from({ length: knotAmount }, () => ({ x: 0, y: 0 }));
  const visits = [];

  for (const [direction, steps] of moves) {
    for (let i = 0; i < steps; i++) {
      // move head
      if (direction === "L") knots[0].x--;
      else if (direction === "R") knots[0].x++;
      else if (direction === "U") knots[0].y++;
      else if (direction === "D") knots[0].y--;

      // move knots if needed
      for (let j = 1; j < knots.length; j++) {
        const prevX = knots[j - 1].x;
        const prevY = knots[j - 1].y;
        const currX = knots[j].x;
        const currY = knots[j].y;

        if (
          prevX < currX - 1 ||
          prevX > currX + 1 ||
          prevY < currY - 1 ||
          prevY > currY + 1
        ) {
          if (prevX > currX) knots[j].x++;
          else if (prevX < currX) knots[j].x--;

          if (prevY > currY) knots[j].y++;
          else if (prevY < currY) knots[j].y--;
        }
      }

      // ensure new tail position has been visited
      let visited = false;
      const tailX = knots[knots.length - 1].x;
      const tailY = knots[knots.length - 1].y;
      for (const [x, y] of visits) {
        if (x === tailX && y === tailY) {
          visited = true;
          break;
        }
      }
      if (!visited) visits.push([tailX, tailY]);
    }
  }
  return visits.length;
}

console.log(`part1: ${simulateRope(moves, 2)}`);
console.log(`part2: ${simulateRope(moves, 10)}`);
