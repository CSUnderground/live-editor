/**
 * The purpose of the scheduler is to:
 * - add tasks to a queue in a certain order
 * - remove tasks from the queue when they have completed
 * - reschedule recurring tasks
 */

import LinkedList = require("../node_modules/basic-ds/lib/LinkedList");
import Task = require("./task");

class Scheduler {
    private queue: LinkedList<Task>;

    constructor () {
        this.queue = new LinkedList<Task>();
    }

    addTask(task) {
        var done = task.doneCallback;
        task.doneCallback = () => {
            this.removeTask(task);
            done();
        };
        this.queue.push_front(task);
        this.tick();
    }

    private tick() {
        setTimeout(() => {
            var currentTask = this.currentTask();
            if (currentTask !== null && !currentTask.started) {
                currentTask.start();
                this.tick();
            }
        }, 0);  // defer execution
    }

    private removeTask(task) {
        if (task === this.currentTask()) {
            this.queue.pop_back();
            this.tick();
        } else {
            throw "not the current task";
        }
    }

    currentTask() {
        return this.queue.last ? this.queue.last.value : null;
    }

    clear() {
        this.queue.clear();
    }

    createRepeater(createFunc: () => Task, delay: number) {
        var _repeat = true;
        var _scheduler = this;
        var _delay = delay;

        function repeatFunc() {
            if (!_repeat) {
                return;
            }
            var task = createFunc();
            var done = task.doneCallback;
            task.doneCallback = function () {
                if (_repeat) {
                    setTimeout(repeatFunc, _delay);
                }
                done();
            };
            _scheduler.addTask(task);
        }

        var repeater = {
            stop: function () {
                _repeat = false;
            },
            start: function () {
                repeatFunc();
            }
        };

        Object.defineProperty(repeater, "delay", {
            get: function () {
                return _delay;
            },
            set: function (delay) {
                _delay = delay;
            }
        });

        return repeater;
    }
}

export = Scheduler;
