import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isBoolean<T>(value: T): boolean {
    return typeof value === "boolean";
}

/**
 * Checks if value is a boolean
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether boolean or not
 */
export const isBoolean: TValidator = run(_isBoolean, "isBoolean");
export default isBoolean;
