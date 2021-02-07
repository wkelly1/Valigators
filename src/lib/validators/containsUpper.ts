import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isNumber } from "./isNumber";
import { isString } from "./isString";

function _containsUpper<T>(value: T): boolean {
    if (value instanceof Array || isNumber(value) || isString(value)) {
        return /[A-Z]/.test(String(value));
    }
    return false;
}

/**
 * Checks whether the value converted to string contains an upper case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an upper case character
 */
export const containsUpper: TValidator = run(_containsUpper, "containsUpper");
export default containsUpper;
