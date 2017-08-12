var LinkedList = require("../node_modules/basic-ds/lib/LinkedList");
var Scheduler = (function () {
    function Scheduler() {
        this.queue = new LinkedList();
    }
    Scheduler.prototype.addTask = function (task) {
        var _this = this;
        var done = task.doneCallback;
        task.doneCallback = function () {
            _this.removeTask(task);
            done();
        };
        this.queue.push_front(task);
        this.tick();
    };
    Scheduler.prototype.tick = function () {
        var _this = this;
        setTimeout(function () {
            var currentTask = _this.currentTask();
            if (currentTask !== null && !currentTask.started) {
                currentTask.start();
                _this.tick();
            }
        }, 0);
    };
    Scheduler.prototype.removeTask = function (task) {
        if (task === this.currentTask()) {
            this.queue.pop_back();
            this.tick();
        }
        else {
            throw "not the current task";
        }
    };
    Scheduler.prototype.currentTask = function () {
        return this.queue.last ? this.queue.last.value : null;
    };
    Scheduler.prototype.clear = function () {
        this.queue.clear();
    };
    Scheduler.prototype.createRepeater = function (createFunc, delay) {
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
    };
    return Scheduler;
})();
module.exports = Scheduler;
