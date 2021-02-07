import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _maxLength<T>(max: number, value: T): boolean {
    if (Array.isArray(value)) {
        return value.length <= max;
    } else {
        return String(value).length <= max;
    }
}

/**
 * Checks that a value has length less than max value inclusive
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export const maxLength: TValidator = run(_maxLength, "maxLength");
export default maxLength;
