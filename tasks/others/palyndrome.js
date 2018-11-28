

function isPalyndrome(str){
    return str.split('').reverse().join('') === str;
}

console.log(isPalyndrome('aba'));