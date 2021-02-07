import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isPositive<T>(value: T): boolean {
    if (typeof value === "number") {
        return value > 0;
    }
    return false;
}

/**
 * Checks whether a value is a number and whether that number is a positive number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a positive number or not
 */
export const isPositive: TValidator = run(_isPositive, "isPositive");
export default isPositive;
