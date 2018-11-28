const stream = require('stream');


function proxyStream(stream){

    function LoggingStream(){
        this.stream = stream;
    }
    LoggingStream.prototype = Object.create(Object.getPrototypeOf(stream));
    LoggingStream.prototype.write = function(){
        console.log('Iam logging stream');
        this.stream.write.apply(this.stream, arguments);
    };
    LoggingStream.prototype.on = function() {
        return this.stream.on
            .apply(this.stream, arguments);
    };
    LoggingStream.prototype.end = function() {
        return this.stream.end
            .apply(this.stream, arguments);
    };

    return new LoggingStream(stream);
}


process.stdin.pipe(proxyStream(process.stdout));