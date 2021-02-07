// export type TValidator = (...args: any[]) => boolean;
export type TValidatorVal = (arg: unknown) => boolean;
// export type TValidator = (...arg: unknown[]) => any
export interface TValidator {
    (...arg: any[]): any;
    id?: string;
}

export type TTypes = {
    validators: TValidator[];
};

export type TOptions = {
    messages?: {
        invalidValue?: string;
        unexpectedValue?: string;
        required?: string;
    };
    keys?: {
        success?: string;
        message?: string;
        type?: string;
        required?: string;
        validators?: string;
    };
    types?: Record<string, TTypes>;
    requiredValues?: unknown[];
};

type TMessages = {
    [key: string]: string[];
};

export type TShape = {
    [key: string]: string | TValidatorVal[] | boolean | TShape | TMessages;
};

export type TMsg = {
    [key: string]: {
        [key: string]: boolean | string;
    };
};
