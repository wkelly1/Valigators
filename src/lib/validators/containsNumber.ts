import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isNumber } from "./isNumber";
import isString from "./isString";

function _containsNumber<T>(value: T): boolean {
    if (value instanceof Array || isNumber(value) || isString(value)) {
        return /\d/.test(String(value));
    }
    return false;
}

/**
 * Checks whether the value converted to string contains a number
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a number
 */
export const containsNumber: TValidator = run(
    _containsNumber,
    "containsNumber"
);
export default containsNumber;
