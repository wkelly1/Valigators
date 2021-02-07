import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _or(validators: TValidator[], value: unknown): boolean {
    console.log("res: ", run(validators[0], "")(value));
    return validators.some((validator) => run(validator, "")(value));
}

/**
 * Used if you you don't mind if some of the validators fail as long as one passes
 *
 * @param validators Functions to run
 * @param value Value to check
 * @returns {boolean} Boolean value if one of the functions passes
 */
export const or: TValidator = run(_or, "or");
export default or;
