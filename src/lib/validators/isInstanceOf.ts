import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isInstanceOf<T>(
    typeClass: (...args: unknown[]) => unknown,
    value: T
): boolean {
    return value instanceof typeClass;
}

/**
 * Tests the presence of constructor.prototype in object's prototype chain
 * @param typeClass function to test against
 * @param value Object to test
 * @returns {boolean} Boolean
 */
export const isInstanceOf: TValidator = run(_isInstanceOf, "isInstanceOf");
export default isInstanceOf;
