/*global Debugger */
// defining Debugger as a global instead of requiring it so that we can test it
// independently of ProcessingDebugger

function emptyFunction() {}

var events = [
    "mouseClicked", "mouseDragged", "mousePressed", "mouseMoved", "mouseReleased",
    "mouseOver", "mouseOut", "keyPressed", "keyReleased", "keyTyped"
];

class ProcessingDebugger extends Debugger {

    constructor(options) {
        super(options);
        this._repeater = null;
    }

    stop() {
        super.stop();
        this._repeater.stop();
    }

    onMainStart() {
        if (this._repeater) {
            this._repeater.stop();
        }

        // reset all event handlers
        // TODO: write a test for this
        events.forEach(event => this.context[event] = emptyFunction);

        // reset draw
        this.context.draw = emptyFunction;
    }

    onMainDone() {
        var draw = this.context.draw;

        if (draw !== emptyFunction) {
            this._repeater = this.scheduler.createRepeater(
                () => this._createStepper(draw()),
                1000 / 60
            );
            this._repeater.start();
        }

        events.forEach(name => {
            var eventHandler = this.context[name];

            if (_isGeneratorFunction(eventHandler)) {
                if (name === "keyTyped") {
                    this.context.keyCode = 0;    // preserve existing behaviour
                }

                this.context[name] = () => {
                    this.queueGenerator(eventHandler);
                };
            }
        });
    }
}

function _isGeneratorFunction (value) {
    return value && Object.getPrototypeOf(value).constructor.name === "GeneratorFunction";
}

module.exports = ProcessingDebugger;
