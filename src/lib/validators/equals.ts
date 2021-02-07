import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _equals(equal: any, value: any): boolean {
    if (typeof equal === "object" && typeof value === "object") {
        // SOURCE: https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
        const type = Object.prototype.toString.call(value);

        if (type !== Object.prototype.toString.call(equal)) return false;

        if (["[object Array]", "[object Object]"].indexOf(type) < 0)
            return false;

        const valueLen =
            type === "[object Array]"
                ? value.length
                : Object.keys(value).length;
        const otherLen =
            type === "[object Array]"
                ? equal.length
                : Object.keys(equal).length;

        if (valueLen !== otherLen) return false;

        const compare = function (item1: any, item2: any) {
            const itemType = Object.prototype.toString.call(item1);

            if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
                if (!_equals(item1, item2)) return false;
            } else {
                if (itemType !== Object.prototype.toString.call(item2))
                    return false;

                if (itemType === "[object Function]") {
                    if (item1.toString() !== item2.toString()) return false;
                } else {
                    if (item1 !== item2) return false;
                }
            }
        };

        if (type === "[object Array]") {
            for (let i = 0; i < valueLen; i++) {
                if (compare(value[i], equal[i]) === false) return false;
            }
        } else {
            for (const key in value) {
                if (Object.hasOwnProperty.call(value, key)) {
                    if (compare(value[key], equal[key]) === false) return false;
                }
            }
        }

        // If nothing failed, return true
        return true;
    }
    return equal === value;
}

/**
 * Checks whether the value is equal to a specified value using ===
 * @param equal Value to check equals to
 * @param value Value to check
 * @returns {boolean} {boolean} Boolean representing if they are equal
 */
export const equals: TValidator = run(_equals, "equals");
export default equals;
