import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isNumber } from "./isNumber";
import { isString } from "./isString";

function _containsLower<T>(value: T): boolean {
    if (value instanceof Array || isNumber(value) || isString(value)) {
        return /[a-z]/.test(String(value));
    }
    return false;
}

/**
 * Checks whether the value converted to string contains an lower case character
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains an lower case character
 */
export const containsLower: TValidator = run(_containsLower, "containsLower");
export default containsLower;
