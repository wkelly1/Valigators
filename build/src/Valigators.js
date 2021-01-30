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
exports.Validate = exports.customValidator = exports.minMaxLength = exports.maxLength = exports.minLength = void 0;
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
/**
 * Checks if value is a string
 * @param value Value to check
 * @returns Boolean value representing whether string or not
 */
function _isString(value) {
    return typeof value === "string";
}
/**
 * Checks if value is a number
 * @param value Value to check
 * @returns Boolean value representing whether number or not
 */
function _isNumber(value) {
    return typeof value === "number";
}
/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _minLength(min, value) {
    return value.length >= min;
}
/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _maxLength(max, value) {
    return value.length <= max;
}
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
var isString = _isString;
var isNumber = _isNumber;
exports.minLength = curry(_minLength);
exports.maxLength = curry(_maxLength);
exports.minMaxLength = curry(_minMaxLength);
function customValidator(func) {
    return curry(func);
}
exports.customValidator = customValidator;
var Validate = /** @class */ (function () {
    function Validate(options) {
        this.types = {
            text: {
                validators: [isString],
            },
            number: {
                validators: [isNumber],
            },
        };
        this.messages = {
            invalidValue: "Invalid value for data",
            unexpectedValue: "Value is unexpected",
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
        }
    }
    Validate.prototype.isType = function (val) {
        return this.types[val] !== undefined;
    };
    /**
     * Method checks whether a value is an object and if it has correct type key
     * @param val Value to check
     * @returns Boolean representing whether validation passed
     */
    Validate.prototype.isShape = function (val) {
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
    Validate.prototype.checkShapeObject = function (obj) {
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
    Validate.prototype.validateShape = function (shape) {
        if (typeof shape !== "object" || Array.isArray(shape)) {
            throw Error("Invalid value for property shape");
        }
        if (!this.checkShapeObject(shape)) {
            throw Error("Invalid shape object");
        }
    };
    Validate.prototype.runValidations = function (data, shape) {
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
    Validate.prototype.checkDataShape = function (data, shape) {
        var _this = this;
        if (typeof data !== "object") {
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
    Validate.prototype.buildErrorMessageObject = function (shape, message) {
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
    Validate.prototype.checkDataShapeMore = function (data, shape) {
        var output = {};
        if (typeof data !== "object") {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // Invalid data
                    var cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.invalidValue;
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
            for (var key in shape) {
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
                        output[key] = this.checkDataShapeMore(data[key], shape[key]);
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
     * @returns Boolean representing if data is valid or not
     */
    Validate.prototype.validate = function (data, shape) {
        this.validateShape(shape);
        return this.checkDataShape(data, shape);
    };
    /**
     * Checks whether some data matches a specified shape and returns an object containing all the places where it failed and their corresponding messages
     * @param data Data to check
     * @param shape Shape the data is supposed to match
     * @returns Object representing what passed and what failed
     */
    Validate.prototype.validate_more = function (data, shape) {
        this.validateShape(shape);
        var res = this.checkDataShapeMore(data, shape);
        return res;
    };
    return Validate;
}());
exports.Validate = Validate;
// export default function test():void{
//     console.log("IT works");
// }
// Main debugging function
function main() {
    console.log("MAIN PROCESS");
    var val = new Validate({
        keys: {
            type: "test"
        }
    });
    var data = {
        name: "Will",
        age: 10
    };
    var shape = {
        name: {
            "test": "text",
        },
        age: {
            "test": "text",
        },
    };
    var res = val.validate_more(data, shape);
    console.log(res);
}
main();
