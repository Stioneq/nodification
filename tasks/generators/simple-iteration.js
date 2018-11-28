function* iterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        const val = yield arr[i];
        console.log(`Value from outside ${val}`); 
    }
}



const iter = iterator([1, 2, 3, 4, 5]);
let el = iter.next();

while(!el.done){
    console.log(el.value);
    el = iter.next('1');
}

