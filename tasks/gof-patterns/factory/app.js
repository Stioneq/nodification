const profiler = require('./profiler');
const cache = [];
cache[0] = 0;
cache[1] = 1;
const run = (function main(){

    return (function fib(n) {
        if(cache[n] != null){
            return cache[n];
        }
        const res = fib(n-1)+fib(n-2);
        cache[n] = res;
        return res;
    })(50);
});

const p = profiler('fib');

p.start();
console.log(run());
p.end();
