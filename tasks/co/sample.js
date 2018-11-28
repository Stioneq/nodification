const co = require('co');
const readFile = require('util').promisify(require('fs').readFile);




co(function* test(){
     [1,2,3,4,5].map(() => () => setTimeout(() => console.log(1), 1000));
}).then(console.log);









