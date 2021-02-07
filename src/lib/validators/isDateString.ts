import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

// TODO: Fix
function _isDateString<T>(value: T): boolean {
    if (typeof value === "string") {
        console.log(!!Date.parse(value));
        return new Date(value).toString() !== "Invalid Date";
    } else {
        return false;
    }
}

/**
 * Checks whether a value is a string in the format of a date
 *
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a date string or not
 */
export const isDateString: TValidator = run(_isDateString, "isDateString");
export default isDateString;
