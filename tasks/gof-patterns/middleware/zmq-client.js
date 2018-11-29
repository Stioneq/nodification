const zmq = require('zmq');
const request = zmq.socket('req');
const MiddlewareManager = require('./zmq-middleware-manager');
request.connect('tcp://127.0.0.1:5000');

const middleware = new MiddlewareManager(request);

middleware.use({
    inbound: async function(msg){
        msg.data = JSON.parse(msg.data.toString());
    },
    outbound: async function(msg){
        msg.data = JSON.stringify(msg.data);
    }
});


setInterval(() => {
    middleware.send({user: 'Roman'});
    console.log(2);
}, 1000);