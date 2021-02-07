import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";
import { isNumber } from "./isNumber";
import { isString } from "./isString";

function _containsSymbol<T>(value: T): boolean {
    if (isNumber(value) || isString(value)) {
        return /[[\]|\\/~^:,;?!&%$@*+\-_#}{<>.=_)(£]/.test(String(value));
    }
    if (value instanceof Array) {
        return value.some((val) =>
            /[[\]|\\/~^:,;?!&%$@*+\-_#}{<>.=_)(£]/.test(val.toString())
        );
    }
    return false;
}

/**
 * Checks whether the value converted to string contains a symbol
 * With arrays it will check that any of the values contain a symbol
 *
 * @param value Value to check
 * @returns {boolean} Boolean value representing whether contains a symbol
 */
export const containsSymbol: TValidator = run(
    _containsSymbol,
    "containsSymbol"
);
export default containsSymbol;
