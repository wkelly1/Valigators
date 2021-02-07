import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _minMaxLength<T>(min: number, max: number, value: T): boolean {
    if (Array.isArray(value)) {
        return value.length >= min && value.length <= max;
    } else {
        return String(value).length >= min && String(value).length <= max;
    }
}

/**
 * Checks whether a value has length between min and max value inclusive
 * @param min Min value
 * @param max Max value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export const minMaxLength: TValidator = run(_minMaxLength, "minMaxLength");
export default minMaxLength;
