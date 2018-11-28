

process.stdin
    .on('readable', () => {
        let chunk;
        while((chunk = process.stdin.read()) != null){
            console.log(chunk.toString());
        }

    })
    .on('end', () => {
       console.log('finish reading');
    });