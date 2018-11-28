const fs = require('fs');
const http = require('http');

const async = require('async');


const addr = process.argv[2];


const getURL = url => callback => {
    http.get(url, res => {
        let body = '';
        res
            .on('data', data => {
                body += data;
            })
            .on('end', () => {
                callback(null, body)
            })
            .on('error', err => callback(err));
    });
}
let value = '';
let i = 0;
async.whilst(() => value !== 'meerkat', (callback) => {
    getURL(addr)((err, data) => { 
        value = data.trim();
        i++;
        callback();
    });
}, (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(i);
});

// async.series(
// async.map(process.argv.slice(2), (item, done) => {
//     getURL(item)(done);
// }, (err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// })