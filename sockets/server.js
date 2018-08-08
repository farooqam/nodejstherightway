"use strict";

const fs = require("fs");
const net = require("net");
const uuid = require('uuid/v4');
const fileName = process.argv[2];
const portArg = process.argv[3];

if (!fileName) {
    throw Error("ERROR: No file name specified.");
}

const port = parseInt(portArg);

if (isNaN(port)) {
    throw Error("ERROR: Specify a valid port.");
}

const server = net.createServer(conn => {
    const clientId = uuid();
    console.log(`Subscriber connected. Client id is ${clientId}`);
    conn.write(JSON.stringify({type: 'watching', file: fileName})  + "\n");

    const watcher = fs.watch(fileName, () => {
        conn.write(JSON.stringify({type: 'changed', timestamp: Date.now(), clientId: clientId}) + "\n");
    });

    conn.on("close", () => {
        console.log("Subscriber disconnected");
        watcher.close();
    });
});

server.listen(60300, () => {
    console.log(`Listening for subscribers on port ${port}...`);
});