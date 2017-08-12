/*global describe, it, beforeEach, afterEach */

[false, true].forEach(function (nativeGenerators) {
    var title = nativeGenerators ?
        "Processing Debugger (Native Generators)" :
        "Processing Debugger (Regenerator Generators)";

    describe(title, function () {

        var _debugger, context;

        beforeEach(function () {
            fill = sinon.stub();
            rect = sinon.stub();
            print = sinon.stub();
            image = sinon.stub();   // defined as a global by mocha

            context = {
                fill: fill,
                rect: rect,
                x: 0,
                y: 0,
                p: null,
                numbers: [],
                print: print,
                Vector: function (x, y) {
                    this.x = x;
                    this.y = y;
                },
                image: image,
                draw: null,
                mouseClicked: null
            };

            _debugger = new ProcessingDebugger({
                nativeGenerators: nativeGenerators,
                //debug: true
            });
            _debugger.context = context;
        });

        describe("Recurring Tasks (draw)", function () {
            it("should run 'draw' if defined", function (done) {
                var code = getFunctionBody(function () {
                    draw = function () {
                        console.log("draw");
                        x = 5;
                        y = 10;
                    };
                });

                _debugger.load(code);

                var check = function () {
                    if (context.x === 5 && context.y === 10) {
                        expect(context.x).to.be(5);
                        expect(context.y).to.be(10);

                        _debugger.stop();
                        done();
                    } else {
                        setTimeout(check, 50);
                    }
                };

                _debugger.start();

                check();
            });

            it("should run 'draw' until stopped", function (done) {
                var code = getFunctionBody(function () {
                    draw = function () {
                        x = x + 1;
                        y = y + 1;
                    };
                });

                _debugger.load(code);

                var check = function () {
                    if (context.x > 3) {
                        expect(context.x > 3).to.be(true);
                        var x = context.x;

                        _debugger.stop();

                        setTimeout(function () {
                            expect(context.x).to.be(x);

                            done();
                        }, 75);
                    } else {
                        setTimeout(check, 75);
                    }
                };

                _debugger.start();

                check();
            });

            it("should pause on breakpoints in 'draw' multiple times", function (done) {
                var code = getFunctionBody(function () {
                    draw = function () {
                        fill(255, 0, 0);
                        rect(100, 200, 50, 50);
                        console.log("inside 'draw'");
                    };
                    console.log("hello");
                });

                _debugger.load(code);

                _debugger.setBreakpoint(2);
                _debugger.start();

                setTimeout(function () {
                    expect(context.fill.callCount).to.be(0);
                    expect(context.rect.callCount).to.be(0);

                    _debugger.stepOut();

                    expect(context.fill.callCount).to.be(1);
                    expect(context.rect.callCount).to.be(1);

                    setTimeout(function () {
                        _debugger.stepOut();

                        expect(context.fill.callCount).to.be(2);
                        expect(context.rect.callCount).to.be(2);

                        _debugger.stop();

                        done();
                    }, 50);
                }, 50);
            });

            it("should stop calling the old 'draw'", function (done) {
                var fillCount = 0;

                var code1 = getFunctionBody(function () {
                    draw = function () {
                        fill(255, 0, 0);
                    };
                });

                var code2 = getFunctionBody(function () {
                    draw = function () {
                        rect(100, 200, 50, 50);
                    };
                });

                _debugger.load(code1);
                _debugger.start();

                setTimeout(function () {
                    fillCount = context.fill.callCount;
                    _debugger.stop();

                    expect(context.fill.callCount).to.be.greaterThan(3);

                    _debugger.load(code2);
                    _debugger.start();

                    setTimeout(function () {
                        _debugger.stop();

                        // we don't expect fill to be call any more
                        expect(context.fill.callCount).to.be(fillCount);
                        done();
                    }, 100);
                }, 100);
            });
        });

        describe("Event Handlers", function () {
            it("should run 'mouseClicked' if defined when the mouse is clicked", function (done) {
                var code = getFunctionBody(function () {
                    mouseClicked = function () {
                        x = 5;
                        y = 10;
                    };
                });

                _debugger.load(code);
                _debugger.start();

                context.mouseClicked();
                setTimeout(function () {
                    expect(context.x).to.be(5);
                    expect(context.y).to.be(10);
                    done();
                }, 50);
            });

            it("should replace 'mouseClicked' with a new event handler", function (done) {
                var code1 = getFunctionBody(function () {
                    mouseClicked = function () {
                        x = 5;
                    };
                });

                var code2 = getFunctionBody(function () {
                    mouseClicked = function () {
                        y = 10;
                    };
                });

                _debugger.load(code1);
                _debugger.start();

                context.mouseClicked();
                setTimeout(function () {
                    expect(context.x).to.be(5);
                    expect(context.y).to.be(0);

                    context.x = 0;  // reset x

                    _debugger.load(code2);
                    _debugger.start();

                    context.mouseClicked();

                    setTimeout(function () {
                        expect(context.x).to.be(0);
                        expect(context.y).to.be(10);

                        done();
                    }, 50);
                }, 50);
            });

            it("should clear 'mouseClicked' if the new program doesn't have one", function (done) {
                var code1 = getFunctionBody(function () {
                    mouseClicked = function () {
                        x = 5;
                    };
                });

                var code2 = getFunctionBody(function () {
                    x = 0;
                });

                _debugger.load(code1);
                _debugger.start();

                var emptyFunction = "functionemptyFunction(){}";

                context.mouseClicked();
                setTimeout(function () {
                    expect(context.x).to.be(5);
                    expect(context.y).to.be(0);

                    _debugger.load(code2);
                    _debugger.start();

                    expect(context.mouseClicked.toString().replace(/\s/g, "").replace(/"usestrict";/g, "")).to.be(emptyFunction);

                    done();
                }, 50);
            });
        });

        describe("Callbacks", function () {
            it("should pass constructor, constructor name, constructed object, and args to onNewObject callback", function () {
                var debugr;

                function getImage(name) {
                    return name;
                }

                var context = {
                    //PJSOutput: PJSOutput,
                    getImage: getImage,
                    tiles: []
                };

                var code = getFunctionBody(function () {
                    var Tile = function (pic) {
                        this.pic = pic;
                    };

                    Tile.prototype.drawFaceUp = function () {
                        image(this.pic, 10, 10);
                    };

                    var tiles = [];
                    tiles.push(new Tile(getImage("creatures/Winston")));

                    var draw = function () {
                        tiles[0].drawFaceUp();
                    };
                });

                debugr = new ProcessingDebugger({context: context});
                debugr.onNewObject = sinon.stub();
                debugr.load(code);
                debugr.start();

                expect(context.tiles[0].pic).to.be("creatures/Winston");
                expect(debugr.onNewObject.called).to.be(true);

                var args = debugr.onNewObject.getCall(0).args;
                expect(args[1]).to.be("Tile");
                expect(args[2].pic).to.be("creatures/Winston");
                expect(args[3][0]).to.be("creatures/Winston");
            });
        });
    });
});
