import Valigator from "../..";
import { run } from "../Helpers";
import { TShape, TValidator } from "../Valigators.types";

function _all(shape: TShape, value: unknown): boolean {
    if (Array.isArray(value)) {
        const val = new Valigator();
        return value.every((value) => val.validate(value, shape));
    }

    return false;
}

/**
 * Checks that every value in an array matches some shape
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether they all match
 */
export const all: TValidator = run(_all, "all");
export default all;
