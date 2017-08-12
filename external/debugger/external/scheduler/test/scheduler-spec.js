/*global describe, it, beforeEach, afterEach */

describe("Scheduler", function () {

    it("should run a single task after adding it", function (done) {
        var scheduler = new Scheduler();
        var task = new Task(
            function () {
                task.complete();
            },
            function () {
                expect(true).to.be(true);
                done();
            });
        scheduler.addTask(task);
    });

    it("should run a tasks in the order that they were added", function (done) {
        var num;
        var scheduler = new Scheduler();
        var task1 = new Task(
            function () {
                task1.complete();
            },
            function () {
                expect(num).to.be(undefined);
                num = 1;
            });
        var task2 = new Task(
            function () {
                task2.complete();
            },
            function () {
                expect(num).to.be(1);
                num = 2;
            });
        var task3 = new Task(
            function () {
                task3.complete();
            },
            function () {
                expect(num).to.be(2);
                num = 3;
                done();
            });
        scheduler.addTask(task1);
        scheduler.addTask(task2);
        scheduler.addTask(task3);
    });

    it("clear() should discard pending tasks", function (done) {
        var num;
        var scheduler = new Scheduler();
        var task1 = new Task(
            function () {
                task1.complete();
            },
            function () {
                expect(num).to.be(undefined);
                num = 1;
                scheduler.clear();
            });
        var task2 = new Task(
            function () {
                task2.complete();
            },
            function () {
                expect(num).to.be(1);
                num = 2;
            });
        var task3 = new Task(
            function () {
                task3.complete();
            },
            function () {
                expect(num).to.be(2);
                num = 5;
            });

        scheduler.addTask(task1);
        scheduler.addTask(task2);
        scheduler.addTask(task3);
        setTimeout(function () {
            expect(num).to.be(1);
            done();
        }, 200);
    });

    describe("createRepeater", function () {
        it("should run a task until stopped", function (done) {
            var count = 0;
            var expectedCount = 0;
            var scheduler = new Scheduler();
            var repeater = scheduler.createRepeater(function () {
                var task = new Task(function () {
                    count++;
                    task.complete();
                });
                return task;
            }, 1000 / 60);

            repeater.start();
            setTimeout(function () {
                expectedCount = count;
                expect(count).to.be.greaterThan(2);
                repeater.stop();

                setTimeout(function () {
                    expect(count).to.be(expectedCount);
                    done();
                }, 100);
            }, 100);
        });

        it("should call the doneCallback on each task", function (done) {
            var count = 0;
            var expectedCount = 0;
            var scheduler = new Scheduler();
            var repeater = scheduler.createRepeater(function () {
                var task = new Task(function () {
                    task.complete();
                }, function () {
                    count++;
                });
                return task;
            }, 1000 / 60);

            repeater.start();
            setTimeout(function () {
                expectedCount = count;
                expect(count).to.be.greaterThan(2);
                repeater.stop();

                setTimeout(function () {
                    expect(count).to.be(expectedCount);
                    done();
                }, 100);
            }, 100);
        });

        it("should change the delay", function (done) {
            var count = 0;
            var scheduler = new Scheduler();
            var repeater = scheduler.createRepeater(function () {
                var task = new Task(function () {
                    count++;
                    task.complete();
                });
                return task;
            }, 16); // ms

            repeater.start();
            setTimeout(function () {
                repeater.delay = 1; // ms
                expect(count).to.be.greaterThan(2);

                setTimeout(function () {
                    expect(count).to.be.greaterThan(20);
                    repeater.stop();
                    done();
                }, 200);    // because phantomjs is slow
            }, 100);
        });
    });
});
