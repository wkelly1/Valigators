import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _length<T>(n: number, value: T): boolean {
    if (Array.isArray(value)) {
        return value.length === n;
    } else {
        return String(value).length === n;
    }
}

/**
 * Checks whether a value converted to a string has a specific length
 * @param n Length
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export const length: TValidator = run(_length, "length");
export default length;
