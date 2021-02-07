import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isNull<T>(value: T): boolean {
    return value === null;
}

/**
 * Checks if value is null
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether null or not
 */
export const isNull: TValidator = run(_isNull, "isNull");
export default isNull;
