"use strict";

const path = require("path");
const { loadFile } = require("../fileUtils");

class Directory {
  constructor(dirName) {
    this.dirName = dirName;
    this.dirSize = 0;
    this.dirs = [];
    this.files = [];
  }
}

const rootDir = new Directory("/");

const filePath = {
  path: [],
  addFile(fileSize, fileName) {
    this.getCurrentDir().files.push({ fileSize, fileName });
  },
  addDir(dirName) {
    this.getCurrentDir().dirs.push(new Directory(dirName));
  },
  getCurrentDir() {
    return this.path[this.path.length - 1];
  },
  goForward(dir) {
    this.path.push(
      this.getCurrentDir().dirs.find((obj) => obj.dirName === dir)
    );
  },
  goBack() {
    this.path.pop();
  },
  goStart() {
    this.path = [rootDir];
  },
};

function generateFileSystem(input) {
  for (const line of input) {
    if (line.startsWith("$")) {
      const [_, command, param] = line.split(" ");

      if (command === "cd") {
        if (param === "/") {
          filePath.goStart();
        } else if (param === "..") {
          filePath.goBack();
        } else {
          filePath.goForward(param);
        }
      }
    } else {
      const [i, j] = line.split(" ");
      if (i === "dir") {
        filePath.addDir(j);
      } else {
        filePath.addFile(Number(i), j);
      }
    }
  }
}

function calcDirSizes(node) {
  for (const dir of node.dirs) calcDirSizes(dir);
  for (const file of node.files) node.dirSize += file.fileSize;
  for (const dir of node.dirs) node.dirSize += dir.dirSize;
}

function part1(rootDir) {
  let dirs = [];
  const getDirsMaxSize = function (node, size) {
    if (node.dirSize <= size) dirs.push(node);
    for (const dir of node.dirs) getDirsMaxSize(dir, size);
  };
  getDirsMaxSize(rootDir, 100000);

  console.log(
    `part1: ${dirs.map((dir) => dir.dirSize).reduce((sum, size) => sum + size)}`
  );
}

function part2() {
  const requiredSpace = 30000000 - (70000000 - rootDir.dirSize);

  let dirs = [];
  const getDirsMinSize = function (node, size) {
    if (node.dirSize >= size) dirs.push(node);
    for (const dir of node.dirs) getDirsMinSize(dir, size);
  };
  getDirsMinSize(rootDir, requiredSpace);

  console.log(`part2: ${Math.min(...dirs.map((dir) => dir.dirSize))}`);
}

const input = loadFile(path.join(__dirname, "input.txt")).split("\r\n");
generateFileSystem(input);
calcDirSizes(rootDir);
part1(rootDir);
part2(rootDir);
