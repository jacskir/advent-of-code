"use strict";

const fs = require("fs");

function loadFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { loadFile };
