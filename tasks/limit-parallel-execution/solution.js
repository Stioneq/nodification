function parallelExecute(collection, concurrent, callback, finish) {

    let current = 0;
    let index = 0;
    function next() {
        let processed = 0;
        while(collection.length !== index && current < concurrent){
            const task = collection[index++];
            task((err, data) => {
                current--;
                if (err) {
                    callback(err);
                }
                if (processed++ === collection.length) {
                    return finish();
                }
                callback(data);
                next();
            });
            current++;
        }
    }
    next();
}



//test 
parallelExecute([1,1,1,1,1,1].map((i) => asyncFunc(i)),2, console.log, () => console.log('finished'));

function asyncFunc(i) {
    return (callback) => setTimeout(() => callback(null, i), 1000 * i);
}