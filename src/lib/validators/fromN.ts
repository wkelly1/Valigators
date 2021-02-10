import Valigator from "../..";
import { run } from "../Helpers";
import { TShape, TValidator } from "../Valigators.types";

function _fromN(start: number, shape: TShape, value: unknown): boolean {
    if (value instanceof Array) {
        const val = new Valigator();
        return value.slice(start).every((value) => val.validate(value, shape));
    }

    return false;
}

/**
 * Checks that values from a start index in an array matches some shape
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether values from start index match
 */
export const fromN: TValidator = run(_fromN, "fromN");
export default fromN;
