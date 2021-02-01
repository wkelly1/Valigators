import { getDecimalPoints, run } from "./Helpers";
import { isNumber, isString } from "./Valigators";

export type ValidatorFunc = (...args) => boolean;

/**
 * Checks if value is a string
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether string or not
 */
export function _isString(value: unknown): boolean {
  return typeof value === "string";
}

/**
 * Checks if value is a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether number or not
 */
export function _isNumber(value: unknown): boolean {
  return typeof value === "number";
}

/**
 * Checks if value is an array
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether array or not
 */
export function _isArray(value: unknown): boolean {
  return Array.isArray(value);
}

/**
 * Checks if value is a boolean
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether boolean or not
 */
export function _isBoolean(value: unknown): boolean {
  return typeof value === "boolean";
}

/**
 * Checks if value is null
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether null or not
 */
export function _isNull(value: unknown): boolean {
  return value === null;
}

/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export function _minLength(min: number, value: any[]): boolean {
  if (_isArray(value)) {
    return value.length >= min;
  } else {
    return value.toString().length >= min;
  }
}

/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export function _maxLength(max: number, value: any): boolean {
  if (_isArray(value)) {
    return value.length <= max;
  } else {
    return value.toString().length <= max;
  }
}

/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export function _minMaxLength(min: number, max: number, value: any): boolean {
  if (_isArray(value)) {
    return value.length >= min && value.length <= max;
  } else {
    return value.toString().length >= min && value.toString().length <= max;
  }
}

/**
 * Checks whether a value converted to a string has a specific length
 * @param n Length
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export function _length(n: number, value: any): boolean {
  if (_isArray(value)) {
    return value.length === n;
  } else {
    return value.toString().length === n;
  }
}

/**
 * Checks whether a value converted to a string contains a specific substring inner
 * @param inner Substring to check for (converted to string)
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether it contains substring
 */
export function _substring(inner: string, value: any): boolean {
  return value.toString().includes(inner.toString());
}

/**
 * Checks whether a number has less than or equal to a specified number of decimal points
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export function _maxDecimalPoint(max: number, value: any): boolean {
  if (_isNumber(value)) {
    return getDecimalPoints(value) <= max;
  } else {
    return false;
  }
}

/**
 * Checks whether a number has greater than or equal to a specified number of decimal points
 * @param min Min value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export function _minDecimalPoint(min: number, value: any): boolean {
  if (_isNumber(value)) {
    return getDecimalPoints(value) >= min;
  } else {
    return false;
  }
}

/**
 * Checks whether a number has exactly the specified number of decimal points
 * @param n Value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export function _decimalPoints(n: number, value: any): boolean {
  if (_isNumber(value)) {
    return getDecimalPoints(value) === n;
  } else {
    return false;
  }
}

/**
 * Takes an array and checks that the value matches on of the elements in the array
 * @param elems Elements value could be
 * @param value Value to check
 * @returns {boolean} Boolean representing whether the value matches one of the elems
 */
export function _oneOf(elems: any[], value: any): boolean {
  return elems.includes(value);
}

/**
 * Checks whether the value converted to string contains a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a number
 */
export function _containsNumber(value: any): boolean {
  if (value instanceof Array || isNumber(value) || isString(value)) {
    return /\d/.test(value.toString());
  }
  return false;
}

/**
 * Checks whether the value converted to string contains an upper case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an upper case character
 */
export function _containsUpper(value: any): boolean {
  if (value instanceof Array || isNumber(value) || isString(value)) {
    return /[A-Z]/.test(value.toString());
  }
  return false;
}

/**
 * Checks whether the value converted to string contains an lower case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an lower case character
 */
export function _containsLower(value: any): boolean {
  if (value instanceof Array || isNumber(value) || isString(value)) {
    return /[a-z]/.test(value.toString());
  }
  return false;
}

/**
 * Checks whether the value converted to string contains a symbol
 * With arrays it will check that any of the values contain a symbol
 *
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a symbol
 */
export function _containsSymbol(value: any): boolean {
  if (isNumber(value) || isString(value)) {
    return /[[\]|\\/~^:,;?!&%$@*+\-_#}{<>.=_)(£]/.test(value.toString());
  }
  if (value instanceof Array) {
    return value.some((val) =>
      /[[\]|\\/~^:,;?!&%$@*+\-_#}{<>.=_)(£]/.test(val.toString())
    );
  }
  return false;
}

/**
 * Checks whether the value converted to string contains a specified regex
 * With arrays it will check that any of the values match the regex
 *
 * @param reg Regex to test
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a specified regex
 */
export function _containsRegex(reg: RegExp, value: any): boolean {
  if (isNumber(value) || isString(value)) {
    return reg.test(value.toString());
  }
  if (value instanceof Array) {
    return value.some((val) => reg.test(val.toString()));
  }
  return false;
}

/**
 * Used if you you don't mind if some of the validators fail as long as one passes
 *
 * @param validators Functions to run
 * @param value Value to check
 * @returns {boolean} Boolean value if one of the functions passes
 */
export function _or(validators: ValidatorFunc[], value: any): boolean {
  console.log("res: ", run(validators[0])(value));
  return validators.some((validator) => run(validator)(value));
}

/**
 * Tests the presence of constructor.prototype in object's prototype chain
 * @param typeClass function to test against
 * @param value Object to test
 * @returns {boolean} Boolean
 */
export function _isInstanceOf(typeClass: any, value: any): boolean {
  return value instanceof typeClass;
}

/**
 * Checks whether a value is a number and whether that number is even
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a even or not
 */
export function _isEven(value: any): boolean {
  if (_isNumber(value)) {
    if (value === 0) {
      return false;
    }
    return value % 2 === 0;
  }
  return false;
}

/**
 * Checks whether a value is a number and whether that number is odd
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a odd or not
 */
export function _isOdd(value: any): boolean {
  if (!_isNumber(value)) {
    return false;
  }
  if (value === 0 || value < 0) {
    return false;
  }
  return !_isEven(value);
}

/**
 * Checks whether a value is a number and whether that number is prime
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
export function _isPrime(value: any): boolean {
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

    let i = 5;
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

/**
 * Checks whether a value is a number and whether that number is a square number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
export function _isSquare(value: any): boolean {
  if (_isNumber(value)) {
    return value > 0 && Math.sqrt(value) % 1 === 0;
  }
  return false;
}

/**
 * Checks whether a value is a number and whether that number is a cube number
 *
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a cube or not
 */
export function _isCube(value: any): boolean {
  if (_isNumber(value)) {
    let start = 1;
    let end: number = value;
    while (start <= end) {
      const mid: number = Math.floor((start + end) / 2);
      if (mid * mid * mid === value) {
        return true;
      }

      if (mid * mid * mid < value) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return false;
}

/**
 * Checks whether a value is a number and whether that number is a negative number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a negative number or not
 */
export function _isNegative(value: any): boolean {
  if (_isNumber(value)) {
    return value < 0;
  }
  return false;
}

/**
 * Checks whether a value is a number and whether that number is a positive number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a positive number or not
 */
export function _isPositive(value: any): boolean {
  if (_isNumber(value)) {
    return value > 0;
  }
  return false;
}

/**
 * Checks whether the value is equal to a specified value using ===
 * @param equal Value to check equals to
 * @param value Value to check
 * @returns {boolean} {boolean} Boolean representing if they are equal
 */
export function _equals(equal: any, value: any): boolean {
  if (typeof equal === "object" && typeof value === "object") {
    // SOURCE: https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
    const type = Object.prototype.toString.call(value);

    if (type !== Object.prototype.toString.call(equal)) return false;

    if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

    const valueLen =
      type === "[object Array]" ? value.length : Object.keys(value).length;
    const otherLen =
      type === "[object Array]" ? equal.length : Object.keys(equal).length;
    if (valueLen !== otherLen) return false;

    const compare = function (item1: any, item2: any) {
      const itemType = Object.prototype.toString.call(item1);

      if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
        if (!_equals(item1, item2)) return false;
      } else {
        if (itemType !== Object.prototype.toString.call(item2)) return false;

        if (itemType === "[object Function]") {
          if (item1.toString() !== item2.toString()) return false;
        } else {
          if (item1 !== item2) return false;
        }
      }
    };

    if (type === "[object Array]") {
      for (let i = 0; i < valueLen; i++) {
        if (compare(value[i], equal[i]) === false) return false;
      }
    } else {
      for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          if (compare(value[key], equal[key]) === false) return false;
        }
      }
    }

    // If nothing failed, return true
    return true;
  }
  return equal === value;
}
