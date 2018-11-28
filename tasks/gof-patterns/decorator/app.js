/*
Implement decorator that allows to catch matching put
Enhane existing solution by adding support of batch
 */
const level = require('level');
const decorator = require('./level-decorator');
let db = decorator(level(__dirname + '/db'));

db.subscribe({a: 2}, (k, v) => console.log(1));

db.batch([{type: 'put', key: '1', value: {a: 2, b: 3}},
    {type: 'put', key: '1', value: {a: 2, b: 3}},
    {type: 'put', key: '3', value: {a: 2, b: 23}},
    {type: 'put', key: '5', value: {a: 2, b: 10}}]);

