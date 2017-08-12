[false, true].forEach(function (nativeGenerators) {
    var title = nativeGenerators ?
        "Array.prototype Runtime (Native Generators)" :
        "Array.prototype Runtime (Regenerator Generators)";

    describe(title, function () {
        
        var _debugger, context;

        var runTest = function(options) {
            it(options.title, function () {
                var code = getFunctionBody(options.code);
                _debugger.load(code);
                options.test();
            });
        };

        beforeEach(function () {
            context = {
                a: null,
                b: null,
                print: sinon.stub()
            };

            _debugger = new Debugger({
                nativeGenerators: nativeGenerators,
                context: context,
                //debug: true
            });
        });

        describe("map", function () {
            it("runs correctly with user defined functions", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    var b = a.map(function (val) {
                        return val * val;
                    });
                });

                _debugger.load(code);
                _debugger.start();

                expect(context.b[0]).to.be(1);
                expect(context.b[1]).to.be(4);
                expect(context.b[2]).to.be(9);
            });

            it("runs correctly with built-in functions", function () {
                var code = getFunctionBody(function () {
                    var a = [1,4,9];
                    var b = a.map(Math.sqrt);
                });
                
                _debugger.load(code);
                _debugger.start();

                expect(context.b[0]).to.be(1);
                expect(context.b[1]).to.be(2);
                expect(context.b[2]).to.be(3);
            });

            it("can break inside the callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    var b = a.map(function (val) {
                        return val * val;
                    });
                });

                _debugger.load(code);
                _debugger.setBreakpoint(3);
                _debugger.start();
                
                expect(_debugger.line).to.be(3);
                _debugger.resume();
                expect(_debugger.line).to.be(3);
                _debugger.resume();
                expect(_debugger.line).to.be(3);
                _debugger.resume();
            });

            it("reports scope variables inside the callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    var b = a.map(function (val) {
                        return val * val;
                    });
                });
                
                _debugger.load(code);
                _debugger.setBreakpoint(3);
                _debugger.start();

                expect(_debugger.currentScope.val).to.be(1);
                _debugger.resume();
                expect(_debugger.currentScope.val).to.be(2);
                _debugger.resume();
                expect(_debugger.currentScope.val).to.be(3);
                _debugger.resume();
            });
            
            it("should step out of the callback to the main program", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    var b = a.map(function (val) {
                        return val * val;
                    });
                    print("end of line");
                });
                
                _debugger.load(code);
                _debugger.setBreakpoint(3);
                _debugger.start();
                _debugger.stepOut();
                expect(_debugger.line).to.be(3);
                _debugger.stepOut();
                expect(_debugger.line).to.be(3);
                _debugger.stepOut();
                expect(_debugger.line).to.be(2);
                _debugger.stepOver();
                expect(_debugger.line).to.be(5);

            });
        });

        describe("reduce", function () {
            runTest({
                title: "runs correctly without an initial value",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduce(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    });
                },
                test: function () {
                    _debugger.start();

                    expect(context.b).to.be(6);
                }
            });

            runTest({
                title: "runs correctly with an initial value",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduce(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.start();
            
                    expect(context.b).to.be(6);
                }
            });
            
            runTest({
                title: "can break inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduce(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();
            
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                }
            });
            
            runTest({
                title: "reports scope variables inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduce(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();
            
                    expect(_debugger.currentScope.previousVal).to.be(0);
                    expect(_debugger.currentScope.currentVal).to.be(1);
                    _debugger.resume();
                    expect(_debugger.currentScope.previousVal).to.be(1);
                    expect(_debugger.currentScope.currentVal).to.be(2);
                    _debugger.resume();
                    expect(_debugger.currentScope.previousVal).to.be(3);
                    expect(_debugger.currentScope.currentVal).to.be(3);
                    _debugger.resume();
                }
            });
        });

        describe("reduceRight", function () {
            runTest({
                title: "runs correctly without an initial value",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduceRight(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    });
                },
                test: function () {
                    _debugger.start();

                    expect(context.b).to.be(6);
                }
            });

            runTest({
                title: "runs correctly with an initial value",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduceRight(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.start();

                    expect(context.b).to.be(6);
                }
            });

            runTest({
                title: "can break inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduceRight(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();

                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                }
            });

            runTest({
                title: "reports scope variables inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.reduceRight(function (previousVal, currentVal) {
                        return previousVal + currentVal;
                    }, 0);
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();

                    expect(_debugger.currentScope.previousVal).to.be(0);
                    expect(_debugger.currentScope.currentVal).to.be(3);
                    _debugger.resume();
                    expect(_debugger.currentScope.previousVal).to.be(3);
                    expect(_debugger.currentScope.currentVal).to.be(2);
                    _debugger.resume();
                    expect(_debugger.currentScope.previousVal).to.be(5);
                    expect(_debugger.currentScope.currentVal).to.be(1);
                    _debugger.resume();
                }
            });
        });

        describe("filter", function () {
            runTest({
                title: "runs correctly",
                code: function () {
                    var a = [1,2,3];
                    var b = a.filter(function (val) {
                        return val % 2 === 1;
                    });
                },
                test: function () {
                    _debugger.start();

                    expect(context.b[0]).to.be(1);
                    expect(context.b[1]).to.be(3);
                    expect(context.b.length).to.be(2);
                }
            });

            runTest({
                title: "can break inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.filter(function (val) {
                        return val % 2 === 1;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();

                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                    expect(_debugger.line).to.be(3);
                    _debugger.resume();
                }
            });

            runTest({
                title: "reports scope variables inside the callback",
                code: function () {
                    var a = [1,2,3];
                    var b = a.filter(function (val) {
                        return val % 2 === 1;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(3);
                    _debugger.start();

                    expect(_debugger.currentScope.val).to.be(1);
                    _debugger.resume();
                    expect(_debugger.currentScope.val).to.be(2);
                    _debugger.resume();
                    expect(_debugger.currentScope.val).to.be(3);
                    _debugger.resume();
                }
            });
        });

        describe("forEach", function () {
            it("runs correctly with a user defined callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    a.forEach(function (val) {
                        print(val)
                    });
                });
                
                _debugger.load(code);
                _debugger.start();

                expect(context.print.calledWith(1)).to.be(true);
                expect(context.print.calledWith(2)).to.be(true);
                expect(context.print.calledWith(3)).to.be(true);
                expect(context.print.callCount).to.be(3);
            });

            it("runs correctly with a built-in callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    a.forEach(print);
                });
                
                _debugger.load(code);
                _debugger.start();

                expect(context.print.calledWith(1)).to.be(true);
                expect(context.print.calledWith(2)).to.be(true);
                expect(context.print.calledWith(3)).to.be(true);
                expect(context.print.callCount).to.be(3);
            });

            it("can break inside the callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    a.forEach(function (val) {
                        print(val)
                    });
                });
                
                _debugger.load(code);
                _debugger.setBreakpoint(3);
                _debugger.start();

                expect(_debugger.line).to.be(3);
                _debugger.resume();
                expect(_debugger.line).to.be(3);
                _debugger.resume();
                expect(_debugger.line).to.be(3);
                _debugger.resume();
            });

            it("reports scope variables inside the callback", function () {
                var code = getFunctionBody(function () {
                    var a = [1,2,3];
                    a.forEach(function (val) {
                        print(val)
                    });
                });
                
                _debugger.load(code);
                _debugger.setBreakpoint(3);
                _debugger.start();

                expect(_debugger.currentScope.val).to.be(1);
                _debugger.resume();
                expect(_debugger.currentScope.val).to.be(2);
                _debugger.resume();
                expect(_debugger.currentScope.val).to.be(3);
                _debugger.resume();
            });
        });

        describe("every", function () {
            runTest({
                title: "runs correctly",
                code: function () {
                    var a = [1,2,3].every(function (val) {
                        return val > 1;
                    });
                    var b = [1,2,3].every(function (val) {
                        return val > 0;
                    });
                },
                test: function () {
                    _debugger.start();

                    expect(context.a).to.be(false);
                    expect(context.b).to.be(true);
                }
            });

            runTest({
                title: "can break inside the callback",
                code: function () {
                    var a = [1,2,3].every(function (val) {
                        return val < 2;
                    });
                    var b = [1,2,3].every(function (val) {
                        return val > 0;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(2);
                    _debugger.setBreakpoint(5);
                    _debugger.start();

                    expect(_debugger.line).to.be(2);
                    _debugger.resume();
                    expect(_debugger.line).to.be(2);
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);
                    _debugger.resume();
                }
            });

            runTest({
                title: "reports scope variables inside the callback",
                code: function () {
                    var a = [1,2,3].every(function (val) {
                        return val < 2;
                    });
                    var b = [1,2,3].every(function (val) {
                        return val > 0;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(2);
                    _debugger.start();

                    expect(_debugger.currentScope.val).to.be(1);
                    _debugger.resume();
                    expect(_debugger.currentScope.val).to.be(2);
                    _debugger.resume();
                }
            });
        });

        describe("some", function () {
            runTest({
                title: "runs correctly",
                code: function () {
                    var a = [1,2,3].some(function (val) {
                        return val > 1;
                    });
                    var b = [1,2,3].some(function (val) {
                        return val > 3;
                    });
                },
                test: function () {
                    _debugger.start();

                    expect(context.a).to.be(true);
                    expect(context.b).to.be(false);
                }
            });

            runTest({
                title: "can break inside the callback",
                code: function () {
                    var a = [1,2,3].some(function (val) {
                        return val > 1;
                    });
                    var b = [1,2,3].some(function (val) {
                        return val > 3;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(2);
                    _debugger.setBreakpoint(5);
                    _debugger.start();

                    expect(_debugger.line).to.be(2);
                    _debugger.resume();
                    expect(_debugger.line).to.be(2);
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);    // early completion
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);
                    _debugger.resume();
                    expect(_debugger.line).to.be(5);
                    _debugger.resume();
                }
            });

            runTest({
                title: "reports scope variables inside the callback",
                code: function () {
                    var a = [1,2,3].some(function (val) {
                        return val > 1;
                    });
                    var b = [1,2,3].some(function (val) {
                        return val > 3;
                    });
                },
                test: function () {
                    _debugger.setBreakpoint(2);
                    _debugger.start();

                    expect(_debugger.currentScope.val).to.be(1);
                    _debugger.resume();
                    expect(_debugger.currentScope.val).to.be(2);
                    _debugger.resume();
                }
            });
        });
    });
});