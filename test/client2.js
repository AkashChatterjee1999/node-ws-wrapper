const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');
let data = "";
let aboutMe = {
    "hello": "hi",
    "clientId": "1233",
    "sessionId": "124qf23f",
    "clientName": "hello",
    "password": "124456",
    "msg": ""
}

ws.on('open', () => {
    ws.send(JSON.stringify(aboutMe))
});

ws.on('close', function close() {
    console.log('disconnected');
});

process.stdin.on('data', chunk => {
    aboutMe[data] += chunk;
    ws.send(data);
})

ws.on('message', data => {
    console.log("From different client => ", data);
});