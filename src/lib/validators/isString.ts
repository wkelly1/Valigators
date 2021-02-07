import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

let _isString: TValidator;
_isString = function (value: unknown): boolean {
    return typeof value === "string";
};

/**
 * Checks if value is a string
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether string or not
 */
export const isString: TValidator = run(_isString, "isString");
export default isString;
