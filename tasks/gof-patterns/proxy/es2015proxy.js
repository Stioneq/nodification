


function Car(){

}
Car.prototype.move = function(){
  console.log('I move');
};

const car = new Car();

const a = new Proxy(car, {
    apply: () => console.log(11)
});

a.move.apply();