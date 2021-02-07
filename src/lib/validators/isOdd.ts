import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isEven } from "./isEven";

function _isOdd<T>(value: T): boolean {
    if (typeof value !== "number") {
        return false;
    }
    if (value === 0 || value < 0) {
        return false;
    }
    return !isEven(value);
}

/**
 * Checks whether a value is a number and whether that number is odd
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a odd or not
 */
export const isOdd: TValidator = run(_isOdd, "isOdd");
export default isOdd;
