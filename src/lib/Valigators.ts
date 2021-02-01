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

import { curry, run } from "./Helpers";
import {
    _containsLower,
    _containsNumber,
    _containsRegex,
    _containsSymbol,
    _containsUpper,
    _decimalPoints,
    _isArray,
    _isInstanceOf,
    _isNumber,
    _isString,
    _length,
    _maxDecimalPoint,
    _maxLength,
    _minDecimalPoint,
    _minLength,
    _minMaxLength,
    _oneOf,
    _or,
    _substring,
    _isEven,
    _isOdd,
    _isPrime,
    _isSquare,
    _isNegative,
    _isPositive,
    _isCube,
    _equals,
    _isBoolean,
    _isNull,
} from "./HelperValidators";

import { TValidator, TTypes, TOptions, TShape, TMsg } from "./Valigators.types";

export const isString: TValidator = run(_isString);
export const isNumber: TValidator = run(_isNumber);
export const isArray: TValidator = run(_isArray);
export const isBoolean: TValidator = run(_isBoolean);
export const isNull: TValidator = run(_isNull);
export const minLength: TValidator = run(curry(_minLength));
export const maxLength: TValidator = run(curry(_maxLength));
export const minMaxLength: TValidator = run(curry(_minMaxLength));
export const length: TValidator = run(curry(_length));
export const substring: TValidator = run(curry(_substring));
export const maxDecimalPoint: TValidator = run(curry(_maxDecimalPoint));
export const minDecimalPoint: TValidator = run(curry(_minDecimalPoint));
export const decimalPoints: TValidator = run(curry(_decimalPoints));
export const oneOf: TValidator = run(curry(_oneOf));
export const containsNumber: TValidator = run(_containsNumber);
export const containsUpper: TValidator = run(_containsUpper);
export const containsLower: TValidator = run(_containsLower);
export const containsSymbol: TValidator = run(_containsSymbol);
export const containsRegex: TValidator = run(curry(_containsRegex));
export const or: TValidator = run(curry(_or));
export const isInstanceOf: TValidator = run(curry(_isInstanceOf));
export const isEven: TValidator = run(curry(_isEven));
export const isOdd: TValidator = run(curry(_isOdd));
export const isPrime: TValidator = run(curry(_isPrime));
export const isSquare: TValidator = run(curry(_isSquare));
export const isCube: TValidator = run(curry(_isCube));
export const isNegative: TValidator = run(curry(_isNegative));
export const isPositive: TValidator = run(curry(_isPositive));
export const equals: TValidator = run(curry(_equals));

export function customValidator<T extends (...args: unknown[]) => boolean>(
    func: T
): TValidator {
    return run(curry(func));
}

/**
 * Valigator class is used to check that some data matches some specified shape
 */
export class Valigator {
    private types: { [key: string]: TTypes } = {
        text: {
            validators: [isString],
        },
        number: {
            validators: [isNumber],
        },
        array: {
            validators: [isArray],
        },
        boolean: {
            validators: [isBoolean],
        },
        null: {
            validators: [isNull],
        },
    };

    private messages: {
        invalidValue: string;
        unexpectedValue: string;
        required: string;
    } = {
        invalidValue: "Invalid value for data",
        unexpectedValue: "Value you provided is unexpected",
        required: "Value is required but is missing",
    };

    private keys: {
        success: string;
        message: string;
        type: string;
        required: string;
        validators: string;
    } = {
        success: "success",
        message: "message",
        type: "type",
        required: "required",
        validators: "validators",
    };

    /**
     * Valigator constructor
     * @param options Optional settings
     */
    constructor(options?: TOptions) {
        if (options) {
            if (options.messages) {
                if (options.messages.invalidValue) {
                    this.messages.invalidValue = options.messages.invalidValue;
                }
                if (options.messages.unexpectedValue) {
                    this.messages.unexpectedValue =
                        options.messages.unexpectedValue;
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
                for (const key in options.types) {
                    console.log(options.types[key]);
                    if (
                        Object.keys(options.types[key]).length === 1 &&
                        options.types[key].validators
                    ) {
                        if (!options.types[key].validators) {
                            throw Error(
                                "Types need to have an array of validators"
                            );
                        } else {
                            this.types[key] = options.types[key];
                        }
                    }
                }
            }

            console.log(this.types);
        }
    }

    private isType(val: string): boolean {
        return this.types[val] !== undefined;
    }

    /**
     * Method checks whether a value is an object and if it has correct type key
     * @param val Value to check
     * @returns Boolean representing whether validation passed
     */
    private isShape(val: unknown): boolean {
        if (val instanceof Object) {
            if (val[this.keys.type] !== undefined) {
                if (typeof val[this.keys.type] === "string") {
                    if (this.isType(val[this.keys.type])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Method checks that the shape matches this structure:
     *    shape = {
     *       type: string | foo: shape
     *    }
     * @param obj Object to check
     * @returns Boolean representing whether validation passed
     */
    private checkShapeObject<T>(obj: T): boolean {
        if (typeof obj !== "object") {
            return false;
        }

        if (!this.isShape(obj)) {
            for (const key in obj) {
                if (!this.checkShapeObject(obj[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    private validateShape(shape: Record<string, unknown>): void {
        if (typeof shape !== "object" || Array.isArray(shape)) {
            throw Error("Invalid value for property shape");
        }
        if (!this.checkShapeObject(shape)) {
            throw Error("Invalid shape object");
        }
    }

    private runValidations(data: unknown, shape: TShape): boolean {
        const validators = (shape[
            this.keys.validators
        ] as unknown) as TValidator[];
        // Run any user defined validators

        if (validators) {
            if (Array.isArray(validators)) {
                for (let i = 0; i < validators.length; i++) {
                    if (!validators[i](data)) {
                        return false;
                    }
                }
            }
        }

        const test = shape[this.keys.type];
        if (typeof test === "string") {
            // Now run the default validators for the type
            const defaultValidators = this.types[test].validators;
            for (let i = 0; i < defaultValidators.length; i++) {
                if (!defaultValidators[i](data)) {
                    return false;
                }
            }
        } else {
            throw Error("Invalid shape object");
        }

        return true;
    }

    private checkDataShape(data: unknown, shape: TShape): boolean {
        if (typeof data !== "object" || Array.isArray(data)) {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // Invalid data
                    return false;
                }
            } else {
                // Invalid shape
                return false;
            }
        } else {
            // Check that the number of keys in the data match the shape
            const union: string[] = Array.from(
                new Set([
                    ...Object.keys(data as Record<string, unknown>),
                    ...Object.keys(shape),
                ])
            );

            if (union.length > Object.keys(shape).length) {
                // Too many keys have been provided
                return false;
            }

            const found: string[] = [];
            // data is an object
            for (const key in data) {
                if (this.isShape(shape[key])) {
                    // Reached depth
                    if (!this.runValidations(data[key], shape[key] as TShape)) {
                        // Invalid data
                        return false;
                    }

                    found.push(key);
                } else {
                    if (!this.checkDataShape(data[key], shape[key] as TShape)) {
                        return false;
                    }
                }
            }

            const shapeRequired: string[] = Object.keys(shape)
                .filter((key) => this.isShape(shape[key]))
                .filter(
                    (key) =>
                        shape[key][this.keys.required] === undefined ||
                        shape[key][this.keys.required] === true
                );
            // console.log(found, shapeRequired, found.every(val => shapeRequired.includes(val)));

            if (!shapeRequired.every((val) => found.includes(val))) {
                return false;
            }
        }

        return true;
    }

    private buildErrorMessageObject(shape: TShape, message: string): TMsg {
        const output = {};
        for (const key in shape) {
            if (typeof shape[key] !== "object") {
                const cur = {};
                cur[this.keys.success] = false;
                cur[this.keys.message] = message;
                output[key] = cur;
            } else {
                output[key] = this.buildErrorMessageObject(
                    output[key],
                    message
                );
            }
        }

        return output;
    }

    // {
    //   name: {
    //     type: "text",
    //     validators: [minLength(1)],
    //   },
    private checkDataShapeMore(data: unknown, shape: TShape): TMsg {
        const output = {};
        if (typeof data !== "object" || Array.isArray(data)) {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // Invalid data
                    const cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.invalidValue;
                    return cur;
                } else {
                    // valid data
                    const cur = {};
                    cur[this.keys.success] = true;
                    return cur;
                }
            } else {
                // Invalid shape
                return this.buildErrorMessageObject(
                    shape,
                    this.messages.unexpectedValue
                );
            }
        } else {
            // First check that every required value in shape is in data
            for (const key in data) {
                if (Object.keys(data).includes(key)) {
                    if (this.isShape(shape[key])) {
                        // Reached depth
                        if (
                            !this.runValidations(
                                data[key],
                                shape[key] as TShape
                            )
                        ) {
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.invalidValue;

                            // Invalid data
                            output[key] = cur;
                        } else {
                            const cur = {};
                            cur[this.keys.success] = true;

                            output[key] = cur;
                        }
                    } else {
                        if (!shape[key]) {
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[
                                this.keys.message
                            ] = this.messages.unexpectedValue;
                            output[key] = cur;
                        } else {
                            output[key] = this.checkDataShapeMore(
                                data[key],
                                shape[key] as TShape
                            );
                        }
                    }
                } else {
                    if (this.isShape(shape[key])) {
                        if (
                            shape[key][this.keys.required] === undefined ||
                            shape[key][this.keys.required] === true
                        ) {
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.required;

                            output[key] = cur;
                        } else {
                            const cur = {};
                            cur[this.keys.success] = true;

                            output[key] = cur;
                        }
                    } else {
                        output[key] = this.buildErrorMessageObject(
                            shape[key] as TShape,
                            this.messages.required
                        );
                    }
                }
            }

            for (const key in data) {
                if (!output[key]) {
                    if (typeof data !== "object") {
                        output[key] = this.checkDataShapeMore(data[key], {});
                    } else {
                        const cur = {};
                        cur[this.keys.success] = false;
                        cur[this.keys.message] = this.messages.unexpectedValue;
                        output[key] = cur;
                    }
                }
            }
        }
        return output;
    }

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
    public validate(data: unknown, shape: TShape): boolean {
        this.validateShape(shape);
        return this.checkDataShape(data, shape);
    }

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
    public validate_more(data: unknown, shape: TShape): TMsg {
        this.validateShape(shape);
        const res = this.checkDataShapeMore(data, shape);

        return res;
    }
}

// const val = new Valigator();

// let test = curry<boolean>(_minLength)(1);
// const data = { example: "sdf" };
// const shape: TShape = {
//     example: {
//         example: {
//             type: "text",
//             validators: [minLength(1)],
//         },
//     },
// };
// console.log(val.validate_more(data, shape));

// let test2: boolean = minLength(1);
// console.log(test);
