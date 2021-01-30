"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = exports.getDecimalPoints = void 0;
/**
 * Helper function to get the number of decimal points of a number
 * @param value Value to get
 * @returns Number of decimal points number has
 */
function getDecimalPoints(value) {
    var index = value.toString().indexOf(".");
    return index === -1 ? 0 : value.toString().length - index - 1;
}
exports.getDecimalPoints = getDecimalPoints;
/**
 * See: https://codeburst.io/perpetual-currying-in-javascript-5ae1c749adc5 for good explanation of this function and currying
 * @param fn Function to curry
 * @returns Curried function
 */
var curry = function (fn) {
    var innerFn = function (N, args) {
        return function () {
            var x = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                x[_i] = arguments[_i];
            }
            if (N <= x.length) {
                return fn.apply(void 0, __spreadArrays(args, x));
            }
            return innerFn(N - x.length, __spreadArrays(args, x));
        };
    };
    return innerFn(fn.length, []);
};
exports.curry = curry;
