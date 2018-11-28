
const createBase = n => val => val + n;
const addSix = createBase(6);

console.log(addSix(10));
console.log(addSix(21));