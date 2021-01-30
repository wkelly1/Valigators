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

interface type {
  name: string;
  validators: Function[];
}

/**
 * See: https://codeburst.io/perpetual-currying-in-javascript-5ae1c749adc5 for good explanation of this function and currying
 * @param fn Function to curry
 * @returns Curried function
 */
const curry = (fn) => {
  const innerFn = (N, args) => {
    return (...x) => {
      if (N <= x.length) {
        return fn(...args, ...x);
      }
      return innerFn(N - x.length, [...args, ...x]);
    };
  };

  return innerFn(fn.length, []);
};

/**
 * Checks if value is a string
 * @param value Value to check
 * @returns Boolean value representing whether string or not
 */
function _isString(value: any) {
  return typeof value === "string";
}

/**
 * Checks if value is a number
 * @param value Value to check
 * @returns Boolean value representing whether number or not
 */
function _isNumber(value: any) {
  return typeof value === "number";
}

/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _minLength(min: Number, value: any) {
  return value.length >= min;
}

/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _maxLength(max: Number, value: any) {
  return value.length <= max;
}

/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
function _minMaxLength(min: Number, max: Number, value: any) {
  return value.length >= min && value.length <= max;
}

const isString = _isString;
const isNumber = _isNumber;
export const minLength = curry(_minLength);
export const maxLength = curry(_maxLength);
export const minMaxLength = curry(_minMaxLength);

export function customValidator(func: Function) {
  return curry(func);
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
}

export class Validate {
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
        if (!output[key]){
          if (typeof data !== "object") {
            output[key] = this.checkDataShapeMore(data[key], {})
          } else {
            let cur = {}
            cur[this.keys.success] = false;
            cur[this.keys.message] = this.messages.unexpectedValue
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
function main() {
  console.log("MAIN PROCESS");
  const val = new Validate({
    keys: {
      type: "test"
    }
  });

  const data = {
    name: "Will",
    age: 10
  };

  const shape = {
    name: {
      "test": "text",
    },
    age: {
      "test": "text",
    },
  };

  const res = val.validate_more(data, shape);
  console.log(res);
}

main();
