"use strict";

const net = require("net");
const portArg = process.argv[2];

if (!portArg) {
    throw Error("ERROR: No port specified.");
}

const port = parseInt(portArg);

if (isNaN(port)) {
    throw Error("ERROR: Specify a valid port.");
}

const client = net.connect(port);

client.on("data", data => {
    const message = JSON.parse(data);

    if(message.type === "watching") {
        console.log(`Now watching ${message.file}`);
    }
    else if (message.type === "changed") {
        const timestamp = new Date(message.timestamp);
        console.log(`File ${message.file} changed on ${timestamp}`);
    }
    else {
        console.log(`Unrecognized message type \"${message.type}\"`);
    }
});