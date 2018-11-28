


class Profiler{

    constructor(label) {
        this.label = label;
    }

    start(){
        this.lastTime = process.hrtime();
    }
    end(){
        const passed = process.hrtime(this.lastTime);
        console.log(`
        ${this.label} Time passed ${passed} ns 
        `);
    }
}
module.exports = function(label){
    switch(process.env['NODE_ENV']){
        case 'DEV':
            return new Profiler(label);
        case 'PROD':
            //duck typing
            return {start: () => {}, end: () => {}};
        default:
            throw new Error('You should specify NODE_ENV');
    }
};