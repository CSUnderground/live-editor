// setup editor
var editor = ace.edit("editor");
var session = editor.getSession();
var browser = new ObjectBrowser(document.querySelector("#variableList"));

editor.setTheme("ace/theme/chrome");
editor.setHighlightActiveLine(false);

session.setMode("ace/mode/javascript");

// iframe communication
var iframe = $("iframe").get(0);
var overlay = iframeOverlay.createOverlay(iframe);
// TODO: remove the need for specific ordering
// createIframeOverlay repositions the iframe in the DOM
// which throws away the contentWindow and probably forces it to reload
var poster = new Poster(iframe.contentWindow);

var paused = false;
var editorContainer = $("#editor-container").get(0);
editorContainer.addEventListener("mousedown", function (e) {
    if (paused) {
        var elem = document.elementAtPoint(e.pageX, e.pageY);
        if (!$(elem).hasClass("ace_gutter-cell")) {
            e.stopPropagation();
        }
    }
}, true);

poster.listen("break", function (line, stackValues, scope) {
    enableButtons();
    if (line > 0) {
        overlay.pause();
        updateView(line);
        updateCallStack(stackValues);
        updateLocals(gehry.reconstruct(scope));
        
        // disable editing
        editor.setReadOnly(true);
        $(".ace_cursor").hide();
        paused = true;
        $("#editor-container").attr("disabled", "");
    }
});

poster.listen("done", function () {
    overlay.resume();
    disableButtons();
    editor.setHighlightActiveLine(false);

    // clear call stack and locals
    updateCallStack([]);
    updateLocals();
    overlay.resume();

    // enabled editing again
    editor.setReadOnly(false);
    paused = false;
    $(".ace_cursor").show();
    $("#editor-container").removeAttr("disabled");
});

function start() {
    overlay.resume();
    var code = session.getValue();

    var breakpoints = {};
    editor.session.getBreakpoints().forEach(function (value, index) {
        breakpoints[index + 1] = true;
    });

    poster.post("setBreakpoints", breakpoints);
    poster.post("load", code);
    poster.post("start");
}

$("#startButton").click(function (e) {
    start();
});

$("#continueButton").click(function () {
    poster.post("resume");
    overlay.resume();
});

$("#stepInButton").click(function () {
    poster.post("stepIn");
});

$("#stepOverButton").click(function () {
    poster.post("stepOver");
});

$("#stepOutButton").click(function () {
    poster.post("stepOut");
});

$("#startButton,#continueButton,#stepOverButton,#stepInButton,#stepOutButton").on("mousedown", function (e) {
    e.preventDefault();
});

// set/clear breakpoints by clicking in the gutter
editor.on("guttermousedown", function(e){
    var target = e.domEvent.target;
    if (target.className.indexOf("ace_gutter-cell") == -1) {
        return;
    }

    // only set a breakpoint when clicking on the left side of the target
    if (e.clientX > 25 + target.getBoundingClientRect().left) {
        return;
    }

    var row = parseInt(e.domEvent.target.innerText);

    if (e.editor.session.getBreakpoints()[row - 1]) {
        e.editor.session.clearBreakpoint(row - 1);
        poster.post("clearBreakpoint", row);
    } else {
        e.editor.session.setBreakpoint(row - 1);
        poster.post("setBreakpoint", row);
    }

    e.stop();
});

// Based on:
// https://github.com/ajaxorg/cloud9/blob/master/plugins-client/ext.debugger/breakpoints.js#L170
session.on("change", function(e) {
    if (!session.$breakpoints.length) {
        return;
    }

    var delta = e.data;
    var range = delta.range;
    if (range.end.row == range.start.row) {
        return;
    }

    var len, firstRow;
    len = range.end.row - range.start.row;

    if (delta.action == "insertText") {
        firstRow = range.start.column ? range.start.row + 1 : range.start.row;
    } else {
        firstRow = range.start.row;
    }

    if (delta.action === "insertText" || delta.action === "insertLines") {
        var args = new Array(len);
        args.unshift(firstRow, 0);
        Array.prototype.splice.apply(session.$breakpoints, args);
    } else {
        if (range.start.column === 0 && range.end.column === 0) {
            session.$breakpoints.splice(firstRow, len);
        } else {
            session.$breakpoints.splice(firstRow + 1, len);
        }
    }
});

function updateView(line) {
    editor.gotoLine(line);
    editor.setHighlightActiveLine(true);
}

function disableButtons() {
    $("#continueButton,#stepOverButton,#stepInButton,#stepOutButton").attr("disabled", "");
}

function enableButtons() {
    $("#continueButton,#stepOverButton,#stepInButton,#stepOutButton").removeAttr("disabled");
}

function updateCallStack(stackValues) {
    var $callStack = $("#callStack");
    $callStack.empty();

    var $ul = $("<ul></ul>");
    stackValues.forEach(function (frame) {
        if (frame.name !== undefined) {
            var name = frame.name.replace(/context[0-9]+./, "");
            var $name = $("<span></span>").text(name);
            var $line = $("<span></span>").text(frame.line).css({ float: "right" });
            $ul.prepend($("<li></li>").append($name, $line));
        }
    });
    $callStack.append($ul);
}

function updateLocals(scope) {
    browser.object = scope;
}

poster.listen("ready", function () {
    var code = session.getValue();
    poster.post("load", code);
    poster.post("start");
});

var cache = {};

function loadProgram(name) {
    if (!cache[name]) {
        var path = "examples/" + name;

        $.ajax(path, {
            type: 'GET',
            dataType: 'text',
            contentType: "application/javascript",
            success: function(response) {
                cache[name] = response;
                session.setValue(response);
                start();
            }
        });
    } else {
        session.setValue(cache[name]);
        start();
    }
}

loadProgram("paint.js");

$("#programSelect").change(function () {
    loadProgram($(this).val());
});

// TODO: preserve breakpoints on reload
// TODO: preserve code changes on reload
