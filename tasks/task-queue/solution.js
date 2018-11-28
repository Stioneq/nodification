class TaskQueue{
    constructor(concurrent){
        this.concurrent = concurrent;
        this.tasks = [];
        this.current = 0;
    }


    push(task){
        this.tasks.push(task);
        this.execute();
    }

    execute(){
        while(this.tasks.length && this.current < this.concurrent){
            const task = this.tasks.shift();
            task(() => {
                this.current--;
                this.execute();
            });
            this.current++;
        }
    }

}


//test 
const queue = new TaskQueue(2);
[1,1,1,1,1,1,1,1,1].map((i) => asyncFunc(i)).forEach(v => queue.push(v));


function asyncFunc(i){
    return (callback) => setTimeout(() => {
        callback();
        console.log(123);
        }, 1000 * i);
}