interface Task {
    started: boolean;
    start: () => void;
    doneCallback: () => void;
}

export = Task;
