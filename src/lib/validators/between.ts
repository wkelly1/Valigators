import Valigator from "../..";
import { run } from "../Helpers";
import { TShape, TValidator } from "../Valigators.types";

function _between(
    start: number,
    end: number,
    shape: TShape,
    value: unknown
): boolean {
    if (value instanceof Array) {
        const val = new Valigator();
        return value
            .slice(start, end + 1)
            .every((value) => val.validate(value, shape));
    }

    return false;
}

/**
 * Checks that every value in an array between a start and end index matches some shape
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether they all match
 */
export const between: TValidator = run(_between, "between");
export default between;
