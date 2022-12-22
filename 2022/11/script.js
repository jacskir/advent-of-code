"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

const input = loadFile(path.join(__dirname, "input.txt"))
  .split("\r\n\r\n")
  .map(
    (values) =>
      (values = values
        .split("\n")
        .slice(1)
        .map((values) => values.split(":")[1].trim()))
  );

const monkeys = [];
const rounds = 20;

for (const values of input) {
  const monkey = {
    items: values[0].split(", ").map((item) => Number(item)),
    operation(old) {
      const [operator, value] = values[1].split("= old")[1].trim().split(" ");

      if (value === "old") {
        if (operator === "*") return old * old;
        else if (operator === "+") return old + old;
      } else {
        if (operator === "*") return old * Number(value);
        else if (operator === "+") return old + Number(value);
      }
    },
    test(value) {
      return value % Number(values[2].split("divisible by")[1].trim()) === 0;
    },
    throwIfTrue: Number(values[3].split("throw to monkey")[1].trim()),
    throwIfFalse: Number(values[4].split("throw to monkey")[1].trim()),
    inspections: 0,
  };

  monkeys.push(monkey);
}

for (let i = 0; i < rounds; i++) {
  for (const [i, monkey] of monkeys.entries()) {
    for (const item of monkey.items) {
      let worryLvl = monkey.operation(item);
      worryLvl = Math.floor(worryLvl / 3);

      if (monkey.test(worryLvl))
        monkeys[monkey.throwIfTrue].items.push(worryLvl);
      else monkeys[monkey.throwIfFalse].items.push(worryLvl);

      monkey.inspections += 1;
    }
    monkey.items = [];
  }
}

const inspections = [];
for (const [i, monkey] of monkeys.entries()) {
  inspections.push(monkey.inspections);
}
inspections.sort((a, b) => b - a).slice(0, 2);

console.log(`part1: ${inspections[0] * inspections[1]}`);
console.log(`part2: this part is unfinished`);
