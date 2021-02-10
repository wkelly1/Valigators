import Valigator from "../..";
import { arraysEqual, run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _exact(array: unknown[], value: unknown): boolean {
    if (Array.isArray(value)) {
        return arraysEqual(array, value);
    }

    return false;
}

/**
 * Checks that the value exactly matches the array
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether they match
 */
export const exact: TValidator = run(_exact, "exact");
export default exact;
