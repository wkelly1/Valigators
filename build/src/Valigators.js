"use strict";
/*
Whats the point of this?
 - Data validation is annoying and I don't like doing it
 - I wanted a library where you give it some data and you say what shape the data should be and it tells you if its correct or not

data = {
    name: "test",
    email: "example@example.com"
    phone: "038486265"
}
shape = {
    name: {type: "text", validators: [maxLength(2), minLength(10), allowedReg(""), bannedReg()]},
    email: {type: "email", validators: []}
    phone: {type: "numAsText", validators: []}
}
-- Shape with nested objects
shape = {
    name: {
        type: "text", // type value always required
        validators: [maxLength(2), minLength(10), allowedReg(""), bannedReg()] // Defines any additional validations
    },
    email: {type: "email", validators: []}
    numbers: {
        work: {
            type: "phone"
        },
        home: {
            type: "phone"
        }
    }
}


*** Takes data and its shape and returns a boolean whether it passed or not
validate(data, shape)

*** Takes data and its shape and returns an object specifying what passed, what failed
validate_more(data, shape)

*** Takes data, its shape and two call back methods that run when it finds error data
validate_callback(data, shape, onError, onSuccess?)
- onError -> (error) => {}

*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valigator = exports.customValidator = exports.equals = exports.isPositive = exports.isNegative = exports.isCube = exports.isSquare = exports.isPrime = exports.isOdd = exports.isEven = exports.isInstanceOf = exports.or = exports.containsRegex = exports.containsSymbol = exports.containsLower = exports.containsUpper = exports.containsNumber = exports.oneOf = exports.decimalPoints = exports.minDecimalPoint = exports.maxDecimalPoint = exports.substring = exports.length = exports.minMaxLength = exports.maxLength = exports.minLength = exports.isArray = exports.isNumber = exports.isString = void 0;
var Helpers_1 = require("./Helpers");
var HelperValidators_1 = require("./HelperValidators");
exports.isString = Helpers_1.run(HelperValidators_1._isString);
exports.isNumber = Helpers_1.run(HelperValidators_1._isNumber);
exports.isArray = Helpers_1.run(HelperValidators_1._isArray);
exports.minLength = Helpers_1.run(Helpers_1.curry(HelperValidators_1._minLength));
exports.maxLength = Helpers_1.run(Helpers_1.curry(HelperValidators_1._maxLength));
exports.minMaxLength = Helpers_1.run(Helpers_1.curry(HelperValidators_1._minMaxLength));
exports.length = Helpers_1.run(Helpers_1.curry(HelperValidators_1._length));
exports.substring = Helpers_1.run(Helpers_1.curry(HelperValidators_1._substring));
exports.maxDecimalPoint = Helpers_1.run(Helpers_1.curry(HelperValidators_1._maxDecimalPoint));
exports.minDecimalPoint = Helpers_1.run(Helpers_1.curry(HelperValidators_1._minDecimalPoint));
exports.decimalPoints = Helpers_1.run(Helpers_1.curry(HelperValidators_1._decimalPoints));
exports.oneOf = Helpers_1.run(Helpers_1.curry(HelperValidators_1._oneOf));
exports.containsNumber = Helpers_1.run(HelperValidators_1._containsNumber);
exports.containsUpper = Helpers_1.run(HelperValidators_1._containsUpper);
exports.containsLower = Helpers_1.run(HelperValidators_1._containsLower);
exports.containsSymbol = Helpers_1.run(HelperValidators_1._containsSymbol);
exports.containsRegex = Helpers_1.run(Helpers_1.curry(HelperValidators_1._containsRegex));
exports.or = Helpers_1.run(Helpers_1.curry(HelperValidators_1._or));
exports.isInstanceOf = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isInstanceOf));
exports.isEven = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isEven));
exports.isOdd = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isOdd));
exports.isPrime = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isPrime));
exports.isSquare = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isSquare));
exports.isCube = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isCube));
exports.isNegative = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isNegative));
exports.isPositive = Helpers_1.run(Helpers_1.curry(HelperValidators_1._isPositive));
exports.equals = Helpers_1.run(Helpers_1.curry(HelperValidators_1._equals));
function customValidator(func) {
    return Helpers_1.run(Helpers_1.curry(func));
}
exports.customValidator = customValidator;
/**
 * Valigator class is used to check that some data matches some specified shape
 */
var Valigator = /** @class */ (function () {
    function Valigator(options) {
        this.types = {
            text: {
                validators: [exports.isString],
            },
            number: {
                validators: [exports.isNumber],
            },
            array: {
                validators: [exports.isArray],
            },
        };
        this.messages = {
            invalidValue: "Invalid value for data",
            unexpectedValue: "Value you provided is unexpected",
            required: "Value is required but is missing",
        };
        this.keys = {
            success: "success",
            message: "message",
            type: "type",
            required: "required",
            validators: "validators",
        };
        if (options) {
            if (options.messages) {
                if (options.messages.invalidValue) {
                    this.messages.invalidValue = options.messages.invalidValue;
                }
                if (options.messages.unexpectedValue) {
                    this.messages.unexpectedValue = options.messages.unexpectedValue;
                }
                if (options.messages.required) {
                    this.messages.required = options.messages.required;
                }
            }
            if (options.keys) {
                if (options.keys.success) {
                    this.keys.success = options.keys.success;
                }
                if (options.keys.message) {
                    this.keys.message = options.keys.message;
                }
                if (options.keys.type) {
                    this.keys.type = options.keys.type;
                }
                if (options.keys.required) {
                    this.keys.required = options.keys.required;
                }
                if (options.keys.validators) {
                    this.keys.validators = options.keys.validators;
                }
            }
            if (options.types) {
                for (var key in options.types) {
                    console.log(options.types[key]);
                    if (Object.keys(options.types[key]).length === 1 &&
                        options.types[key].validators) {
                        this.types[key] = options.types[key];
                    }
                }
            }
            console.log(this.types);
        }
    }
    Valigator.prototype.isType = function (val) {
        return this.types[val] !== undefined;
    };
    /**
     * Method checks whether a value is an object and if it has correct type key
     * @param val Value to check
     * @returns Boolean representing whether validation passed
     */
    Valigator.prototype.isShape = function (val) {
        if (typeof val === "object") {
            if (val[this.keys.type] !== undefined) {
                if (typeof val[this.keys.type] === "string") {
                    if (this.isType(val[this.keys.type])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * Method checks that the shape matches this structure:
     *    shape = {
     *       type: string | foo: shape
     *    }
     * @param obj Object to check
     * @returns Boolean representing whether validation passed
     */
    Valigator.prototype.checkShapeObject = function (obj) {
        if (typeof obj !== "object") {
            return false;
        }
        if (!this.isShape(obj)) {
            for (var key in obj) {
                if (!this.checkShapeObject(obj[key])) {
                    return false;
                }
            }
        }
        return true;
    };
    Valigator.prototype.validateShape = function (shape) {
        if (typeof shape !== "object" || Array.isArray(shape)) {
            throw Error("Invalid value for property shape");
        }
        if (!this.checkShapeObject(shape)) {
            throw Error("Invalid shape object");
        }
    };
    Valigator.prototype.runValidations = function (data, shape) {
        // Run any user defined validators
        var validators = shape[this.keys.validators];
        if (validators) {
            if (Array.isArray(validators)) {
                for (var i = 0; i < validators.length; i++) {
                    if (!validators[i](data)) {
                        return false;
                    }
                }
            }
        }
        // Now run the default validators for the type
        var defaultValidators = this.types[shape[this.keys.type]].validators;
        for (var i = 0; i < defaultValidators.length; i++) {
            if (!defaultValidators[i](data)) {
                return false;
            }
        }
        return true;
    };
    Valigator.prototype.checkDataShape = function (data, shape) {
        var _this = this;
        if (typeof data !== "object" || Array.isArray(data)) {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // Invalid data
                    return false;
                }
            }
            else {
                // Invalid shape
                return false;
            }
        }
        else {
            // Check that the number of keys in the data match the shape
            var union = Array.from(new Set(__spreadArrays(Object.keys(data), Object.keys(shape))));
            if (union.length > Object.keys(shape).length) {
                // Too many keys have been provided
                return false;
            }
            var found_1 = [];
            // data is an object
            for (var key in data) {
                if (this.isShape(shape[key])) {
                    // Reached depth
                    if (!this.runValidations(data[key], shape[key])) {
                        // Invalid data
                        return false;
                    }
                    found_1.push(key);
                }
                else {
                    if (!this.checkDataShape(data[key], shape[key])) {
                        return false;
                    }
                }
            }
            var shapeRequired = Object.keys(shape)
                .filter(function (key) { return _this.isShape(shape[key]); })
                .filter(function (key) {
                return shape[key][_this.keys.required] === undefined ||
                    shape[key][_this.keys.required] === true;
            });
            // console.log(found, shapeRequired, found.every(val => shapeRequired.includes(val)));
            if (!shapeRequired.every(function (val) { return found_1.includes(val); })) {
                return false;
            }
        }
        return true;
    };
    Valigator.prototype.buildErrorMessageObject = function (shape, message) {
        var output = {};
        for (var key in shape) {
            if (typeof shape[key] !== "object") {
                var cur = {};
                cur[this.keys.success] = false;
                cur[this.keys.message] = message;
                output[key] = cur;
            }
            else {
                output[key] = this.buildErrorMessageObject(output[key], message);
            }
        }
        return output;
    };
    // {
    //   name: {
    //     type: "text",
    //     validators: [minLength(1)],
    //   },
    Valigator.prototype.checkDataShapeMore = function (data, shape) {
        var output = {};
        if (typeof data !== "object" || Array.isArray(data)) {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // Invalid data
                    var cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.invalidValue;
                    return cur;
                }
                else {
                    // valid data
                    var cur = {};
                    cur[this.keys.success] = true;
                    return cur;
                }
            }
            else {
                // Invalid shape
                return this.buildErrorMessageObject(shape, this.messages.unexpectedValue);
            }
        }
        else {
            // First check that every required value in shape is in data
            for (var key in data) {
                if (Object.keys(data).includes(key)) {
                    if (this.isShape(shape[key])) {
                        // Reached depth
                        if (!this.runValidations(data[key], shape[key])) {
                            var cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.invalidValue;
                            // Invalid data
                            output[key] = cur;
                        }
                        else {
                            var cur = {};
                            cur[this.keys.success] = true;
                            output[key] = cur;
                        }
                    }
                    else {
                        if (!shape[key]) {
                            var cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.unexpectedValue;
                            output[key] = cur;
                        }
                        else {
                            console.log(data[key], shape[key]);
                            output[key] = this.checkDataShapeMore(data[key], shape[key]);
                        }
                    }
                }
                else {
                    if (this.isShape(shape[key])) {
                        if (shape[key][this.keys.required] === undefined ||
                            shape[key][this.keys.required] === true) {
                            var cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.required;
                            output[key] = cur;
                        }
                        else {
                            var cur = {};
                            cur[this.keys.success] = true;
                            output[key] = cur;
                        }
                    }
                    else {
                        output[key] = this.buildErrorMessageObject(shape[key], this.messages.required);
                    }
                }
            }
            for (var key in data) {
                if (!output[key]) {
                    if (typeof data !== "object") {
                        output[key] = this.checkDataShapeMore(data[key], {});
                    }
                    else {
                        var cur = {};
                        cur[this.keys.success] = false;
                        cur[this.keys.message] = this.messages.unexpectedValue;
                        output[key] = cur;
                    }
                }
            }
        }
        return output;
    };
    /**
     * Checks whether some data matches a specified shape and just returns a boolean value as a result
     * @param data Data to check
     * @param shape Shape the data is supposed to match
     * @returns {Boolean} representing if data is valid or not
     * @example
     *
     * const valigator = new Valigator();
     * valigator.validate(10, {type: "number"});
     * // => true
     *
     * const valigator = new Valigator();
     * valigator.validate({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
     * // => true
     *
     * const valigator = new Valigator();
     * valigator.validate({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
     * // => true
     */
    Valigator.prototype.validate = function (data, shape) {
        this.validateShape(shape);
        return this.checkDataShape(data, shape);
    };
    /**
     * Checks whether some data matches a specified shape and returns an object containing all the places where it failed and their corresponding messages
     * @param data Data to check
     * @param shape Shape the data is supposed to match
     * @returns Object representing what passed and what failed
     * @example
     *
     * const valigator = new Valigator();
     * valigator.validate_more(10, {type: "number"});
     * // => {success: true}
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
     * // => { names: { first: { success: true }, last: { success: true } } }
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
     * // => { names: { first: { success: true }, last: { success: true } } }
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh" }}, {names: {first: {type: "number"}}});
     * // => { names: { first: { success: false, message: 'Invalid value for data' } } }
     */
    Valigator.prototype.validate_more = function (data, shape) {
        this.validateShape(shape);
        var res = this.checkDataShapeMore(data, shape);
        return res;
    };
    return Valigator;
}());
exports.Valigator = Valigator;
// let val = new Valigator();
// const data = { test: [1, 2, 3] };
// const shape = {
//   test: {
//     type: "array",
//     validators: [],
//   },
// };
// console.log(val.validate_more(data, shape));
