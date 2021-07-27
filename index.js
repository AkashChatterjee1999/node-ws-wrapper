const ws = require('ws');
const EventEmitter = require('events');
const allErrors = require("./domain/allErrors");
const { knownEventNames } = require("./config/generalConfigs");

class SocketWrapper extends EventEmitter {
    forServer = null;
    server = null;
    client= null;

    constructor(forServer, ...args) {
        super();
        this.forServer = forServer;
        if(forServer) {
            if(args.length > 1){
                if(typeof args[1] !== 'function')
                    throw allErrors.secondArgumentCallback();
            }
            this.server = new ws.Server(...args);
        } else {
            this.client = new ws(...args);
            this.client.on("message", data => {
                try{
                    data = JSON.parse(data);
                    if(data.event && !knownEventNames.includes(data.event))
                        super.emit(data.event, data);
                } catch(err) {
                    return data;
                }
            })
        }
    }

    on(name, ...args) {
        if (knownEventNames.includes(name)) {
            if(this.forServer)
                this.server.on(name, ...args);
            else
                this.client.on(name, ...args);
        } else {
            super.on(name, ...args);
        }
    }

    send(data) {
        if(this.forServer)
            this.server.send(data)
        else
            this.client.send(data);
    }

    emit(name,...args) {
        let JSONObj = { "event": name }
        this.forServer?
            this.server.send(JSON.stringify(JSONObj)):
            this.client.send(JSON.stringify(JSONObj));
    }
}

module.exports = SocketWrapper