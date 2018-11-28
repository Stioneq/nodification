const fs = require('fs');


module.exports = function (engine){

    return function(template, model, callback){
        return new Promise((res, rej) => {
            fs.readFile(template, {encoding: 'utf8'}, (err, data) => {
                if (err) {
                    rej(err);
                    return callback && callback(err);
                }
                const output = engine(data, model);
                callback && callback(null, output);
                res(output);
            });
        })
    }
};




