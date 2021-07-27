const SocketWrapper = require("../index");

const client = new SocketWrapper(false, 'ws://localhost:3000')

let data = ""
let aboutMe = {
    "hello": "hi",
    "clientId": "1233",
    "sessionId": "124qf23f",
    "clientName": "hello12",
    "password": "124457",
    "data": ""
}

client.on('open', () => {
    client.send(JSON.stringify(aboutMe))
});

client.on('close', function close() {
    console.log('disconnected');
});

client.on("hello", () => {
   client.send("Ping")
});

process.stdin.on('data', chunk => {
    data += chunk.toString();
    client.send(data);
    data = "";
})

client.on('message', data => {
    console.log("From different client => ", data);
});

setInterval(() => client.emit("hello"), 1000)