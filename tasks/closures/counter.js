
function counter(){
    let count = 0;

    return {
        inc(){
            count++;
        },
        get(){
            return count;
        }
    }
}

const _counter = counter();

_counter.inc();
_counter.inc();
_counter.inc();
console.log(_counter.get());