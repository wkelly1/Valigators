import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { getDecimalPoints } from "../Helpers";

function _minDecimalPoint<T>(min: number, value: T): boolean {
    if (typeof value === "number") {
        return getDecimalPoints(value) >= min;
    } else {
        return false;
    }
}

/**
 * Checks whether a number has greater than or equal to a specified number of decimal points
 * @param min Min value
 * @param value Value to check
 * @returns {boolean} Boolean value representing has correct decimal points
 */
export const minDecimalPoint: TValidator = run(
    _minDecimalPoint,
    "minDecimalPoint"
);
export default minDecimalPoint;
