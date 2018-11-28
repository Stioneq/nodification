

function createProxy(subject){
    const temp  = subject.toString;
    subject.toString =  function(){
        return 'Proxied' + temp.call(this);
    };
    return subject;
}

console.log({a:1});
console.log(createProxy({a: 1}).toString());