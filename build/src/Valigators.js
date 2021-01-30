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
exports.Valigator = exports.customValidator = exports.containsRegex = exports.containsSymbol = exports.containsLower = exports.containsUpper = exports.containsNumber = exports.oneOf = exports.decimalPoints = exports.minDecimalPoint = exports.maxDecimalPoint = exports.substring = exports.length = exports.minMaxLength = exports.maxLength = exports.minLength = exports.isNumber = exports.isString = void 0;
var Helpers_1 = require("./Helpers");
var HelperValidators_1 = require("./HelperValidators");
exports.isString = HelperValidators_1._isString;
exports.isNumber = HelperValidators_1._isNumber;
exports.minLength = Helpers_1.curry(HelperValidators_1._minLength);
exports.maxLength = Helpers_1.curry(HelperValidators_1._maxLength);
exports.minMaxLength = Helpers_1.curry(HelperValidators_1._minMaxLength);
exports.length = Helpers_1.curry(HelperValidators_1._length);
exports.substring = Helpers_1.curry(HelperValidators_1._substring);
exports.maxDecimalPoint = Helpers_1.curry(HelperValidators_1._maxDecimalPoint);
exports.minDecimalPoint = Helpers_1.curry(HelperValidators_1._minDecimalPoint);
exports.decimalPoints = Helpers_1.curry(HelperValidators_1._decimalPoints);
exports.oneOf = Helpers_1.curry(HelperValidators_1._oneOf);
exports.containsNumber = HelperValidators_1._containsNumber;
exports.containsUpper = HelperValidators_1._containsUpper;
exports.containsLower = HelperValidators_1._containsLower;
exports.containsSymbol = HelperValidators_1._containsSymbol;
exports.containsRegex = Helpers_1.curry(HelperValidators_1._containsRegex);
function customValidator(func) {
    return Helpers_1.curry(func);
}
exports.customValidator = customValidator;
var Valigator = /** @class */ (function () {
    function Valigator(options) {
        this.types = {
            text: {
                validators: [exports.isString],
            },
            number: {
                validators: [exports.isNumber],
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
    Valigator.prototype.validate = function (data, shape) {
        this.validateShape(shape);
        return this.checkDataShape(data, shape);
    };
    /**
     * Checks whether some data matches a specified shape and returns an object containing all the places where it failed and their corresponding messages
     * @param data Data to check
     * @param shape Shape the data is supposed to match
     * @returns Object representing what passed and what failed
     */
    Valigator.prototype.validate_more = function (data, shape) {
        this.validateShape(shape);
        var res = this.checkDataShapeMore(data, shape);
        return res;
    };
    return Valigator;
}());
exports.Valigator = Valigator;
// export default function test():void{
//     console.log("IT works");
// }
// Main debugging function
// function main() {
// console.log("MAIN PROCESS");
// const val = new Valigator({
//   keys: {
//     type: "test"
//   }
// });
// const data = {
//   name: "Will",
//   age: 10
// };
// const shape = {
//   name: {
//     "test": "text",
//   },
//   age: {
//     "test": "text",
//   },
// };
// const res = val.validate_more(data, shape);
// console.log(res);
//   const valigator = new Valigator();
//   const valid_data = {
//     name: "bob",
//     age: 12,
//     example: {
//       foo: "bar",
//     },
//   };
//   const invalid_data = {
//     // name: "bob" <- removed this value
//     age: 12,
//     example: {
//       foo: "bar",
//     },
//   };
//   const shape = {
//     name: {
//       type: "text", // Required attribute
//       validators: [], // Optional list is extra validators to run
//     },
//     age: {
//       type: "number",
//     },
//     example: {
//       // Works with nested objects
//       foo: {
//         type: "text",
//         required: false,
//       },
//     },
//   };
//   console.log(valigator.validate_more(invalid_data, shape));
// }
// main();
