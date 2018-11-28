const chance = new require('chance')();
const {Readable} = require('stream');

class RandomStream extends Readable{
    constructor(options) {
        super(options);
    }
    _read(size) {
        const chunk = chance.string(); //[1]
        console.log(`Pushing chunk of size: ${chunk.length}`);
        this.push(chunk, 'utf8'); //[2]
        if (chance.bool({likelihood: 5})) { //[3]
            this.push(null);
        }
    }
}


const rs = new RandomStream({encoding: 'utf8'});
rs
    .on('readable', () => {
        let chunk;
        while((chunk = rs.read()) != null){
            console.log(chunk);
        }

    })
    .on('end', () => {
        console.log('finish reading');
    });