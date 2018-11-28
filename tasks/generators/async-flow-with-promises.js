const {
    promisify
} = require('util');
const fs = require('fs');
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

function asyncFlow(generator) {



    const gen = generator();
    function execute(data) {
        console.log(1);
        const result = gen.next(data);
        if(result.done) {
            return result.value;
        }else {
            return result.value.then(execute);
        }

    }
    execute();
}

function* rf() {
    const file = 'simple-iteration.js';
    const val = yield stat(file);
    
    if (val.isFile()) {
        const text = yield readFile(file, 'utf8');
        return text;
    } else {
        console.error('is directory');
    }


}

asyncFlow(rf);