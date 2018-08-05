"use strict";

const fs = require("fs");
const spawn = require("child_process").spawn;
const target = process.argv[2];

if (!target) {
    throw Error('Specify a file to watch.');
}

fs.watch(
    target, 
    () => {
        const ls = spawn("ls", ["-l", "-h", target]);
        ls.stdout.pipe(process.stdout);
    });
    
console.log(`Watching ${target} for changes.`);