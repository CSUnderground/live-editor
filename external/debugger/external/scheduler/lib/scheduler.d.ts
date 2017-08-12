import Task = require("./task");
declare class Scheduler {
    private queue;
    constructor();
    addTask(task: any): void;
    private tick();
    private removeTask(task);
    currentTask(): Task;
    clear(): void;
    createRepeater(createFunc: () => Task, delay: number): {
        stop: () => void;
        start: () => void;
    };
}
export = Scheduler;
