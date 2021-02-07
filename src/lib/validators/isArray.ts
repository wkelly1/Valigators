import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isArray<T>(value: T): boolean {
    return Array.isArray(value);
}

/**
 * Checks if value is an array
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether array or not
 */
export const isArray: TValidator = run(_isArray, "isArray");
export default isArray;
