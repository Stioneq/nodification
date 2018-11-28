process.stdin
    .on('data', (data) => {
        console.log(data);
    })
    .on('end', () => {
        console.log('finish reading');
    })
    .setEncoding('utf8');