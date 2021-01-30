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
  _isNumber,
  _isString,
  _length,
  _maxDecimalPoint,
  _maxLength,
  _minDecimalPoint,
  _minLength,
  _minMaxLength,
  _oneOf,
  _substring,
} from "./HelperValidators";

interface type {
  name: string;
  validators: Function[];
}

export const isString = run(_isString);
export const isNumber = run(_isNumber);
export const minLength = run(curry(_minLength));
export const maxLength = run(curry(_maxLength));
export const minMaxLength = run(curry(_minMaxLength));
export const length = run(curry(_length));
export const substring = run(curry(_substring));
export const maxDecimalPoint = run(curry(_maxDecimalPoint));
export const minDecimalPoint = run(curry(_minDecimalPoint));
export const decimalPoints = run(curry(_decimalPoints));
export const oneOf = run(curry(_oneOf));
export const containsNumber = run(_containsNumber);
export const containsUpper = run(_containsUpper);
export const containsLower = run(_containsLower);
export const containsSymbol = run(_containsSymbol);
export const containsRegex = run(curry(_containsRegex));

export function customValidator(func: Function) {
  return run(curry(func));
}

interface options {
  messages?: {
    invalidValue?: string;
    unexpectedValue?: string;
    required?: string;
  };
  keys?: {
    success?: string;
    message?: string;
    type?: string;
    required?: string;
    validators?: string;
  };
  types?: object;
}

export class Valigator {
  private types = {
    text: {
      validators: [isString],
    },
    number: {
      validators: [isNumber],
    },
  };

  private messages: {
    invalidValue: string;
    unexpectedValue: string;
    required: string;
  } = {
    invalidValue: "Invalid value for data",
    unexpectedValue: "Value is unexpected",
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

  constructor(options?: options) {
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
        for (const key in options.types) {
          console.log(options.types[key])
          if (
            Object.keys(options.types[key]).length === 1 &&
            options.types[key].validators
          ) {
            this.types[key] = options.types[key];
          }
        }
      }

      console.log(this.types)
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
  private isShape(val: any): boolean {
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
  }

  /**
   * Method checks that the shape matches this structure:
   *    shape = {
   *       type: string | foo: shape
   *    }
   * @param obj Object to check
   * @returns Boolean representing whether validation passed
   */
  private checkShapeObject(obj: any): boolean {
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

  private validateShape(shape: object): void {
    if (typeof shape !== "object" || Array.isArray(shape)) {
      throw Error("Invalid value for property shape");
    }
    if (!this.checkShapeObject(shape)) {
      throw Error("Invalid shape object");
    }
  }

  private runValidations(data: any, shape: object): boolean {
    // Run any user defined validators
    const validators: Function[] | undefined = shape[this.keys.validators];
    if (validators) {
      if (Array.isArray(validators)) {
        for (let i = 0; i < validators.length; i++) {
          if (!validators[i](data)) {
            return false;
          }
        }
      }
    }

    // Now run the default validators for the type
    const defaultValidators = this.types[shape[this.keys.type]].validators;
    for (let i = 0; i < defaultValidators.length; i++) {
      if (!defaultValidators[i](data)) {
        return false;
      }
    }

    return true;
  }

  private checkDataShape(data: any, shape: object): boolean {
    if (typeof data !== "object") {
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
        new Set([...Object.keys(data), ...Object.keys(shape)])
      );

      if (union.length > Object.keys(shape).length) {
        // Too many keys have been provided
        return false;
      }

      let found: string[] = [];
      // data is an object
      for (const key in data) {
        if (this.isShape(shape[key])) {
          // Reached depth
          if (!this.runValidations(data[key], shape[key])) {
            // Invalid data
            return false;
          }

          found.push(key);
        } else {
          if (!this.checkDataShape(data[key], shape[key])) {
            return false;
          }
        }
      }

      let shapeRequired: string[] = Object.keys(shape)
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

  private buildErrorMessageObject(shape: object, message: string): object {
    let output = {};
    for (const key in shape) {
      if (typeof shape[key] !== "object") {
        let cur = {};
        cur[this.keys.success] = false;
        cur[this.keys.message] = message;
        output[key] = cur;
      } else {
        output[key] = this.buildErrorMessageObject(output[key], message);
      }
    }
    return output;
  }

  // {
  //   name: {
  //     type: "text",
  //     validators: [minLength(1)],
  //   },
  private checkDataShapeMore(data: any, shape: object): object {
    let output = {};
    if (typeof data !== "object") {
      // data is some primative type; string, number etc
      if (this.isShape(shape)) {
        if (!this.runValidations(data, shape)) {
          // Invalid data
          let cur = {};
          cur[this.keys.success] = false;
          cur[this.keys.message] = this.messages.invalidValue;
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
      for (const key in shape) {
        if (Object.keys(data).includes(key)) {
          if (this.isShape(shape[key])) {
            // Reached depth
            if (!this.runValidations(data[key], shape[key])) {
              let cur = {};
              cur[this.keys.success] = false;
              cur[this.keys.message] = this.messages.invalidValue;

              // Invalid data
              output[key] = cur;
            } else {
              let cur = {};
              cur[this.keys.success] = true;

              output[key] = cur;
            }
          } else {
            output[key] = this.checkDataShapeMore(data[key], shape[key]);
          }
        } else {
          if (this.isShape(shape[key])) {
            if (
              shape[key][this.keys.required] === undefined ||
              shape[key][this.keys.required] === true
            ) {
              let cur = {};
              cur[this.keys.success] = false;
              cur[this.keys.message] = this.messages.required;

              output[key] = cur;
            } else {
              let cur = {};
              cur[this.keys.success] = true;

              output[key] = cur;
            }
          } else {
            output[key] = this.buildErrorMessageObject(
              shape[key],
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
            let cur = {};
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
   * @returns Boolean representing if data is valid or not
   */
  public validate(data: any, shape: object): boolean {
    this.validateShape(shape);
    return this.checkDataShape(data, shape);
  }

  /**
   * Checks whether some data matches a specified shape and returns an object containing all the places where it failed and their corresponding messages
   * @param data Data to check
   * @param shape Shape the data is supposed to match
   * @returns Object representing what passed and what failed
   */
  public validate_more(data: any, shape: object): object {
    this.validateShape(shape);
    const res = this.checkDataShapeMore(data, shape);

    return res;
  }
}

// export default function test():void{
//     console.log("IT works");
// }

// Main debugging function
// function main() {
//   console.log("MAIN PROCESS");
//   const val = new Valigator({
//     types: {
//       test: {
//         validators: [containsLower]
//       }
//     }
//   });

//   const data = {
//     name: "WILL",
//     age: 10,
//   };

//   const shape = {
//     name: {
//       type: "test",
//     },
//     age: {
//       type: "text",
//     },
//   };
//   console.log(val.validate_more(data, shape));
// }
// main();

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
//   
// }

// main();
