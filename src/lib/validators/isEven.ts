import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isEven<T>(value: T): boolean {
    if (typeof value === "number") {
        if (value === 0) {
            return false;
        }
        return value % 2 === 0;
    }
    return false;
}
/**
 * Checks whether a value is a number and whether that number is even
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a even or not
 */
export const isEven: TValidator = run(_isEven, "isEven");
export default isEven;
