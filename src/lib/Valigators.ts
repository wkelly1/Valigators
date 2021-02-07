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

import { emailRegex } from "./Regex";
import { TValidator, TTypes, TOptions, TShape, TMsg } from "./Valigators.types";

export const isString: TValidator = run(_isString, "isString");
export const isNumber: TValidator = run(_isNumber, "isNumber");
export const isArray: TValidator = run(_isArray, "isArray");
export const isBoolean: TValidator = run(_isBoolean, "isBoolean");
export const isNull: TValidator = run(_isNull, "isNull");
export const minLength: TValidator = run(_minLength, "minLength");
export const maxLength: TValidator = run(_maxLength, "maxLength");
export const minMaxLength: TValidator = run(_minMaxLength, "minMaxLength");
export const length: TValidator = run(_length, "length");
export const substring: TValidator = run(_substring, "substring");
export const maxDecimalPoint: TValidator = run(
    _maxDecimalPoint,
    "maxDecimalPoint"
);
export const minDecimalPoint: TValidator = run(
    _minDecimalPoint,
    "minDecimalPoint"
);
export const decimalPoints: TValidator = run(_decimalPoints, "decimalPoints");
export const oneOf: TValidator = run(_oneOf, "oneOf");
export const containsNumber: TValidator = run(
    _containsNumber,
    "containsNumber"
);
export const containsUpper: TValidator = run(_containsUpper, "containsUpper");
export const containsLower: TValidator = run(_containsLower, "containsLower");
export const containsSymbol: TValidator = run(
    _containsSymbol,
    "containsSymbol"
);
export const containsRegex: TValidator = run(_containsRegex, "containsRegex");
export const or: TValidator = run(_or, "or");
export const isInstanceOf: TValidator = run(_isInstanceOf, "isInstanceOf");
export const isEven: TValidator = run(_isEven, "isEven");
export const isOdd: TValidator = run(_isOdd, "isOdd");
export const isPrime: TValidator = run(_isPrime, "isPrime");
export const isSquare: TValidator = run(_isSquare, "isSquare");
export const isCube: TValidator = run(_isCube, "isCube");
export const isNegative: TValidator = run(_isNegative, "isNegative");
export const isPositive: TValidator = run(_isPositive, "isPositive");
export const equals: TValidator = run(_equals, "equals");

export function customValidator<T extends (...args: unknown[]) => boolean>(
    func: T,
    identifier?: string
): TValidator {
    return run(func, identifier ? identifier : "");
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
        email: {
            validators: [isString, containsRegex(emailRegex)],
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
        messages: string;
        validationErrors: string;
        validator: string;
    } = {
        success: "success",
        message: "message",
        type: "type",
        required: "required",
        validators: "validators",
        messages: "messages",
        validationErrors: "validationErrors",
        validator: "validator",
    };

    private requiredValues: unknown[] = [""];
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

                if (options.keys.messages) {
                    this.keys.messages = options.keys.messages;
                }
                if (options.keys.validationErrors) {
                    this.keys.validationErrors = options.keys.validationErrors;
                }
                if (options.keys.validator) {
                    this.keys.validator = options.keys.validator;
                }
            }

            if (options.types) {
                for (const key in options.types) {
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

            if (options.requiredValues) {
                this.requiredValues = options.requiredValues;
            }
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

            if (
                !shapeRequired.every(
                    (val) =>
                        found.includes(val) &&
                        data &&
                        !this.requiredValues.includes(data[val])
                )
            ) {
                return false;
            }
        }

        return true;
    }

    private buildErrorMessageObject(shape: TShape, message: string): TMsg {
        const output = {};

        for (const key in shape) {
            if (this.isShape(shape[key])) {
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

    private getValidationMessages(
        data: unknown,
        shape: TShape
    ): { [key: string]: string }[] {
        const validators = (shape[
            this.keys.validators
        ] as unknown) as TValidator[];
        // Run any user defined validators

        let msgs: { [key: string]: string }[] = [];
        if (validators) {
            if (Array.isArray(validators)) {
                for (let i = 0; i < validators.length; i++) {
                    if (!validators[i](data)) {
                        console.log(validators[i](data));
                        if (
                            (shape[this.keys.messages] || {})[
                                validators[i]().id
                            ]
                        ) {
                            let error = {};
                            error[this.keys.validator] = validators[i]().id;
                            error[this.keys.message] =
                                shape[this.keys.messages][validators[i]().id];
                            msgs.push(error);
                        } else {
                            let error = {};
                            error[this.keys.validator] = validators[i]().id;
                            (error[
                                this.keys.message
                            ] = this.messages.invalidValue),
                                msgs.push(error);
                        }
                    }
                }
            }
        }
        return msgs;
    }

    private checkDataShapeMore(data: unknown, shape: TShape): TMsg {
        const output = {};
        if (typeof data !== "object" || Array.isArray(data)) {
            // data is some primative type; string, number etc
            if (this.isShape(shape)) {
                if (!this.runValidations(data, shape)) {
                    // let msg: string[];
                    // if (shape.messages) {
                    //     let temp: string[] = this.getValidationMessages(
                    //         data,
                    //         shape
                    //     );
                    //     if (temp.length > 0) {
                    //         msg = temp;
                    //     } else {
                    //         msg = [this.messages.invalidValue];
                    //     }
                    // } else {
                    //     msg = [this.messages.invalidValue];
                    // }

                    // // Invalid data
                    // const cur = {};
                    // cur[this.keys.success] = false;
                    // cur[this.keys.message] = msg;

                    const cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.invalidValue;

                    cur[
                        this.keys.validationErrors
                    ] = this.getValidationMessages(data, shape);

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
                            let msg: string[];

                            // if (shape[key]["messages"]) {
                            //     let temp: string[] = this.getValidationMessages(
                            //         data[key],
                            //         shape[key] as TShape
                            //     );

                            //     if (temp.length > 0) {
                            //         msg = temp;
                            //     } else {
                            //         msg = [this.messages.invalidValue];
                            //     }
                            // } else {
                            //     msg = [this.messages.invalidValue];
                            // }

                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.invalidValue;
                            cur[
                                this.keys.validationErrors
                            ] = this.getValidationMessages(
                                data[key],
                                shape[key] as TShape
                            );

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

            // Make sure every value in the shape has is checked
            for (const key in shape) {
                if (!output[key]) {
                    if (typeof data !== "object") {
                        output[key] = this.checkDataShapeMore(data[key], {});
                    } else {
                        if (
                            shape[key][this.keys.required] === true ||
                            shape[key][this.keys.required] === undefined
                        ) {
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.required;
                            output[key] = cur;
                        }
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
     * // => {success: true, values: {success: true}}
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
     * // => {success: true, values: { names: { first: { success: true }, last: { success: true } } }}
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
     * // => {success: true, values: { names: { first: { success: true }, last: { success: true } } }}
     *
     * const valigator = new Valigator();
     * valigator.validate_more({names: {first: "Dinesh" }}, {names: {first: {type: "number"}}});
     * // => {success: false, values: { names: { first: { success: false, message: 'Invalid value for data' } } }}
     */
    public validate_more(
        data: unknown,
        shape: TShape
    ): { success: boolean; values: TMsg } {
        this.validateShape(shape);
        const res = this.checkDataShapeMore(data, shape);

        return { success: this.checkDataShape(data, shape), values: res };
    }
}

const val = new Valigator();

console.log(
    val.validate_more(
        { foo: "dsf" },
        {
            foo: {
                type: "text",
                validators: [minLength(5)],
                messages: {
                    minLength: "Test message",
                },
            },
        }
    ).values
);
console.log(isString.id);
console.log(minLength(1).id);
