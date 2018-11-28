const http = require('http');


function promisify(func) {
    
    return function() {
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {

            args.push((err, result) => {
                if(err){
                    return reject(err);
                }
                if(arguments.length <= 2){
                    resolve(result);
                }else{
                    resolve([].slice.call(arguments, 1));    
                }
                
            });

            func.apply(null, args);

        })
    };
}


function someAsync(callback) {
    http.get('http://www.google.com', (res) => {
        console.log(res.statusCode);
        res.on('data', () => {

        });
        res.once('end', (val) => {
            callback(null, 'hello world');

        })

    });
}

someAsync((err, data) => {
    console.log(data);
})

promisify(someAsync)().then(data => {
    console.log(data);
});