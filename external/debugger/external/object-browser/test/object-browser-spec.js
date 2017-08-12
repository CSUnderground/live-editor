/*global describe, beforeEach, afterEach, it */

describe("Object Browser", function () {

    var container, browser;

    beforeEach(function (done) {
        container = document.createElement("div");
        container.setAttribute("style", "position:absolute;left:0;top:0;width:400px;height:600px");
        container.setAttribute("class", "object-browser");
        document.body.appendChild(container);

        browser = new ObjectBrowser(container);
        setTimeout(function () {
            done();
        }, 10);
    });

    afterEach(function (done) {
        document.body.removeChild(container);
        setTimeout(function () {
            done();
        }, 10);
    });

    it("should display basic data types", function (done) {
        browser.object = {
            x: 5,
            y: 10,
            str: "hello",
            obj: {
                a: 1,
                b: -1
            },
            p: null,
            q: undefined
        };

        setTimeout(function () {
            var entries = Array.prototype.map.call($(".object-browser li"), function (item) {
                return $(item).text();
            });

            expect(entries[0]).to.be("x: 5");
            expect(entries[1]).to.be("y: 10");
            expect(entries[2]).to.be("str: \"hello\"");
            expect(entries[3]).to.be("▶obj: Object");
            expect(entries[4]).to.be("p: null");
            expect(entries[5]).to.be("q: undefined");

            done();
        }, 50);
    });

    it("should disclose the contents of sub-objects when clicking on a triangle", function (done) {
        browser.object = {
            x: 5,
            y: 10,
            str: "hello",
            obj: {
                x: 5,
                y: 10,
                str: "hello",
                obj: {},
                p: null,
                q: undefined
            },
            p: null,
            q: undefined
        };

        setTimeout(function () {

            var triangle = document.querySelector(".triangle");
            EventSim.simulate(triangle, "click");

            setTimeout(function () {
                expect($(".object-browser li ul:visible").length).to.be(1);

                var entries = Array.prototype.map.call($(".object-browser li ul li"), function (item) {
                    return $(item).text();
                });

                expect(entries[0]).to.be("x: 5");
                expect(entries[1]).to.be("y: 10");
                expect(entries[2]).to.be("str: \"hello\"");
                expect(entries[3]).to.be("▶obj: Object");
                expect(entries[4]).to.be("p: null");
                expect(entries[5]).to.be("q: undefined");

                done();
            }, 50);
        }, 50);
    });

    it("should hide the contents of sub-objects when clicking twice on a triangle", function (done) {
        browser.object = {
            x: 5,
            y: 10,
            str: "hello",
            obj: {
                x: 5,
                y: 10,
                str: "hello",
                obj: {},
                p: null,
                q: undefined
            },
            p: null,
            q: undefined
        };

        setTimeout(function () {
            var triangle = document.querySelector(".triangle");
            EventSim.simulate(triangle, "click");

            setTimeout(function () {
                expect($(".object-browser li ul li").length).to.be(6);
                expect($(".object-browser li ul:visible").length).to.be(1);

                EventSim.simulate(triangle, "click");

                setTimeout(function () {
                    expect($(".object-browser li ul:visible").length).to.be(0);
                    done();
                }, 50);
            }, 50);
        }, 50);
    });

    it("should not throw when .object is assigned null or undefined", function () {
        browser.object = null;
        browser.object = undefined;
    });

    describe("updating the object", function () {
        it("should keep sub-objects open", function (done) {
            browser.object = {
                x: 5,
                y: 10,
                str: "hello",
                obj: {
                    x: 5,
                    y: 10,
                    str: "hello",
                    obj: {},
                    p: null,
                    q: undefined
                },
                p: null,
                q: undefined
            };

            setTimeout(function () {

                var triangle = document.querySelector(".triangle");
                EventSim.simulate(triangle, "click");

                setTimeout(function () {
                    browser.object = {
                        x: 5,
                        y: 10,
                        str: "hello",
                        obj: {
                            x: 6,
                            y: 11,
                            str: "goodbye",
                            obj: {},
                            p: null,
                            q: undefined
                        },
                        p: null,
                        q: undefined
                    };

                    setTimeout(function () {
                        expect($(".object-browser li ul:visible").length).to.be(1);

                        var entries = Array.prototype.map.call($(".object-browser li ul li"), function (item) {
                            return $(item).text();
                        });

                        expect(entries[0]).to.be("x: 6");
                        expect(entries[1]).to.be("y: 11");
                        expect(entries[2]).to.be("str: \"goodbye\"");
                        expect(entries[3]).to.be("▶obj: Object");
                        expect(entries[4]).to.be("p: null");
                        expect(entries[5]).to.be("q: undefined");

                        done();
                    }, 50);
                }, 50);
            }, 50);
        });

        // TODO: decide on the desired behaviour
        it.skip("should keep not keep sub-objects open if they get deleted and re-added", function (done) {
            browser.object = {
                x: 5,
                y: 10,
                str: "hello",
                obj: {
                    x: 5,
                    y: 10,
                    str: "hello",
                    obj: {},
                    p: null,
                    q: undefined
                },
                p: null,
                q: undefined
            };

            setTimeout(function () {

                var triangle = document.querySelector(".triangle");
                EventSim.simulate(triangle, "click");

                setTimeout(function () {
                    browser.object = {
                        x: 5,
                        y: 10,
                        str: "hello",
                        p: null,
                        q: undefined
                    };

                    browser.object = {
                        x: 5,
                        y: 10,
                        str: "hello",
                        obj: {
                            x: 6,
                            y: 11,
                            str: "goodbye",
                            obj: {},
                            p: null,
                            q: undefined
                        },
                        p: null,
                        q: undefined
                    };

                    setTimeout(function () {
                        expect($(".object-browser li ul").length).to.be(0);

                        done();
                    }, 50);
                }, 50);
            }, 50);
        });
    });

    describe.skip("multiple object browsers", function () {
        // TODO: write some tests for these scenarios
    });

});