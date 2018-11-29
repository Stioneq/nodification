
const zmq = require('zmq');
const MiddlewareManager = require('./zmq-middleware-manager');


const reply = zmq.socket('rep');
reply.bindSync('tcp://127.0.0.1:5000');

const middleware = new MiddlewareManager(reply);
middleware.use({
    inbound: async function(msg){
        console.log('Hello world');
        msg.data = JSON.parse(msg.data.toString());
    },
    outbound: async function(msg){
        msg.data = JSON.stringify(msg.data);
    }
});

