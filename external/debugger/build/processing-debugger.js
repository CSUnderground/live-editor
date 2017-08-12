!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ProcessingDebugger=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

/*global Debugger */
// defining Debugger as a global instead of requiring it so that we can test it
// independently of ProcessingDebugger

function emptyFunction() {}

var events = ["mouseClicked", "mouseDragged", "mousePressed", "mouseMoved", "mouseReleased", "mouseOver", "mouseOut", "keyPressed", "keyReleased", "keyTyped"];

var ProcessingDebugger = (function (Debugger) {
  var ProcessingDebugger = function ProcessingDebugger(options) {
    Debugger.call(this, options);
    this._repeater = null;
  };

  _extends(ProcessingDebugger, Debugger);

  ProcessingDebugger.prototype.stop = function () {
    Debugger.prototype.stop.call(this);
    this._repeater.stop();
  };

  ProcessingDebugger.prototype.onMainStart = function () {
    var _this = this;
    if (this._repeater) {
      this._repeater.stop();
    }

    // reset all event handlers
    // TODO: write a test for this
    events.forEach(function (event) {
      return _this.context[event] = emptyFunction;
    });

    // reset draw
    this.context.draw = emptyFunction;
  };

  ProcessingDebugger.prototype.onMainDone = function () {
    var _this2 = this;
    var draw = this.context.draw;

    if (draw !== emptyFunction) {
      this._repeater = this.scheduler.createRepeater(function () {
        return _this2._createStepper(draw());
      }, 1000 / 60);
      this._repeater.start();
    }

    events.forEach(function (name) {
      var eventHandler = _this2.context[name];

      if (_isGeneratorFunction(eventHandler)) {
        if (name === "keyTyped") {
          _this2.context.keyCode = 0; // preserve existing behaviour
        }

        _this2.context[name] = function () {
          _this2.queueGenerator(eventHandler);
        };
      }
    });
  };

  return ProcessingDebugger;
})(Debugger);

function _isGeneratorFunction(value) {
  return value && Object.getPrototypeOf(value).constructor.name === "GeneratorFunction";
}

module.exports = ProcessingDebugger;

},{}]},{},[1])(1)
});