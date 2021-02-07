import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isNumber<T>(value: T): boolean {
    return typeof value === "number";
}

/**
 * Checks if value is a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether number or not
 */
export const isNumber: TValidator = run(_isNumber, "isNumber");
export default isNumber;
