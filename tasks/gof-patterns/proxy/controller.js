/*
    add security login to the controller
 */
function createGuard(controller){




    function Guard(controller){
        this.logged = true;
        this.controller = controller;
    }
    Guard.prototype = Object.create(Object.getPrototypeOf(controller));

    Guard.prototype.handleLogin = function(){
        if(Math.random() < .4){
            console.error('Cannot logged in');
        }else {
            this.controller.handleLogin.apply(this.controller);
        }
    };
    return new Guard(controller);
}


function Controller() {

}

Controller.prototype.handleLogin = function(){
    console.log('Logged in');
};


const controller = new Controller();
controller.handleLogin();

const guard = createGuard(controller);
guard.handleLogin();