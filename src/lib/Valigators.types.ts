// export type TValidator = (...args: any[]) => boolean;
export type TValidatorVal = (arg: unknown) => boolean;
export type TValidator = (...arg: unknown[]) => any;

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
};

export type TShape = {
    [key: string]: string | TValidatorVal[] | boolean | TShape;
};

// export type TShape =
//     | {
//           [key: string]: {
//               [key: string]: string | TValidatorVal[] | boolean | TSubShape;
//           };
//       }
//     | TSubShape;

export type TMsg = {
    [key: string]: {
        [key: string]: boolean | string;
    };
};
