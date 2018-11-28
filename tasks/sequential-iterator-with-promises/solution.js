function callback(i) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(12);
            res(i);
        }, 1000);
    });

}


function seqIterator1(tasks) {
    let promise = Promise.resolve();



    tasks.forEach((task, i) => {
        promise = promise.then(() => {
            console.log(i);
            return task(i);
        });
    });
    promise.then(() => {
        console.log('finished');
    })
}

function seqIterator2(tasks){
    tasks.reduce((prom, cur) => {
        
        return prom.then(() => {
            return cur();
        });
    }, Promise.resolve());
}

seqIterator1([5, 3, 4, 1, 2].map(() => callback));