import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isCube<T>(value: T): boolean {
    if (typeof value === "number") {
        let start = 1;
        let end: number = value;
        while (start <= end) {
            const mid: number = Math.floor((start + end) / 2);
            if (mid * mid * mid === value) {
                return true;
            }

            if (mid * mid * mid < value) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }

    return false;
}

/**
 * Checks whether a value is a number and whether that number is a cube number
 *
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a cube or not
 */
export const isCube: TValidator = run(_isCube, "isCube");
export default isCube;
