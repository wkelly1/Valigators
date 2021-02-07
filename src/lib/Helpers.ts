import { TValidator } from "./Valigators.types";

/**
 * Helper function to get the number of decimal points of a number
 * @param value Value to get
 * @returns Number of decimal points number has
 */
export function getDecimalPoints(value: number): number {
    const index = value.toString().indexOf(".");
    return index === -1 ? 0 : value.toString().length - index - 1;
}

/**
 * See: https://codeburst.io/perpetual-currying-in-javascript-5ae1c749adc5 for good explanation of this function and currying
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
