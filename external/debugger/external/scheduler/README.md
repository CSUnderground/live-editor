[![Build Status](https://travis-ci.org/kevinb7/scheduler.svg)](https://travis-ci.org/kevinb7/scheduler)

# scheduler #

Schedule and run "re-entrant" tasks in JavaScript.

## API ##

- *addTask(task)* adds the task the queue (currently first-in-first-out)
- *clear()* removes all tasks from the queue.  Need to think about what to do
  with the current task if it's already been started (TODO)
- *createRepeater(createFunc, delay)* createFunc is a function that returns a
  new task when called, delay is the time between calls to createFunc.  Returns
  an object with two methods: start(), stop() and one access "delay" which can
  be used to change the delay while it's running.

## TODO ##

- clean up the API
- provide callback mechanism for when tasks complete, right now you have to add
  a .once("done", callback) to the task before adding it
- add a method like *startNextTaskNow()* which grabs the next task and runs in
  synchronously if it hasn't been started yet

