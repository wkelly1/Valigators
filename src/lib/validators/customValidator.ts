import { run } from "../Helpers";
import { TValidator } from "../Valigators.types";

export function customValidator<T extends (...args: unknown[]) => boolean>(
    func: T,
    identifier?: string
): TValidator {
    return run(func, identifier ? identifier : "");
}

export default customValidator;
