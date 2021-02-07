import { getDecimalPoints, run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _maxDecimalPoint<T>(max: number, value: T): boolean {
    if (typeof value === "number") {
        return getDecimalPoints(value) <= max;
    } else {
        return false;
    }
}

/**
 * Checks whether a number has less than or equal to a specified number of decimal points
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export const maxDecimalPoint: TValidator = run(
    _maxDecimalPoint,
    "maxDecimalPoint"
);
export default maxDecimalPoint;
