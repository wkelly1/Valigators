/**
 * Helper function to get the number of decimal points of a number
 * @param value Value to get
 * @returns Number of decimal points number has
 */
export function getDecimalPoints(value: number): number {
  let index = value.toString().indexOf(".");
  return index === -1 ? 0 : value.toString().length - index - 1;
}

/**
 * See: https://codeburst.io/perpetual-currying-in-javascript-5ae1c749adc5 for good explanation of this function and currying
 * @param fn Function to curry
 * @returns Curried function
 */
export const curry = (fn) => {
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
 * Wraps a function in a try catch to make it safe
 * @param fn Function to convert
 * @returns Safe function
 */
export function run(fn: Function): Function {
  return function () {
    try {
      return fn.apply(null, arguments);
    } catch (ex) {
      return true;
    }
  };
}
