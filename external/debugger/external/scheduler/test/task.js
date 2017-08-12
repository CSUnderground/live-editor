function Task(action, doneCallback) {
    this.started = false;
    this.action = action;
    this.doneCallback = doneCallback || function () {};
}

Task.prototype.start = function () {
    this.started = true;
    this.action();
};

Task.prototype.complete = function () {
    this.doneCallback();
};
