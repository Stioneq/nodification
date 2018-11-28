const db = require('level');
const path = require('path')


function createAdapter(db) {
    const fs = {};

    fs.readFile = (fileName, options, cb) => {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        } else if (typeof options === 'string') {
            options = {encoding: options};
        }
        db.get(path.resolve(fileName), {valueEncoding: options.encoding},
            (err, value) => {
                if (err) {
                    if (err.type === 'NotFoundError') { //[2]
                        err = new Error(`ENOENT, open "${filename}"`);
                        err.code = 'ENOENT';
                        err.errno = 34;
                        err.path = filename;
                    }
                    return cb && cb(err);
                }
                cb && cb(null, value);
            });
    };
    fs.writeFile = (fileName, data, options, cb) => {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        } else if (typeof options === 'string') {
            options = {encoding: options};
        }
        db.put(path.resolve(fileName), data, {valueEncoding: options.encoding}, cb);
    };
    return fs;
}


const fs = createAdapter(db(__dirname+'/db'));
fs.writeFile(__dirname+'/some.txt','1');


