import Valigator from "../..";
import { run } from "../Helpers";
import { TShape, TValidator } from "../Valigators.types";

function _upto(end: number, shape: TShape, value: unknown): boolean {
    if (value instanceof Array) {
        const val = new Valigator();
        return value
            .slice(0, end + 1)
            .every((value) => val.validate(value, shape));
    }

    return false;
}

/**
 * Checks that values up to an index value in an array matches some shape
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether they all match
 */
export const upto: TValidator = run(_upto, "upto");
export default upto;
