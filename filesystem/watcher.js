"use strict";

const target = "target.txt";
const fs = require("fs");
fs.watch(target, () => console.log(`File ${target} has changed.`));
console.log(`Watching ${target} for changes.`);