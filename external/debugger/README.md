[![Build Status](https://travis-ci.org/kevinb7/debugger.svg?branch=master)](https://travis-ci.org/kevinb7/debugger)

# debugger #

Debug JavaScript code using JavaScript.

This project is currently focused on debugging processing.js programs being
run in Khan Academy's live-editor.  Eventually make the debugger more general 
purpose.  That being said, it already supports a lot of JavaScript constructs.

[live demo](http://kevinb7.github.io/debugger/demo/index.html)

## Features ##

- step in/over/out
- rudimentary support for setTimeout/setInterval
- support for Array.prototype methods: map, reduce(Right), filter, forEach, 
  every, and some
- break on "debugger;" statements
- use ES6 generators if available (should be faster)

## TODO ##

- improved __for__ loop support
- handle processing.js' __frameRate__ function
- more accurate position information so that the actual command can be highlighted
  instead of just highlighting the whole line
- DOM event handlers
- requestAnimationFrame

## Usage ##

    <script src="debugger.js"></script>

    var _debugger = new Debugger({ 
        context: { /* dictionary of values to inject into global scope */ }
    });
    
    _debugger.load(CODE_AS_A_STRING);

    _debugger.setBreakpoint(LINE_NUMBER);
    
    _debugger.start();  // runs until the breakpoint is hit
    
    _debugger.stepIn();
    _debugger.stepOver();
    _debugger.stepOut();
    
    _debugger.clearBreakpoint(LINE_NUMBER);
    
    _debugger.resume(); // continues running
    
    _debugger.stop();

## Subclasses ##

There is currently only one subclass: ProcessingDebugger.  This subclass handles
processing-js' draw loop and event handlers properly.

    <script src="debugger.js"></script>
    <script src="processing-debugger.js"></script>

    var processing = new Processing(canvasElement);

    var _debugger = new Debugger({ 
        context: processing
    });
