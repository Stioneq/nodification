module.exports = class ZmqMiddlewareManager {
    constructor(socket) {
        this.socket = socket;
        this.inboundMiddleware = []; //[1]
        this.outboundMiddleware = [];
        socket.on('message', message => { //[2]
            console.log('1');
       
        });
        socket.on('error', err => {
            console.log(err);
            
        })
    }

    send(data) {
        this.socket.send(data);
    }

    use(middleware) {
        if (middleware.inbound) {
            this.inboundMiddleware.push(middleware.inbound);
        }
        if (middleware.outbound) {
            this.outboundMiddleware.unshift(middleware.outbound);
        }
    }

    async executeMiddleware(middleware, arg, finish) {
        for (let i = 0; i < middleware.length; i++) {
            await middleware[i].call(this.socket, arg);
        }
    }
};


