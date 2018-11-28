const fs = require('fs');
const path = require('path');


function iterateSeries(collection, callback, finish){
    
    function iterate(index){
        if(index === collection.length){
            return finish();
        }
        const task = collection[index];
        task((err,data) => {
            if(err){
                callback(err);
            }
            callback(data);
            iterate(index + 1);
        });
    }

    iterate(0);
}



//test 
iterateSeries([1,2,3].map((i) => asyncFunc(i)), console.log, () => console.log('finished'));

function asyncFunc(i){
    return (callback) => setTimeout(() => callback(null, i), 1000);
}