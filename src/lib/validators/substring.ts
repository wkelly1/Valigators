import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _substring<T>(inner: string, value: T): boolean {
    return String(value).includes(inner.toString());
}

/**
 * Checks whether a value converted to a string contains a specific substring inner
 * @param inner Substring to check for (converted to string)
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether it contains substring
 */
export const substring: TValidator = run(_substring, "substring");
export default substring;
