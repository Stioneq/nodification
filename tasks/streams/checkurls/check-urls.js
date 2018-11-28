/*
    Write program that will check urls from the input in parallel
 */

const stream = require('stream');
const fs = require('fs');
const split = require('split');
const request = require("request");
class ParallelStream extends stream.Transform {
    constructor(userTransform) {
        super({objectMode: true});
        this.userTransform = userTransform;
        this.running = 0;
        this.terminateCallback = null;
    }

    _transform(chunk, enc, done) {
        this.running++;
        this.userTransform(chunk, enc, this.push.bind(this),
            this._onComplete.bind(this));
        done();
    }
    _flush(done){
        if(this.running > 0){
            this.terminateCallback = done;
        }else{
            done();
        }
    }
    _onComplete(err){
        this.running--;
        if(err){
            return this.emit('error', err);
        }
        if(this.running === 0){
            this.terminateCallback && this.terminateCallback();
        }
    }
}
console.time('mytimer');
fs.createReadStream('input.txt')
    .pipe(split())
    .pipe(new ParallelStream((url, enc, push, done) => {
        request.head(url, (err, res) => {
            push(url + ' is ' + (err ? 'down' : 'up') + '\n');
            done();
        });
    }))
    .pipe(fs.createWriteStream('output.txt'))
    .on('finish', () => console.timeEnd('mytimer'));