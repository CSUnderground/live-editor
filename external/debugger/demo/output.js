// init processing
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
var processing = new Processing(canvas);

// init canvas
processing.size(400,400);
processing.resetMatrix();
processing.usingDebugger = true;

var poster = new Poster(window.parent);
var debugr = new ProcessingDebugger({
    context: processing,
    onBreakpoint: function () {
        var scope = gehry.deconstruct(debugr.currentScope);
        poster.post("break", debugr.currentLine, debugr.currentStack, scope);
    },
    onFunctionDone: function () {
        poster.post("done");
    }
});

// TODO: remote procedure calling
// TODO: remote object proxying
poster.listen("load", function (code) {
    debugr.load(code);
});

poster.listen("start", function () {
    processing.size(400,400);
    processing.resetMatrix();
    debugr.start();
});

poster.listen("resume", function () {
    debugr.resume();
});

poster.listen("stepIn", function () {
    debugr.stepIn();
    var scope = gehry.deconstruct(debugr.currentScope);
    poster.post("break", debugr.currentLine, debugr.currentStack, scope);
});

poster.listen("stepOver", function () {
    debugr.stepOver();
    var scope = gehry.deconstruct(debugr.currentScope);
    poster.post("break", debugr.currentLine, debugr.currentStack, scope);
});

poster.listen("stepOut", function () {
    debugr.stepOut();
    var scope = gehry.deconstruct(debugr.currentScope);
    poster.post("break", debugr.currentLine, debugr.currentStack, scope);
});

poster.listen("setBreakpoint", function (line) {
    debugr.setBreakpoint(line);
});

poster.listen("clearBreakpoint", function (line) {
    debugr.clearBreakpoint(line);
});

poster.listen("setBreakpoints", function (breakpoints) {
    debugr.breakpoints = breakpoints; 
});

iframeOverlay.createRelay(canvas);

poster.post("ready");
