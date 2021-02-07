import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _oneOf(elems: unknown[], value: unknown): boolean {
    return elems.includes(value);
}

/**
 * Takes an array and checks that the value matches on of the elements in the array
 * @param elems Elements value could be
 * @param value Value to check
 * @returns {boolean} Boolean representing whether the value matches one of the elems
 */
export const oneOf: TValidator = run(_oneOf, "oneOf");
export default oneOf;
