import {
    minMaxLength,
    minLength,
    maxLength,
    customValidator,
    Valigator,
    isString,
    length,
    isNumber,
    isArray,
    substring,
    maxDecimalPoint,
    minDecimalPoint,
    oneOf,
    decimalPoints,
    containsNumber,
    containsUpper,
    containsLower,
    containsSymbol,
    containsRegex,
    or,
    isInstanceOf,
    isEven,
    isOdd,
    isPrime,
    isSquare,
    isCube,
    isNegative,
    isPositive,
    equals,
} from "../src/lib/Valigators";
import { TShape, TValidator } from "../src/lib/Valigators.types";

test("Testing isString", () => {
    expect(isString("t")).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(1.1)).toBe(false);
    expect(isString({ test: "test" })).toBe(false);
    expect(isString([])).toBe(false);
});

test("Testing isNumber", () => {
    expect(isNumber("t")).toBe(false);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber({ test: "test" })).toBe(false);
    expect(isNumber([])).toBe(false);
});

test("Testing isArray", () => {
    expect(isArray("t")).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(1.1)).toBe(false);
    expect(isArray({ test: "test" })).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(["1", "2"])).toBe(true);
});

test("Testing minLength", () => {
    expect(minLength(5)("testt")).toBe(true);
    expect(minLength(5)("testing")).toBe(true);
    expect(minLength(5)("t")).toBe(false);
    expect(minLength(5)("test")).toBe(false);
    expect(minLength(5)(11111)).toBe(true);
    expect(minLength(5)(1111111)).toBe(true);
    expect(minLength(5)(1)).toBe(false);
    expect(minLength(5)(1111)).toBe(false);
    expect(minLength(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(minLength(5)([1, 1, 1, 1, 1, 1, 1])).toBe(true);
    expect(minLength(5)([1])).toBe(false);
    expect(minLength(5)([1, 1, 1, 1])).toBe(false);
});

test("Testing maxLength", () => {
    expect(maxLength(5)("testt")).toBe(true);
    expect(maxLength(5)("testin")).toBe(false);
    expect(maxLength(5)("t")).toBe(true);
    expect(maxLength(5)("test")).toBe(true);

    expect(maxLength(5)(11111)).toBe(true);
    expect(maxLength(5)(111111)).toBe(false);
    expect(maxLength(5)(1)).toBe(true);
    expect(maxLength(5)(1111)).toBe(true);

    expect(maxLength(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(maxLength(5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(maxLength(5)([1])).toBe(true);
    expect(maxLength(5)([1, 1, 1, 1])).toBe(true);
});

test("Testing minMaxLength", () => {
    expect(minMaxLength(1, 5)("t")).toBe(true);
    expect(minMaxLength(1, 5)("tes")).toBe(true);
    expect(minMaxLength(1, 5)("testi")).toBe(true);
    expect(minMaxLength(1, 5)("testin")).toBe(false);
    expect(minMaxLength(2, 5)("t")).toBe(false);

    expect(minMaxLength(1, 5)(1)).toBe(true);
    expect(minMaxLength(1, 5)(111)).toBe(true);
    expect(minMaxLength(1, 5)(11111)).toBe(true);
    expect(minMaxLength(1, 5)(111111)).toBe(false);
    expect(minMaxLength(2, 5)(1)).toBe(false);

    expect(minMaxLength(1, 5)([1])).toBe(true);
    expect(minMaxLength(1, 5)([1, 1, 1])).toBe(true);
    expect(minMaxLength(1, 5)([1, 1, 1, 1, 1])).toBe(true);
    expect(minMaxLength(1, 5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(minMaxLength(2, 5)([1])).toBe(false);
});

test("Testing length", () => {
    expect(length(5)("t")).toBe(false);
    expect(length(5)("tes")).toBe(false);
    expect(length(5)("testi")).toBe(true);
    expect(length(5)("testin")).toBe(false);

    expect(length(5)(11111)).toBe(true);
    expect(length(5)(111111)).toBe(false);
    expect(length(5)(1)).toBe(false);
    expect(length(5)(1111)).toBe(false);

    expect(length(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(length(5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(length(5)([1])).toBe(false);
    expect(length(5)([1, 1, 1, 1])).toBe(false);
});

test("Testing substring", () => {
    expect(substring("te")("test")).toBe(true);
    expect(substring("te")("tete")).toBe(true);
    expect(substring("te")("et")).toBe(false);
    expect(substring("te")(1)).toBe(false);
    expect(substring("te")(["t", "e"])).toBe(false);
    expect(substring(1)(1234)).toBe(true);
});

test("Testing maxDecimalPoint", () => {
    expect(maxDecimalPoint(0)(1)).toBe(true);
    expect(maxDecimalPoint(0)(1.1)).toBe(false);
    expect(maxDecimalPoint(1)(1.1)).toBe(true);
    expect(maxDecimalPoint(1)(2.444)).toBe(false);
    expect(maxDecimalPoint(5)(2.44444)).toBe(true);

    expect(maxDecimalPoint(1)("tes")).toBe(false);
    expect(maxDecimalPoint(1)("1.1")).toBe(false);
});

test("Testing minDecimalPoint", () => {
    expect(minDecimalPoint(0)(1)).toBe(true);
    expect(minDecimalPoint(0)(1.1)).toBe(true);
    expect(minDecimalPoint(1)(1.1)).toBe(true);
    expect(minDecimalPoint(1)(2.444)).toBe(true);
    expect(minDecimalPoint(5)(2.444)).toBe(false);

    expect(minDecimalPoint(1)("tes")).toBe(false);
    expect(minDecimalPoint(1)("1.1")).toBe(false);
});

test("Testing decimalPoints", () => {
    expect(decimalPoints(0)(1)).toBe(true);
    expect(decimalPoints(0)(1.1)).toBe(false);
    expect(decimalPoints(1)(1.1)).toBe(true);
    expect(decimalPoints(1)(2.444)).toBe(false);
    expect(decimalPoints(3)(2.444)).toBe(true);

    expect(decimalPoints(1)("tes")).toBe(false);
    expect(decimalPoints(1)("1.1")).toBe(false);
});

test("Testing oneOf", () => {
    expect(oneOf([])(1)).toBe(false);
    expect(oneOf([1, 2])(1)).toBe(true);
    expect(oneOf([1, 2])(2)).toBe(true);
    expect(oneOf([1, 2])(3)).toBe(false);

    expect(oneOf([])("1")).toBe(false);
    expect(oneOf(["1", "2"])("1")).toBe(true);
    expect(oneOf(["1", "2"])("2")).toBe(true);
    expect(oneOf(["1", "2"])("3")).toBe(false);
});

test("Testing containsNumber", () => {
    expect(containsNumber("abc")).toBe(false);
    expect(containsNumber("a1c")).toBe(true);
    expect(containsNumber("111")).toBe(true);
    expect(containsNumber(11)).toBe(true);
    expect(containsNumber([])).toBe(false);
    expect(containsNumber([1, 2, 3])).toBe(true);
    expect(containsNumber(["A"])).toBe(false);
    expect(containsNumber({ test: 1 })).toBe(false);
});

test("Testing containsUpper", () => {
    expect(containsUpper("abc")).toBe(false);
    expect(containsUpper("aAc")).toBe(true);
    expect(containsUpper("AAA")).toBe(true);
    expect(containsUpper(11)).toBe(false);
    expect(containsUpper([])).toBe(false);
    expect(containsUpper([1, 2, 3])).toBe(false);
    expect(containsUpper({ test: 1 })).toBe(false);
    expect(containsUpper("AA")).toBe(true);
    expect(containsUpper(["A", "b", "c"])).toBe(true);
    expect(containsUpper(["a", "b", "c"])).toBe(false);
    expect(containsUpper({ test: "A" })).toBe(false);
});

test("Testing containsLower", () => {
    expect(containsLower("abc")).toBe(true);
    expect(containsLower("aAc")).toBe(true);
    expect(containsLower("AAA")).toBe(false);
    expect(containsLower(11)).toBe(false);
    expect(containsLower([])).toBe(false);
    expect(containsLower([1, 2, 3])).toBe(false);
    expect(containsLower({ test: 1 })).toBe(false);
    expect(containsLower("AA")).toBe(false);
    expect(containsLower(["A", "b", "c"])).toBe(true);
    expect(containsLower(["a", "b", "c"])).toBe(true);
    expect(containsLower(["A", "B", "C"])).toBe(false);
    expect(containsLower({ test: "A" })).toBe(false);
});

test("Testing containsSymbol", () => {
    expect(containsSymbol("[")).toBe(true);
    expect(containsSymbol("|")).toBe(true);
    expect(containsSymbol("\\")).toBe(true);
    expect(containsSymbol("/")).toBe(true);
    expect(containsSymbol("~")).toBe(true);
    expect(containsSymbol("^")).toBe(true);
    expect(containsSymbol(":")).toBe(true);
    expect(containsSymbol(",")).toBe(true);
    expect(containsSymbol(";")).toBe(true);
    expect(containsSymbol("?")).toBe(true);
    expect(containsSymbol("!")).toBe(true);
    expect(containsSymbol("&")).toBe(true);
    expect(containsSymbol("%")).toBe(true);
    expect(containsSymbol("$")).toBe(true);
    expect(containsSymbol("@")).toBe(true);
    expect(containsSymbol("*")).toBe(true);
    expect(containsSymbol("+")).toBe(true);
    expect(containsSymbol("]")).toBe(true);
    expect(containsSymbol("-")).toBe(true);
    expect(containsSymbol("_")).toBe(true);
    expect(containsSymbol("#")).toBe(true);
    expect(containsSymbol("{")).toBe(true);
    expect(containsSymbol("}")).toBe(true);
    expect(containsSymbol("<")).toBe(true);
    expect(containsSymbol(">")).toBe(true);
    expect(containsSymbol(".")).toBe(true);
    expect(containsSymbol("=")).toBe(true);
    expect(containsSymbol("_")).toBe(true);
    expect(containsSymbol("(")).toBe(true);
    expect(containsSymbol(")")).toBe(true);
    expect(containsSymbol("£")).toBe(true);

    expect(containsSymbol("aAc")).toBe(false);
    expect(containsSymbol("AAA")).toBe(false);
    expect(containsSymbol(11)).toBe(false);
    expect(containsSymbol([])).toBe(false);
    expect(containsSymbol([1, 2, 3])).toBe(false);
    expect(containsSymbol({ test: 1 })).toBe(false);
    expect(containsSymbol("AA")).toBe(false);
    expect(containsSymbol(["A", "b", "c"])).toBe(false);
    expect(containsSymbol(["a", "b", "c"])).toBe(false);
    expect(containsSymbol(["A", "B", "C"])).toBe(false);
    expect(containsSymbol({ test: "A" })).toBe(false);
});

test("Testing containsRegex", () => {
    expect(containsRegex(/[A-Z]/)("aAc")).toBe(true);
    expect(containsRegex(/[A-Z]/)("AAA")).toBe(true);
    expect(containsRegex(/[A-Z]/)(11)).toBe(false);
    expect(containsRegex(/[A-Z]/)([])).toBe(false);
    expect(containsRegex(/[A-Z]/)([1, 2, 3])).toBe(false);
    expect(containsRegex(/[A-Z]/)({ test: 1 })).toBe(false);
    expect(containsRegex(/[A-Z]/)("AA")).toBe(true);
    expect(containsRegex(/[A-Z]/)(["A", "b", "c"])).toBe(true);
    expect(containsRegex(/[A-Z]/)(["a", "b", "c"])).toBe(false);
    expect(containsRegex(/[A-Z]/)(["A", "B", "C"])).toBe(true);
    expect(containsRegex(/[A-Z]/)({ test: "A" })).toBe(false);
});

test("Testing or", () => {
    expect(or([isString, isNumber])("aAc")).toBe(true);
    expect(or([isNumber])("aAc")).toBe(false);
    expect(or([containsSymbol, containsUpper])("aAc")).toBe(true);
    expect(or([containsSymbol, containsUpper])("aac")).toBe(false);
    expect(or([containsSymbol, containsUpper])("£ss")).toBe(true);
});

test("Testing isInstanceOf", () => {
    const str = "The website is appdividend";
    const myString = new String();
    const nStr = new String("String created with constructor");
    const mDate = new Date();
    const mObj = {};
    const mNonObj = Object.create(null);

    expect(isInstanceOf(String)(str)).toBe(false);
    expect(isInstanceOf(String)(myString)).toBe(true);
    expect(isInstanceOf(String)(nStr)).toBe(true);
    expect(isInstanceOf(Date)(mDate)).toBe(true);
    expect(isInstanceOf(Object)(mObj)).toBe(true);
    expect(isInstanceOf(Object)(mNonObj)).toBe(false);
});

test("Testing isEven", () => {
    expect(isEven(-1)).toBe(false);
    expect(isEven(0)).toBe(false);
    expect(isEven(1)).toBe(false);
    expect(isEven(2)).toBe(true);
    expect(isEven(100)).toBe(true);
    expect(isEven("sfd")).toBe(false);
});

test("Testing isOdd", () => {
    expect(isOdd(-1)).toBe(false);
    expect(isOdd(0)).toBe(false);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(100)).toBe(false);
    expect(isOdd(101)).toBe(true);
    expect(isOdd("sfd")).toBe(false);
});

test("Testing isPrime", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(8)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(10)).toBe(false);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(30)).toBe(false);
    expect(isPrime(32)).toBe(false);
    expect(isPrime(33)).toBe(false);
    expect(isPrime(34)).toBe(false);
    expect(isPrime(35)).toBe(false);
    expect(isPrime(13)).toBe(true);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(19)).toBe(true);
    expect(isPrime(71)).toBe(true);
    expect(isPrime(181)).toBe(true);
    expect(isPrime(1698)).toBe(false);
    expect(isPrime(1699)).toBe(true);
    expect(isPrime(-1)).toBe(false);
    expect(isPrime("sdfd")).toBe(false);
    expect(isPrime([1, 2, 3])).toBe(false);
    expect(isPrime({ test: "dsfdf" })).toBe(false);
});

test("Testing isSquare", () => {
    expect(isSquare(1)).toBe(true);
    expect(isSquare(2)).toBe(false);
    expect(isSquare(3)).toBe(false);
    expect(isSquare(4)).toBe(true);
    expect(isSquare(5)).toBe(false);
    expect(isSquare(6)).toBe(false);
    expect(isSquare(7)).toBe(false);
    expect(isSquare(8)).toBe(false);
    expect(isSquare(9)).toBe(true);
    expect(isSquare(10)).toBe(false);
    expect(isSquare(16)).toBe(true);
    expect(isSquare(25)).toBe(true);
    expect(isSquare(30)).toBe(false);
    expect(isSquare(31)).toBe(false);
    expect(isSquare(32)).toBe(false);
    expect(isSquare(33)).toBe(false);
    expect(isSquare(36)).toBe(true);
    expect(isSquare(49)).toBe(true);
    expect(isSquare(64)).toBe(true);
    expect(isSquare(81)).toBe(true);
    expect(isSquare(100)).toBe(true);
    expect(isSquare(104)).toBe(false);
    expect(isSquare(361)).toBe(true);
    expect(isSquare(360)).toBe(false);

    expect(isSquare("sdfd")).toBe(false);
    expect(isSquare([1, 2, 3])).toBe(false);
    expect(isSquare({ test: "dsfdf" })).toBe(false);
});

test("Testing isCube", () => {
    expect(isCube(1)).toBe(true);
    expect(isCube(2)).toBe(false);
    expect(isCube(3)).toBe(false);
    expect(isCube(4)).toBe(false);
    expect(isCube(5)).toBe(false);
    expect(isCube(6)).toBe(false);
    expect(isCube(7)).toBe(false);
    expect(isCube(8)).toBe(true);
    expect(isCube(9)).toBe(false);
    expect(isCube(10)).toBe(false);
    expect(isCube(27)).toBe(true);
    expect(isCube(28)).toBe(false);
    expect(isCube(64)).toBe(true);
    expect(isCube(125)).toBe(true);
    expect(isCube(216)).toBe(true);
    expect(isCube(343)).toBe(true);

    expect(isCube(-1)).toBe(false);
    expect(isCube(-2)).toBe(false);
    expect(isCube(-3)).toBe(false);
    expect(isCube(-10)).toBe(false);
    expect(isCube("sdfd")).toBe(false);
    expect(isCube([1, 2, 3])).toBe(false);
    expect(isCube({ test: "dsfdf" })).toBe(false);
});

test("Testing isNegative", () => {
    expect(isNegative(-100)).toBe(true);
    expect(isNegative(-50)).toBe(true);
    expect(isNegative(-10)).toBe(true);
    expect(isNegative(-1)).toBe(true);
    expect(isNegative(0)).toBe(false);
    expect(isNegative(100)).toBe(false);
    expect(isNegative(50)).toBe(false);
    expect(isNegative(10)).toBe(false);
    expect(isNegative(1)).toBe(false);

    expect(isNegative("sdfd")).toBe(false);
    expect(isNegative([1, 2, 3])).toBe(false);
    expect(isNegative({ test: "dsfdf" })).toBe(false);
});

test("Testing isPositive", () => {
    expect(isPositive(-100)).toBe(false);
    expect(isPositive(-50)).toBe(false);
    expect(isPositive(-10)).toBe(false);
    expect(isPositive(-1)).toBe(false);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(100)).toBe(true);
    expect(isPositive(50)).toBe(true);
    expect(isPositive(10)).toBe(true);
    expect(isPositive(1)).toBe(true);

    expect(isPositive("sdfd")).toBe(false);
    expect(isPositive([1, 2, 3])).toBe(false);
    expect(isPositive({ test: "dsfdf" })).toBe(false);
});

test("Testing equals", () => {
    expect(equals(1)(1)).toBe(true);
    expect(equals(1)(2)).toBe(false);
    expect(equals("test")("test")).toBe(true);
    expect(equals("test")("te")).toBe(false);
    expect(equals([1, 2, 3])([1, 2, 3])).toBe(true);
    expect(equals([1, 2, 3])([1, 2])).toBe(false);
    expect(equals({ test: "test" })({ test: "test" })).toBe(true);
    expect(
        equals({ test: { test2: "test2" } })({ test: { test2: "test2" } })
    ).toBe(true);
    expect(
        equals({ test: { test2: "test" } })({ test: { test2: "test2" } })
    ).toBe(false);
    expect(
        equals({ test: { test: "test2" } })({ test: { test2: "test2" } })
    ).toBe(false);
});

test("Testing Validate catches incorrect shape", () => {
    const validate = new Valigator();

    expect(() => validate.validate("hi", { test: "test" })).toThrow(
        "Invalid shape object"
    );
    expect(() =>
        validate.validate("hi", { type: "test", other: 2 } as any)
    ).toThrow("Invalid shape object");
    expect(() =>
        validate.validate("hi", { test: "test", other: { test: 1 } } as any)
    ).toThrow("Invalid shape object");
    expect(() => validate.validate({ example: "hi" }, [] as any)).toThrow(
        "Invalid value for property shape"
    );
});

test("Testing Validate on text", () => {
    const validate = new Valigator();

    expect(
        validate.validate("hi", {
            type: "text",
        })
    ).toBe(true);

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            { name: "bob", lastName: "bar" },
            {
                name: {
                    type: "text",
                },
                lastName: {
                    type: "text",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            { name: { lastName: "bar" } },
            {
                name: {
                    lastName: {
                        type: "text",
                    },
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            { name: { lastName: "bar" } },
            {
                name: {
                    type: "text",
                },
            }
        )
    ).toBe(false);

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                },
                lastName: {
                    type: "text",
                },
            }
        )
    ).toBe(false);

    expect(
        validate.validate(
            { name: "bob", other: "foo" },
            {
                name: {
                    type: "text",
                },
            }
        )
    ).toBe(false);

    expect(
        validate.validate("bob", {
            name: {
                lastName: {
                    type: "text",
                },
            },
        })
    ).toBe(false);

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    age: {
                        type: "text",
                    },
                },
            }
        )
    ).toBe(false);
});

test("Testing validate on required parameters", () => {
    const validate = new Valigator();
    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    required: false,
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            {},
            {
                name: {
                    type: "text",
                    required: false,
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    required: true,
                },
                other1: {
                    type: "text",
                    required: false,
                },
            }
        )
    ).toBe(true);
});

test("Testing default validators", () => {
    const validate = new Valigator();
    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "number",
                },
            }
        )
    ).toBe(false);
    expect(
        validate.validate(
            { name: 1 },
            {
                name: {
                    type: "number",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate("hi", {
            type: "number",
        })
    ).toBe(false);

    expect(
        validate.validate(
            { name: [1, 2, 3] },
            {
                name: {
                    type: "array",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate("hi", {
            type: "array",
        })
    ).toBe(false);

    expect(
        validate.validate(
            { name: true },
            {
                name: {
                    type: "boolean",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate("hi", {
            type: "boolean",
        })
    ).toBe(false);

    expect(
        validate.validate(
            { name: "test@test.com" },
            {
                name: {
                    type: "email",
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate("hi", {
            type: "email",
        })
    ).toBe(false);

    expect(
        validate.validate(1, {
            type: "email",
        })
    ).toBe(false);
});

test("Testing additional validators", () => {
    const validate = new Valigator();
    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    validators: [minLength(1)],
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    validators: [minLength(6)],
                },
            }
        )
    ).toBe(false);

    const cusValidateExample = customValidator(
        (a: unknown, res: unknown) => res === a
    );

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    validators: [cusValidateExample("bob")],
                },
            }
        )
    ).toBe(true);
});

test("Testing custom options", () => {
    const validate = new Valigator({
        messages: {
            invalidValue: "INVALID1",
            unexpectedValue: "INVALID2",
            required: "INVALID3",
        },
        keys: {
            success: "succ",
            message: "mes",
            type: "ty",
            required: "req",
            validators: "val",
        },
        types: {
            test: {
                validators: [],
            },
        },
    });

    expect(() => {
        validate.validate(
            { name: "bob" },
            {
                name: {
                    type: "text",
                    validators: [minLength(1)],
                },
            }
        );
    }).toThrow("Invalid shape object");

    expect(
        validate.validate(
            { name: "bob" },
            {
                name: {
                    ty: "text",
                    val: [minLength(1)],
                    req: false,
                },
            }
        )
    ).toBe(true);

    expect(
        validate.validate(
            {},
            {
                name: {
                    ty: "text",
                    val: [minLength(1)],
                    req: false,
                },
            }
        )
    ).toBe(true);
});

test("Testing required", () => {
    const validate = new Valigator();

    expect(
        validate.validate(
            { name: "" },
            {
                name: {
                    type: "text",
                },
            }
        )
    ).toBe(false);

    expect(
        validate.validate(
            { person: { name: { lastName: "sfs" } } },
            { person: { name: { lastName: { type: "text" } } } }
        )
    ).toBe(true);
});

test("Testing validate_more", () => {
    const validate = new Valigator();
    // Shape matches data
    expect(
        validate.validate_more(
            { name: "sdf", nested: { inner: "hi" } },
            {
                name: {
                    type: "text",
                },
                nested: {
                    inner: {
                        type: "text",
                    },
                },
            }
        )
    ).toEqual({
        success: true,
        values: {
            name: {
                success: true,
            },
            nested: {
                inner: {
                    success: true,
                },
            },
        },
    });

    // Data has more values than shape
    expect(
        validate.validate_more(
            { name: "sdf", nested: { inner: "hi" } },
            {
                name: {
                    type: "text",
                },
            }
        )
    ).toEqual({
        success: false,
        values: {
            name: {
                success: true,
            },
            nested: {
                success: false,
                message: ["Value you provided is unexpected"],
            },
        },
    });

    // Data has extra nested values than shape
    expect(
        validate.validate_more(
            { nested: { inner: "hi" } },
            {
                nested: { inner: { extra: { type: "text" } } },
            }
        )
    ).toEqual({
        success: false,
        values: {
            nested: {
                inner: {
                    extra: {
                        success: false,
                        message: ["Value you provided is unexpected"],
                    },
                },
            },
        },
    });

    // Shape has optional value that data does have
    // TODO: Make decide whether this is the behavior I want
    expect(
        validate.validate_more(
            { foo: "dsf", bar: "dsf" },
            {
                foo: {
                    type: "text",
                },
                bar: {
                    type: "text",
                    required: false,
                },
            }
        )
    ).toEqual({
        success: true,
        values: {
            foo: {
                success: true,
            },
            bar: {
                success: true,
            },
        },
    });

    // Shape has optional value that data does not have
    expect(
        validate.validate_more(
            { foo: "dsf" },
            {
                foo: {
                    type: "text",
                },
                bar: {
                    type: "text",
                    required: false,
                },
            }
        )
    ).toEqual({
        success: true,
        values: {
            foo: {
                success: true,
            },
        },
    });

    // Shape has required value that shape does not have
    expect(
        validate.validate_more(
            { foo: "dsf" },
            {
                foo: {
                    type: "text",
                },
                bar: {
                    type: "text",
                },
            }
        )
    ).toEqual({
        success: false,
        values: {
            bar: {
                success: false,
                message: ["Value is required but is missing"],
            },
            foo: {
                success: true,
            },
        },
    });

    // Additional validators pass
    expect(
        validate.validate_more(
            { foo: "dsf" },
            {
                foo: {
                    type: "text",
                    validators: [minLength(2)],
                },
            }
        )
    ).toEqual({
        success: true,
        values: {
            foo: {
                success: true,
            },
        },
    });

    // Additional validators fail
    expect(
        validate.validate_more(
            { foo: "dsf" },
            {
                foo: {
                    type: "text",
                    validators: [minLength(5)],
                },
            }
        )
    ).toEqual({
        success: false,
        values: {
            foo: {
                success: false,
                message: ["Invalid value for data"],
            },
        },
    });

    // Custom error messages
    expect(
        validate.validate_more(
            { foo: "dsf" },
            {
                foo: {
                    type: "text",
                    validators: [minLength(5), maxLength(3)],
                    messages: {
                        minLength: "Test message",
                        maxLength: "Test message 2",
                    },
                },
            }
        )
    ).toEqual({
        success: false,
        values: {
            foo: {
                success: false,
                message: ["Test message", "Test message 2"],
            },
        },
    });
});
