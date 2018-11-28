const fs = require('fs');
const path = require('path');


function parallelExecute(collection, callback, finish){
    
    let processed = 0;
    collection.forEach(task => {
        task((err,data) => {
            if(err){
                callback(err);
            }
            if(processed++ === collection.length){
                return finish();
            }
            callback(data);
        });
    });
}



//test 
parallelExecute([4,2,3].map((i) => asyncFunc(i)), console.log, () => console.log('finished'));

function asyncFunc(i){
    return (callback) => setTimeout(() => callback(null, i), 1000 * i);
}