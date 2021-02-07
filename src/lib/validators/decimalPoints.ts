import { getDecimalPoints, run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _decimalPoints<T>(n: number, value: T): boolean {
    if (typeof value === "number") {
        return getDecimalPoints(value) === n;
    } else {
        return false;
    }
}

/**
 * Checks whether a number has exactly the specified number of decimal points
 * @param n Value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export const decimalPoints: TValidator = run(_decimalPoints, "decimalPoints");
export default decimalPoints;
