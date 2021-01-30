"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._containsRegex = exports._containsSymbol = exports._containsLower = exports._containsUpper = exports._containsNumber = exports._oneOf = exports._decimalPoints = exports._minDecimalPoint = exports._maxDecimalPoint = exports._substring = exports._length = exports._minMaxLength = exports._maxLength = exports._minLength = exports._isNumber = exports._isString = void 0;
var Helpers_1 = require("./Helpers");
/**
 * Checks if value is a string
 * @param value Value to check
 * @returns Boolean value representing whether string or not
 */
function _isString(value) {
    return typeof value === "string";
}
exports._isString = _isString;
/**
 * Checks if value is a number
 * @param value Value to check
 * @returns Boolean value representing whether number or not
 */
function _isNumber(value) {
    return typeof value === "number";
}
exports._isNumber = _isNumber;
/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _minLength(min, value) {
    return value.length >= min;
}
exports._minLength = _minLength;
/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _maxLength(max, value) {
    return value.length <= max;
}
exports._maxLength = _maxLength;
/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _minMaxLength(min, max, value) {
    return value.length >= min && value.length <= max;
}
exports._minMaxLength = _minMaxLength;
/**
 * Checks whether a value converted to a string has a specific length
 * @param n Length
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _length(n, value) {
    return value.toString().length === n;
}
exports._length = _length;
/**
 * Checks whether a value converted to a string contains a specific substring
 * @param inner Substring to check for
 * @param value Value to check
 * @returns Boolean value representing whether it contains substring
 */
function _substring(inner, value) {
    return value.toString().includes(inner);
}
exports._substring = _substring;
/**
 * Checks whether a number has less than or equal to a specified number of decimal points
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing has correct decimal points
 */
function _maxDecimalPoint(max, value) {
    if (_isNumber(value)) {
        return Helpers_1.getDecimalPoints(value) <= max;
    }
    else {
        return false;
    }
}
exports._maxDecimalPoint = _maxDecimalPoint;
/**
 * Checks whether a number has greater than or equal to a specified number of decimal points
 * @param min Min value
 * @param value Value to check
 * @returns Boolean value representing has correct decimal points
 */
function _minDecimalPoint(min, value) {
    if (_isNumber(value)) {
        return Helpers_1.getDecimalPoints(value) >= min;
    }
    else {
        return false;
    }
}
exports._minDecimalPoint = _minDecimalPoint;
/**
 * Checks whether a number has exactly the specified number of decimal points
 * @param n Value
 * @param value Value to check
 * @returns Boolean value representing has correct decimal points
 */
function _decimalPoints(n, value) {
    if (_isNumber(value)) {
        return Helpers_1.getDecimalPoints(value) === n;
    }
    else {
        return false;
    }
}
exports._decimalPoints = _decimalPoints;
/**
 * Takes an array and checks that the value matches on of the elements in the array
 * @param elems Elements value could be
 * @param value Value to check
 * @returns Boolean representing whether the value matches one of the elems
 */
function _oneOf(elems, value) {
    return elems.includes(value);
}
exports._oneOf = _oneOf;
/**
 * Checks whether the value converted to string contains a number
 * @param value Value to check
 * @returns Boolean value representing whether contains a number
 */
function _containsNumber(value) {
    return /\d/.test(value.toString());
}
exports._containsNumber = _containsNumber;
/**
 * Checks whether the value converted to string contains an upper case character
 * @param value Value to check
 * @returns Boolean value representing whether contains an upper case character
 */
function _containsUpper(value) {
    return /[A-Z]/.test(value.toString());
}
exports._containsUpper = _containsUpper;
/**
 * Checks whether the value converted to string contains an lower case character
 * @param value Value to check
 * @returns Boolean value representing whether contains an lower case character
 */
function _containsLower(value) {
    return /[a-z]/.test(value.toString());
}
exports._containsLower = _containsLower;
/**
 * Checks whether the value converted to string contains a symbol
 * @param value Value to check
 * @returns Boolean value representing whether contains a symbol
 */
function _containsSymbol(value) {
    return /[|\\/~^:,;?!&%$@*+]/.test(value.toString());
}
exports._containsSymbol = _containsSymbol;
/**
 * Checks whether the value converted to string contains a specified regex
 * @param reg Regex to test
 * @param value Value to check
 * @returns Boolean value representing whether contains a specified regex
 */
function _containsRegex(reg, value) {
    return reg.test(value.toString());
}
exports._containsRegex = _containsRegex;
