import { getDecimalPoints } from "./Helpers";

/**
 * Checks if value is a string
 * @param value Value to check
 * @returns Boolean value representing whether string or not
 */
export function _isString(value: any) {
  return typeof value === "string";
}

/**
 * Checks if value is a number
 * @param value Value to check
 * @returns Boolean value representing whether number or not
 */
export function _isNumber(value: any) {
  return typeof value === "number";
}

/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
export function _minLength(min: number, value: any) {
  return value.length >= min;
}

/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
export function _maxLength(max: number, value: any) {
  return value.length <= max;
}

/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
export function _minMaxLength(min: number, max: number, value: any) {
  return value.length >= min && value.length <= max;
}

/**
 * Checks whether a value converted to a string has a specific length
 * @param n Length
 * @param value Value to check
 * @returns Boolean value representing whether right length or not
 */
export function _length(n: number, value: any): boolean {
  return value.toString().length === n;
}

/**
 * Checks whether a value converted to a string contains a specific substring
 * @param inner Substring to check for
 * @param value Value to check
 * @returns Boolean value representing whether it contains substring
 */
export function _substring(inner: string, value: any): boolean {
  return value.toString().includes(inner);
}

/**
 * Checks whether a number has less than or equal to a specified number of decimal points
 * @param max Max value
 * @param value Value to check
 * @returns Boolean value representing has correct decimal points
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
 * @returns Boolean value representing has correct decimal points
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
 * @returns Boolean value representing has correct decimal points
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
 * @returns Boolean representing whether the value matches one of the elems
 */
export function _oneOf(elems: any[], value: any): boolean {
  return elems.includes(value);
}

/**
 * Checks whether the value converted to string contains a number
 * @param value Value to check
 * @returns Boolean value representing whether contains a number
 */
export function _containsNumber(value: any): boolean {
  return /\d/.test(value.toString());
}

/**
 * Checks whether the value converted to string contains an upper case character
 * @param value Value to check
 * @returns Boolean value representing whether contains an upper case character
 */
export function _containsUpper(value: any): boolean {
  return /[A-Z]/.test(value.toString());
}

/**
 * Checks whether the value converted to string contains an lower case character
 * @param value Value to check
 * @returns Boolean value representing whether contains an lower case character
 */
export function _containsLower(value: any): boolean {
  return /[a-z]/.test(value.toString());
}

/**
 * Checks whether the value converted to string contains a symbol
 * @param value Value to check
 * @returns Boolean value representing whether contains a symbol
 */
export function _containsSymbol(value: any): boolean {
  return /[|\\/~^:,;?!&%$@*+]/.test(value.toString());
}

/**
 * Checks whether the value converted to string contains a specified regex
 * @param reg Regex to test
 * @param value Value to check
 * @returns Boolean value representing whether contains a specified regex
 */
export function _containsRegex(reg: RegExp, value: any): boolean {
  return reg.test(value.toString());
}
