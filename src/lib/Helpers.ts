import { TValidator } from "./Valigators.types";

/**
 * Helper function to get the number of decimal points of a number
 * @private
 * @param value Value to get
 * @returns Number of decimal points number has
 */
export function getDecimalPoints(value: number): number {
    const index = value.toString().indexOf(".");
    return index === -1 ? 0 : value.toString().length - index - 1;
}

/**
 * See: https://codeburst.io/perpetual-currying-in-javascript-5ae1c749adc5 for good explanation of this function and currying
 * @private
 * @param fn Function to curry
 * @returns Curried function
 */
export function curry(fn: (...args: any[]) => any, id: string) {
    const innerFn = (N: number, args: unknown[]) => {
        let func: TValidator = (...x: unknown[]) => {
            if (N <= x.length) {
                return fn(...args, ...x);
            }
            let _innerFn = innerFn(N - x.length, [...args, ...x]);
            // _innerFn.id = id;
            return _innerFn;
        };
        func.id = id;
        return func;
    };
    innerFn.id = id;
    return innerFn(fn.length, []);
}

/**
 * Wraps a function in a try catch to make it safe
 * @private
 * @param fn Function to convert
 * @returns Safe function
 */
export function run(func: TValidator, id: string): TValidator {
    try {
        return curry(func, id);
    } catch (ex) {
        return (...args) => false;
    }
}

/**
 * Checks that two values are both arrays and that they are equal
 * @param a Value to check
 * @param b Other value to check
 */
export function arraysEqual(a: unknown, b: unknown) {
    if (a instanceof Array && b instanceof Array) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    } else {
        return false;
    }
}
