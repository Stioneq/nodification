const jot = require('json-over-tcp'); //[1]
module.exports = class OfflineState {
    constructor (failsafeSocket) {
        this.failsafeSocket = failsafeSocket;
    }
    send(data) { //[2]
        this.failsafeSocket.socket.write(data);
    }
    activate() { //[3]
        this.failsafeSocket.queue.forEach(data => {
           this.failsafeSocket.socket.write(data);
        });
        this.failsafeSocket.queue = [];
        this.failsafeSocket.socket.once('error', () => this.failsafeSocket.changeState('offline'));
    }
};
