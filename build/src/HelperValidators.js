"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._equals = exports._isPositive = exports._isNegative = exports._isCube = exports._isSquare = exports._isPrime = exports._isOdd = exports._isEven = exports._isInstanceOf = exports._or = exports._containsRegex = exports._containsSymbol = exports._containsLower = exports._containsUpper = exports._containsNumber = exports._oneOf = exports._decimalPoints = exports._minDecimalPoint = exports._maxDecimalPoint = exports._substring = exports._length = exports._minMaxLength = exports._maxLength = exports._minLength = exports._isArray = exports._isNumber = exports._isString = void 0;
var Helpers_1 = require("./Helpers");
var Valigators_1 = require("./Valigators");
/**
 * Checks if value is a string
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether string or not
 */
function _isString(value) {
    return typeof value === "string";
}
exports._isString = _isString;
/**
 * Checks if value is a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether number or not
 */
function _isNumber(value) {
    return typeof value === "number";
}
exports._isNumber = _isNumber;
function _isArray(value) {
    return Array.isArray(value);
}
exports._isArray = _isArray;
/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
function _minLength(min, value) {
    if (_isArray(value)) {
        return value.length >= min;
    }
    else {
        return value.toString().length >= min;
    }
}
exports._minLength = _minLength;
/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
function _maxLength(max, value) {
    if (_isArray(value)) {
        return value.length <= max;
    }
    else {
        return value.toString().length <= max;
    }
}
exports._maxLength = _maxLength;
/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
function _minMaxLength(min, max, value) {
    if (_isArray(value)) {
        return value.length >= min && value.length <= max;
    }
    else {
        return value.toString().length >= min && value.toString().length <= max;
    }
}
exports._minMaxLength = _minMaxLength;
/**
 * Checks whether a value converted to a string has a specific length
 * @param n Length
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
function _length(n, value) {
    if (_isArray(value)) {
        return value.length === n;
    }
    else {
        return value.toString().length === n;
    }
}
exports._length = _length;
/**
 * Checks whether a value converted to a string contains a specific substring inner
 * @param inner Substring to check for (converted to string)
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether it contains substring
 */
function _substring(inner, value) {
    return value.toString().includes(inner.toString());
}
exports._substring = _substring;
/**
 * Checks whether a number has less than or equal to a specified number of decimal points
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
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
 * @returns {boolean} Boolean value representing has correct decimal points
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
 * @returns {boolean} Boolean value representing has correct decimal points
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
 * @returns {boolean} Boolean representing whether the value matches one of the elems
 */
function _oneOf(elems, value) {
    return elems.includes(value);
}
exports._oneOf = _oneOf;
/**
 * Checks whether the value converted to string contains a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a number
 */
function _containsNumber(value) {
    if (value instanceof Array || Valigators_1.isNumber(value) || Valigators_1.isString(value)) {
        return /\d/.test(value.toString());
    }
    return false;
}
exports._containsNumber = _containsNumber;
/**
 * Checks whether the value converted to string contains an upper case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an upper case character
 */
function _containsUpper(value) {
    if (value instanceof Array || Valigators_1.isNumber(value) || Valigators_1.isString(value)) {
        return /[A-Z]/.test(value.toString());
    }
    return false;
}
exports._containsUpper = _containsUpper;
/**
 * Checks whether the value converted to string contains an lower case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an lower case character
 */
function _containsLower(value) {
    if (value instanceof Array || Valigators_1.isNumber(value) || Valigators_1.isString(value)) {
        return /[a-z]/.test(value.toString());
    }
    return false;
}
exports._containsLower = _containsLower;
/**
 * Checks whether the value converted to string contains a symbol
 * With arrays it will check that any of the values contain a symbol
 *
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a symbol
 */
function _containsSymbol(value) {
    if (Valigators_1.isNumber(value) || Valigators_1.isString(value)) {
        return /[\[\]|\\/~^:,;?!&%$@\*\+\-\_#}{<>.=_\)\(£]/.test(value.toString());
    }
    if (value instanceof Array) {
        return value.some(function (val) {
            return /[\[\]|\\/~^:,;?!&%$@\*\+\-\_#}{<>.=_\)\(£]/.test(val.toString());
        });
    }
    return false;
}
exports._containsSymbol = _containsSymbol;
/**
 * Checks whether the value converted to string contains a specified regex
 * With arrays it will check that any of the values match the regex
 *
 * @param reg Regex to test
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a specified regex
 */
function _containsRegex(reg, value) {
    if (Valigators_1.isNumber(value) || Valigators_1.isString(value)) {
        return reg.test(value.toString());
    }
    if (value instanceof Array) {
        return value.some(function (val) { return reg.test(value.toString()); });
    }
    return false;
}
exports._containsRegex = _containsRegex;
/**
 * Used if you you don't mind if some of the validators fail as long as one passes
 *
 * @param validators Functions to run
 * @param value Value to check
 * @returns {boolean} Boolean value if one of the functions passes
 */
function _or(validators, value) {
    console.log("res: ", Helpers_1.run(validators[0])(value));
    return validators.some(function (validator) { return Helpers_1.run(validator)(value); });
}
exports._or = _or;
/**
 * Tests the presence of constructor.prototype in object's prototype chain
 * @param typeClass function to test against
 * @param value Object to test
 * @returns {boolean} Boolean
 */
function _isInstanceOf(typeClass, value) {
    return value instanceof typeClass;
}
exports._isInstanceOf = _isInstanceOf;
/**
 * Checks whether a value is a number and whether that number is even
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a even or not
 */
function _isEven(value) {
    if (_isNumber(value)) {
        if (value === 0) {
            return false;
        }
        return value % 2 === 0;
    }
    return false;
}
exports._isEven = _isEven;
/**
 * Checks whether a value is a number and whether that number is odd
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a odd or not
 */
function _isOdd(value) {
    if (!_isNumber(value)) {
        return false;
    }
    if (value === 0 || value < 0) {
        return false;
    }
    return !_isEven(value);
}
exports._isOdd = _isOdd;
/**
 * Checks whether a value is a number and whether that number is prime
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
function _isPrime(value) {
    if (_isNumber(value)) {
        if (value <= 1) {
            return false;
        }
        if (value <= 3) {
            return true;
        }
        if (value % 2 === 0 || value % 3 === 0) {
            return false;
        }
        var i = 5;
        while (i * i <= value) {
            if (value % i === 0 || value % (i + 2) === 0) {
                return false;
            }
            i += 6;
        }
        return true;
    }
    return false;
}
exports._isPrime = _isPrime;
/**
 * Checks whether a value is a number and whether that number is a square number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
function _isSquare(value) {
    if (_isNumber(value)) {
        return value > 0 && Math.sqrt(value) % 1 === 0;
    }
    return false;
}
exports._isSquare = _isSquare;
/**
 * Checks whether a value is a number and whether that number is a cube number
 *
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a cube or not
 */
function _isCube(value) {
    if (_isNumber(value)) {
        var start = 1;
        var end = value;
        while (start <= end) {
            var mid = Math.floor((start + end) / 2);
            if (mid * mid * mid === value) {
                return true;
            }
            if (mid * mid * mid < value) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
    }
    return false;
}
exports._isCube = _isCube;
/**
 * Checks whether a value is a number and whether that number is a negative number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a negative number or not
 */
function _isNegative(value) {
    if (_isNumber(value)) {
        return value < 0;
    }
    return false;
}
exports._isNegative = _isNegative;
/**
 * Checks whether a value is a number and whether that number is a positive number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a positive number or not
 */
function _isPositive(value) {
    if (_isNumber(value)) {
        return value > 0;
    }
    return false;
}
exports._isPositive = _isPositive;
/**
 * Checks whether the value is equal to a specified value using ===
 * @param equal Value to check equals to
 * @param value Value to check
 * @returns {boolean} {boolean} Boolean representing if they are equal
 */
function _equals(equal, value) {
    if (typeof equal === "object" && typeof value === "object") {
        // SOURCE: https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
        var type = Object.prototype.toString.call(value);
        if (type !== Object.prototype.toString.call(equal))
            return false;
        if (["[object Array]", "[object Object]"].indexOf(type) < 0)
            return false;
        var valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
        var otherLen = type === "[object Array]" ? equal.length : Object.keys(equal).length;
        if (valueLen !== otherLen)
            return false;
        var compare = function (item1, item2) {
            var itemType = Object.prototype.toString.call(item1);
            if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
                if (!_equals(item1, item2))
                    return false;
            }
            else {
                if (itemType !== Object.prototype.toString.call(item2))
                    return false;
                if (itemType === "[object Function]") {
                    if (item1.toString() !== item2.toString())
                        return false;
                }
                else {
                    if (item1 !== item2)
                        return false;
                }
            }
        };
        if (type === "[object Array]") {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], equal[i]) === false)
                    return false;
            }
        }
        else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], equal[key]) === false)
                        return false;
                }
            }
        }
        // If nothing failed, return true
        return true;
    }
    return equal === value;
}
exports._equals = _equals;
