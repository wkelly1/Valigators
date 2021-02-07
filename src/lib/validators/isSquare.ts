import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isSquare<T>(value: T): boolean {
    if (typeof value === "number") {
        return value > 0 && Math.sqrt(value) % 1 === 0;
    }
    return false;
}

/**
 * Checks whether a value is a number and whether that number is a square number
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
export const isSquare: TValidator = run(_isSquare, "isSquare");
export default isSquare;
