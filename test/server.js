const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({
    port: 3000,
});

webSocketServer.on('connection',ws => {

    ws.on('message', data => {
        console.log(data);
        webSocketServer.clients.forEach( client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

});