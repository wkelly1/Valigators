import Valigator from "../..";
import { run } from "../Helpers";
import { TShape, TValidator } from "../Valigators.types";

function _some(shape: TShape, value: unknown): boolean {
    if (Array.isArray(value)) {
        const val = new Valigator();
        return value.some((value) => val.validate(value, shape));
    }

    return false;
}

/**
 * Checks that some values in an array matches some shape
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether some match
 */
export const some: TValidator = run(_some, "some");
export default some;
