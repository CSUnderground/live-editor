/**
 * Re-implementations of Array.prototype functional programming methods
 * that accept generators and are generators themselves so that they can
 * be used with the debugger.
 */

var map = function *(callback, _this) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(yield {
            value: callback.call(this, this[i], i, _this),
            stepInAgain: true   // non user code call site
        });
    }
    return result;
};

var reduce = function *(callback, initialValue) {
    var start = 0;
    if (arguments.length === 1) {
        start = 1;
        if (this.length === 0) {
            throw new TypeError("empty array and no initial value");
        }
        initialValue = this[0]; 
    }
    var result = initialValue;
    for (var i = start; i < this.length; i++) {
        result = yield {
            value: callback.call(this, result, this[i], i, this)
        };
    }
    return result;
};

var reduceRight = function *(callback, initialValue) {
    var start = this.length - 1;
    if (arguments.length === 1) {
        start = this.length - 2;
        if (this.length === 0) {
            throw new TypeError("empty array and no initial value")
        }
        initialValue = this[this.length - 1];
    }
    var result = initialValue;
    for (var i = start; i > -1; i--) {
        result = yield {
            value: callback.call(this, result, this[i], i, this)
        };
    }
    return result;
};

var filter = function *(callback, _this) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        var cond = yield {
            value: callback.call(this, value, i, _this)
        };
        if (cond) {
            result.push(value);
        }
    }
    return result;
};

var forEach = function *(callback, _this) {
    for (var i = 0; i < this.length; i++) {
        yield {
            value: callback.call(this, this[i], i, _this)
        };
    }
};

var every = function *(callback, _this) {
    for (var i = 0; i < this.length; i++) {
        var cond = yield {
            value: callback.call(this, this[i], i, _this)
        };
        if (!cond) {
            return false;
        }
    }
    return true;
};

var some = function *(callback, _this) {
    for (var i = 0; i < this.length; i++) {
        var cond = yield {
            value: callback.call(this, this[i], i, _this)
        };
        if (cond) {
            return true;
        }
    }
    return false;
};

exports.map = map;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.filter = filter;
exports.forEach = forEach;
exports.every = every;
exports.some = some;
