import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isNegative<T>(value: T): boolean {
    if (typeof value === "number") {
        return value < 0;
    }
    return false;
}

/**
 * Checks whether a value is a number and whether that number is a negative number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a negative number or not
 */
export const isNegative: TValidator = run(_isNegative, "isNegative");
export default isNegative;
