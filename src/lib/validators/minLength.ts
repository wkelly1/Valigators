import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

let _minLength: TValidator;
_minLength = function (min: number, value: unknown): boolean {
    if (Array.isArray(value)) {
        return value.length >= min;
    } else {
        return String(value).length >= min;
    }
};

/**
 * Checks that a value has length greater than min value inclusive
 * @param min Min value
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether right length or not
 */
export const minLength: TValidator = run(_minLength, "minLength");
export default minLength;
