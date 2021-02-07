import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isNumber } from "./isNumber";
import { isString } from "./isString";

function _containsRegex<T>(reg: RegExp, value: T): boolean {
    if (isNumber(value) || isString(value)) {
        return reg.test(String(value));
    }
    if (value instanceof Array) {
        return value.some((val) => reg.test(val.toString()));
    }
    return false;
}

/**
 * Checks whether the value converted to string contains a specified regex
 * With arrays it will check that any of the values match the regex
 *
 * @param reg Regex to test
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a specified regex
 */
export const containsRegex: TValidator = run(_containsRegex, "containsRegex");
export default containsRegex;
