"use strict";

const fs = require("fs");
const target = process.argv[2];

if (!target) {
    throw Error('Specify a file to watch.');
}

fs.watch(target, () => console.log(`File ${target} has changed.`));
console.log(`Watching ${target} for changes.`);