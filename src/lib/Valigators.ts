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

import {
    containsLower,
    containsNumber,
    containsSymbol,
    containsUpper,
    isInstanceOf,
    minLength,
} from "..";

import {
    credit_card_number,
    dateRegex,
    emailRegex,
    ipv4_address,
    ipv6_address,
    longitude_latitude,
    phoneRegex,
    time_hhmmss_12h,
    time_hhmmss_24h,
    time_hhmm_12h,
    time_hhmm_24h,
    url,
} from "./Regex";
import { containsRegex } from "./validators/containsRegex";
import { isArray } from "./validators/isArray";
import { isBoolean } from "./validators/isBoolean";
import { isNull } from "./validators/isNull";
import { isNumber } from "./validators/isNumber";
import { isString } from "./validators/isString";
import { TValidator, TTypes, TOptions, TShape, TMsg } from "./Valigators.types";

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
        password: {
            validators: [
                isString,
                containsUpper,
                containsLower,
                containsSymbol,
                containsNumber,
                minLength(8),
            ],
        },
        phone: {
            validators: [isString, containsRegex(phoneRegex)],
        },
        date: {
            validators: [isInstanceOf(Date)],
        },
        date_string: {
            validators: [isString, containsRegex(dateRegex)],
        },
        time_hhmm_12h: {
            validators: [isString, containsRegex(time_hhmm_12h)],
        },
        time_hhmm_24h: {
            validators: [isString, containsRegex(time_hhmm_24h)],
        },
        time_hhmmss_12h: {
            validators: [isString, containsRegex(time_hhmmss_12h)],
        },
        time_hhmmss_24h: {
            validators: [isString, containsRegex(time_hhmmss_24h)],
        },
        longitude_latitude: {
            validators: [isString, containsRegex(longitude_latitude)],
        },
        credit_card_number: {
            validators: [isString, containsRegex(credit_card_number)],
        },
        ipv4_address: {
            validators: [isString, containsRegex(ipv4_address)],
        },
        ipv6_address: {
            validators: [isString, containsRegex(ipv6_address)],
        },
        url: {
            validators: [isString, containsRegex(url)],
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
        onError: string;
    } = {
        success: "success",
        message: "message",
        type: "type",
        required: "required",
        validators: "validators",
        messages: "messages",
        validationErrors: "validationErrors",
        validator: "validator",
        onError: "onError",
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
                if (options.keys.onError) {
                    this.keys.onError = options.keys.onError;
                }
            }

            if (options.types) {
                for (const key in options.types) {
                    if (
                        Object.keys(options.types[key]).length === 1 &&
                        options.types[key].validators
                    ) {
                        this.types[key] = options.types[key];
                    } else {
                        throw Error(
                            "Types need to have an array of validators"
                        );
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

    /**
     * @private
     * Takes some data that may or might not be a shape object and checks whether it contains the onError key.
     * If it does it executes it
     * @param shape Shape to find onError callback and execute
     */
    private executeOnErrorCallback(shape: unknown): void {
        console.log("execuyinh", shape);
        if (this.isShape(shape)) {
            if (
                shape &&
                typeof shape === "object" &&
                shape[this.keys.onError]
            ) {
                shape[this.keys.onError]();
            }
        }
    }

    // private checkDataShape(
    //     data: unknown,
    //     shape: TShape,
    //     stopAtError?: boolean
    // ): boolean {
    //     let error = false;
    //     if (typeof data !== "object" || Array.isArray(data)) {
    //         // data is some primitive type; string, number etc
    //         if (this.isShape(shape)) {
    //             if (!this.runValidations(data, shape)) {
    //                 // Invalid data

    //                 this.executeOnErrorCallback(shape);
    //                 return false;
    //             }

    //         } else {
    //             // Invalid shape

    //             // Don't need to executeOnErrorCallback here as we know its not going to be a shape object
    //             return false;
    //         }
    //     } else {
    //         // Check that the number of keys in the data match the shape
    //         const union: string[] = Array.from(
    //             new Set([
    //                 ...Object.keys((data || {}) as Record<string, unknown>),
    //                 ...Object.keys(shape || {}),
    //             ])
    //         );

    //         if (union.length > Object.keys(shape || {}).length) {
    //             // Too many keys have been provided
    //             if (stopAtError) {
    //                 return false;
    //             } else {
    //                 error = true;
    //             }
    //         }

    //         const found: string[] = [];
    //         // data is an object
    //         // Check that every value in data exists in shape
    //         for (const key in data) {
    //             if (this.isShape(shape[key])) {
    //                 // Reached depth
    //                 if (!this.runValidations(data[key], shape[key] as TShape)) {
    //                     // Invalid data
    //                     if (stopAtError) {
    //                         this.executeOnErrorCallback(shape[key]);
    //                         return false;
    //                     } else {
    //                         this.executeOnErrorCallback(shape[key]);
    //                         error = true;
    //                     }
    //                 }

    //                 found.push(key);
    //             } else {
    //                 if (!this.checkDataShape(data[key], shape[key] as TShape)) {
    //                     if (stopAtError) {
    //                         this.executeOnErrorCallback(shape[key]);
    //                         return false;
    //                     } else {
    //                         this.executeOnErrorCallback(shape[key]);
    //                         error = true;
    //                     }
    //                 }
    //             }
    //         }

    //         const shapeRequired: string[] = Object.keys(shape)
    //             .filter((key) => this.isShape(shape[key]))
    //             .filter(
    //                 (key) =>
    //                     shape[key][this.keys.required] === undefined ||
    //                     shape[key][this.keys.required] === true
    //             );

    //         if (
    //             !shapeRequired.every(
    //                 (val) =>
    //                     found.includes(val) &&
    //                     data &&
    //                     !this.requiredValues.includes(data[val])
    //             )
    //         ) {
    //             if (stopAtError) {
    //                 return false;
    //             } else {
    //                 error = true;
    //             }
    //         }
    //     }

    //     return !error;
    // }

    private checkDataShape(
        data: unknown,
        shape: TShape,
        stopAtError?: boolean,
        runOnError?: boolean
    ): boolean {
        console.log(data, shape);
        let success = true;
        let output = {};
        if (
            typeof data !== "object" ||
            Array.isArray(data) ||
            (data &&
                typeof data === "object" &&
                data.constructor.name !== "Object")
        ) {
            // data is some primitive type; string, number etc
            if (this.isShape(shape)) {
                if (
                    !this.runValidations(data, shape) ||
                    this.requiredValues.includes(data)
                ) {
                    if (runOnError) {
                        this.executeOnErrorCallback(shape);
                    }
                    return false;
                } else {
                    return true;
                }
            } else {
                console.log("here");
                if (runOnError) {
                    this.executeSubOnErrors(shape);
                }
                // Invalid shape
                return false;
            }
        } else {
            // First check that every required value in shape is in data
            for (const key in shape) {
                // If data includes the value from shape
                if (Object.keys(data || {}).includes(key)) {
                    if (this.isShape(shape[key])) {
                        // Reached depth
                        if (
                            !this.runValidations(
                                (data || {})[key],
                                shape[key] as TShape
                            ) ||
                            this.requiredValues.includes((data || {})[key])
                        ) {
                            success = false;
                            output[key] = false;
                            if (runOnError) {
                                this.executeOnErrorCallback(shape[key]);
                            }

                            if (stopAtError) {
                                return success;
                            }
                        } else {
                            output[key] = true;
                        }
                    } else {
                        if (!shape[key]) {
                            output[key] = false;
                            success = false;
                            if (stopAtError) {
                                return success;
                            }
                        } else {
                            success = this.checkDataShape(
                                (data || {})[key],
                                shape[key] as TShape,
                                stopAtError
                            );
                            output[key] = success;
                            if (!success) {
                                if (stopAtError) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    // Data does not have a value that shape does not
                    if (this.isShape(shape[key])) {
                        // The shape value is does not contain any more nested objects
                        if (
                            shape[key][this.keys.required] === undefined ||
                            shape[key][this.keys.required] === true
                        ) {
                            // It is a required value so throw error
                            success = false;
                            output[key] = false;
                            if (runOnError) {
                                this.executeOnErrorCallback(shape[key]);
                            }
                            if (stopAtError) {
                                return success;
                            }
                        } else {
                            // It is not a required value so it does not matter
                            output[key] = true;
                        }
                    } else {
                        output[key] = false;
                        // The shape value has more nested elements
                        success = false;
                        if (stopAtError) {
                            return success;
                        }
                    }
                }
            }

            // Make sure every value in the data has is checked
            for (const key in data) {
                // The output has not checked this value
                if (!output[key]) {
                    if (typeof data !== "object") {
                        // data is not a primitive value
                        output[key] = this.checkDataShapeMore(data[key], {});
                    } else {
                        success = false;
                        if (stopAtError) {
                            return success;
                        }
                        output[key] = false;
                        // if (
                        //     shape[key][this.keys.required] === true ||
                        //     shape[key][this.keys.required] === undefined
                        // ) {
                        //     //
                        //     const cur = {};
                        //     cur[this.keys.success] = false;
                        //     cur[this.keys.message] = this.messages.required;
                        //     output[key] = cur;
                        //     this.executeOnErrorCallback(shape[key]);
                        // }
                    }
                }
            }
        }

        return success;
    }

    private executeSubOnErrors(shape: TShape): void {
        for (const key in shape) {
            if (this.isShape(shape[key])) {
                this.executeOnErrorCallback(shape[key]);
            } else {
                this.executeSubOnErrors(shape[key] as TShape);
            }
        }
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

        const test = shape[this.keys.type];
        if (typeof test === "string") {
            // Now run the default validators for the type
            const defaultValidators = this.types[test].validators;
            for (let i = 0; i < defaultValidators.length; i++) {
                if (!defaultValidators[i](data)) {
                    if (
                        (shape[this.keys.messages] || {})[
                            defaultValidators[i]().id
                        ]
                    ) {
                        let error = {};
                        error[this.keys.validator] = defaultValidators[i]().id;
                        error[this.keys.message] =
                            shape[this.keys.messages][
                                defaultValidators[i]().id
                            ];
                        msgs.push(error);
                    } else {
                        let error = {};
                        error[this.keys.validator] = defaultValidators[i]().id;
                        (error[this.keys.message] = this.messages.invalidValue),
                            msgs.push(error);
                    }
                }
            }
        } else {
            throw Error("Invalid shape object");
        }

        return msgs;
    }

    private checkDataShapeMore(data: unknown, shape: TShape): TMsg {
        console.log(data, shape);
        const output = {};
        if (
            typeof data !== "object" ||
            Array.isArray(data) ||
            (data &&
                typeof data === "object" &&
                data.constructor.name !== "Object")
        ) {
            // data is some primitive type; string, number etc
            if (this.isShape(shape)) {
                if (this.requiredValues.includes(data)) {
                    const cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.required;
                    this.executeOnErrorCallback(shape);
                    return cur;
                }

                if (!this.runValidations(data, shape)) {
                    const cur = {};
                    cur[this.keys.success] = false;
                    cur[this.keys.message] = this.messages.invalidValue;

                    cur[
                        this.keys.validationErrors
                    ] = this.getValidationMessages(data, shape);
                    this.executeOnErrorCallback(shape);
                    return cur;
                } else {
                    // valid data
                    const cur = {};
                    cur[this.keys.success] = true;
                    return cur;
                }
            } else {
                console.log("here");
                this.executeSubOnErrors(shape);
                // Invalid shape
                return this.buildErrorMessageObject(
                    shape,
                    this.messages.unexpectedValue
                );
            }
        } else {
            // First check that every required value in shape is in data
            for (const key in shape) {
                // If data includes the value from shape
                if (Object.keys(data || {}).includes(key)) {
                    if (this.isShape(shape[key])) {
                        if (this.requiredValues.includes((data || {})[key])) {
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.required;
                            this.executeOnErrorCallback(shape);
                            return cur;
                        } else if (
                            !this.runValidations(
                                (data || {})[key],
                                shape[key] as TShape
                            )
                        ) {
                            // Reached depth
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.invalidValue;
                            cur[
                                this.keys.validationErrors
                            ] = this.getValidationMessages(
                                (data || {})[key],
                                shape[key] as TShape
                            );
                            this.executeOnErrorCallback(shape[key]);
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
                                (data || {})[key],
                                shape[key] as TShape
                            );
                        }
                    }
                } else {
                    // Data does not have a value that shape does not
                    if (this.isShape(shape[key])) {
                        // The shape value is does not contain any more nested objects
                        if (
                            shape[key][this.keys.required] === undefined ||
                            shape[key][this.keys.required] === true
                        ) {
                            // It is a required value so throw error
                            const cur = {};
                            cur[this.keys.success] = false;
                            cur[this.keys.message] = this.messages.required;

                            output[key] = cur;
                            this.executeOnErrorCallback(shape[key]);
                        } else {
                            // It is not a required value so it does not matter
                            const cur = {};
                            cur[this.keys.success] = true;

                            output[key] = cur;
                        }
                    } else {
                        // The shape value has more nested elements
                        output[key] = this.buildErrorMessageObject(
                            shape[key] as TShape,
                            this.messages.required
                        );
                    }
                }
            }

            // Make sure every value in the data has is checked
            for (const key in data) {
                // The output has not checked this value
                if (!output[key]) {
                    if (typeof data !== "object") {
                        // data is not a primitive value
                        output[key] = this.checkDataShapeMore(data[key], {});
                    } else {
                        const cur = {};
                        cur[this.keys.success] = false;
                        cur[this.keys.message] = this.messages.unexpectedValue;

                        output[key] = cur;
                        // if (
                        //     shape[key][this.keys.required] === true ||
                        //     shape[key][this.keys.required] === undefined
                        // ) {
                        //     //
                        //     const cur = {};
                        //     cur[this.keys.success] = false;
                        //     cur[this.keys.message] = this.messages.required;
                        //     output[key] = cur;
                        //     this.executeOnErrorCallback(shape[key]);
                        // }
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
    public validate(
        data: unknown,
        shape: TShape,
        stopAtError?: boolean
    ): boolean {
        this.validateShape(shape);
        return this.checkDataShape(data, shape, stopAtError, true);
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

        return {
            success: this.checkDataShape(data, shape, false, false),
            values: res,
        };
    }
}
