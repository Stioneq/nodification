const co = require('co');
class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.taskQueue = [];
        this.consumerQueue = [];
        this.spawnWorkers(concurrency);
    }

    pushTask(task) {
        console.log('new task');
        if (this.consumerQueue.length !== 0) {
            console.log('new task 1');
            this.consumerQueue.shift()(null, task);
        } else {
            console.log('new task 2');
            this.taskQueue.push(task);
        }
    }

    spawnWorkers(concurrency) {
        const self = this;
        for (let i = 0; i < concurrency; i++) {
            co(function* () {
                while (true) {
                    const task = yield self.nextTask();
                    yield task;
                }
            });
        }
    }
    nextTask() {
        return callback => {
            if(this.taskQueue.length !== 0) {
                return callback(null, this.taskQueue.shift());
            }
            console.log(1);
            this.consumerQueue.push(callback);
        }
    }

}

task =new TaskQueue(2);
setTimeout(() => console.log(1), 10000);

task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));
task.pushTask(() => setTimeout(() => console.log(2), 1000));

