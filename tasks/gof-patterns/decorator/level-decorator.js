module.exports = function (level) {
    function match(key, val, pattern){
        return Object.keys(pattern).every((k) => (pattern[k]=== val[k]));
    }


    level.subscribe = (pattern, listener) => {
        level.on('put', (key, val) => {
            if(match(key,val, pattern)){
               listener(key,val);
            }
        })
            .on('batch', values => {
                values.forEach((entry) => {
                    const {key, value} = entry;
                    if(match(key,value, pattern)){
                        listener(key,value);
                    }
                })
            })
    };
    return level;
};