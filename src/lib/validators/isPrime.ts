import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

function _isPrime<T>(value: T): boolean {
    if (typeof value === "number") {
        if (value <= 1) {
            return false;
        }

        if (value <= 3) {
            return true;
        }

        if (value % 2 === 0 || value % 3 === 0) {
            return false;
        }

        let i = 5;
        while (i * i <= value) {
            if (value % i === 0 || value % (i + 2) === 0) {
                return false;
            }
            i += 6;
        }

        return true;
    }

    return false;
}

/**
 * Checks whether a value is a number and whether that number is prime
 * @param value Value to check
 * @returns {boolean} Boolean representing whether is a prime or not
 */
export const isPrime: TValidator = run(_isPrime, "isPrime");
export default isPrime;
