import minMaxLength from "../src/lib/validators/minMaxLength";
import minLength from "../src/lib/validators/minLength";
import maxLength from "../src/lib/validators/maxLength";
import customValidator from "../src/lib/validators/customValidator";
import isString from "../src/lib/validators/isString";
import length from "../src/lib/validators/length";
import isNumber from "../src/lib/validators/isNumber";
import isArray from "../src/lib/validators/isArray";
import isNull from "../src/lib/validators/isNull";
import maxDecimalPoint from "../src/lib/validators/maxDecimalPoint";
import minDecimalPoint from "../src/lib/validators/minDecimalPoint";
import oneOf from "../src/lib/validators/oneOf";
import decimalPoints from "../src/lib/validators/decimalPoints";
import containsNumber from "../src/lib/validators/containsNumber";
import containsUpper from "../src/lib/validators/containsUpper";
import containsLower from "../src/lib/validators/containsLower";
import containsSymbol from "../src/lib/validators/containsSymbol";
import containsRegex from "../src/lib/validators/containsRegex";
import or from "../src/lib/validators/or";
import isInstanceOf from "../src/lib/validators/isInstanceOf";
import isEven from "../src/lib/validators/isEven";
import isOdd from "../src/lib/validators/isOdd";
import isPrime from "../src/lib/validators/isPrime";
import isSquare from "../src/lib/validators/isSquare";
import isCube from "../src/lib/validators/isCube";
import isNegative from "../src/lib/validators/isNegative";
import isPositive from "../src/lib/validators/isPositive";
import equals from "../src/lib/validators/equals";
import Valigator, { substring } from "../src";

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

test("Testing isNull", () => {
    expect(isNull("t")).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(1.1)).toBe(false);
    expect(isNull({ test: "test" })).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull([1, 2, 3])).toBe(false);
    expect(isNull(["1", "2"])).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
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

// test("Testing isDateString", () => {
//     expect(isDateString("")).toBe(false);
//     expect(isDateString("01")).toBe(false);
//     expect(isDateString("01/02")).toBe(false);
//     expect(isDateString("01/02/2020")).toBe(true);
//     expect(isDateString("1st July 2020")).toBe(false);
//     expect(isDateString("01 July 2020")).toBe(true);
//     expect(isDateString("1 July 2020")).toBe(true);
//     expect(isDateString("1 July 2020 00:00:00")).toBe(true);
//     expect(isDateString("1 July 2020 00:00:00 GMT")).toBe(true);
// });

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

test("Testing types", () => {
    const validate = new Valigator();

    //text
    expect(validate.validate("test", { type: "text" })).toBe(true);
    expect(validate.validate(1, { type: "text" })).toBe(false);

    // number
    expect(validate.validate(1, { type: "number" })).toBe(true);
    expect(validate.validate("sdfklj", { type: "number" })).toBe(false);

    // array
    expect(validate.validate([1, 2, 3], { type: "array" })).toBe(true);
    expect(validate.validate(["1", "2", "3"], { type: "array" })).toBe(true);
    expect(validate.validate(1, { type: "array" })).toBe(false);

    // phone
    expect(validate.validate("07123456789", { type: "phone" })).toBe(true);
    expect(validate.validate("+949147248435", { type: "phone" })).toBe(true);
    expect(validate.validate("786-245-2415", { type: "phone" })).toBe(true);
    expect(validate.validate("sdf", { type: "phone" })).toBe(false);
    expect(validate.validate("123", { type: "phone" })).toBe(false);
    expect(validate.validate("071234567893333", { type: "phone" })).toBe(false);
    expect(validate.validate("+233", { type: "phone" })).toBe(false);
    expect(validate.validate(1, { type: "phone" })).toBe(false);

    //date
    expect(validate.validate(new Date("01/02/2020"), { type: "date" })).toBe(
        true
    );
    expect(validate.validate(1, { type: "date" })).toBe(false);
    expect(validate.validate("sdf", { type: "date" })).toBe(false);

    //date_string
    expect(validate.validate("01/02/2020", { type: "date_string" })).toBe(true);
    expect(validate.validate("1/2/2020", { type: "date_string" })).toBe(true);
    expect(validate.validate("01-02-2020", { type: "date_string" })).toBe(true);
    expect(validate.validate("0102", { type: "date_string" })).toBe(false);
    expect(validate.validate("01/02", { type: "date_string" })).toBe(false);
    expect(validate.validate("01", { type: "date_string" })).toBe(false);
    expect(validate.validate("01:02:2020", { type: "date_string" })).toBe(
        false
    );
    expect(validate.validate(1, { type: "date_string" })).toBe(false);

    // time_hhmm_12h
    expect(validate.validate("10:20", { type: "time_hhmm_12h" })).toBe(true);
    expect(validate.validate("12:00", { type: "time_hhmm_12h" })).toBe(true);
    expect(validate.validate("05:10", { type: "time_hhmm_12h" })).toBe(true);
    expect(validate.validate("5:10", { type: "time_hhmm_12h" })).toBe(true);
    expect(validate.validate("13:10", { type: "time_hhmm_12h" })).toBe(false);
    expect(validate.validate("13:10:22", { type: "time_hhmm_12h" })).toBe(
        false
    );
    expect(validate.validate("10:10:22", { type: "time_hhmm_12h" })).toBe(
        false
    );
    expect(validate.validate("10:10:60", { type: "time_hhmm_12h" })).toBe(
        false
    );
    expect(validate.validate(1, { type: "time_hhmm_12h" })).toBe(false);

    // time_hhmm_24h
    expect(validate.validate("10:20", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("12:00", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("05:10", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("5:10", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("13:10", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("15:10", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("00:00", { type: "time_hhmm_24h" })).toBe(true);
    expect(validate.validate("13:10:22", { type: "time_hhmm_24h" })).toBe(
        false
    );
    expect(validate.validate("10:10:22", { type: "time_hhmm_24h" })).toBe(
        false
    );
    expect(validate.validate("10:10:60", { type: "time_hhmm_24h" })).toBe(
        false
    );
    expect(validate.validate(1, { type: "time_hhmm_24h" })).toBe(false);

    // time_hhmmss_12h
    expect(validate.validate("10:20", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("12:00", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("05:10", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("5:10", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("13:10", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("15:10", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("00:00", { type: "time_hhmmss_12h" })).toBe(false);
    expect(validate.validate("13:10:22", { type: "time_hhmmss_12h" })).toBe(
        false
    );
    expect(validate.validate("10:10:22", { type: "time_hhmmss_12h" })).toBe(
        true
    );
    expect(validate.validate("09:20:22", { type: "time_hhmmss_12h" })).toBe(
        true
    );
    expect(validate.validate("1:12:22", { type: "time_hhmmss_12h" })).toBe(
        true
    );
    expect(validate.validate("10:10:60", { type: "time_hhmmss_12h" })).toBe(
        false
    );
    expect(validate.validate("10:61:60", { type: "time_hhmmss_12h" })).toBe(
        false
    );
    expect(validate.validate("14:42:60", { type: "time_hhmmss_12h" })).toBe(
        false
    );
    expect(validate.validate(1, { type: "time_hhmmss_12h" })).toBe(false);

    // time_hhmmss_24h
    expect(validate.validate("10:20", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("12:00", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("05:10", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("5:10", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("13:10", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("15:10", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("00:00", { type: "time_hhmmss_24h" })).toBe(false);
    expect(validate.validate("13:10:22", { type: "time_hhmmss_24h" })).toBe(
        true
    );
    expect(validate.validate("10:10:22", { type: "time_hhmmss_24h" })).toBe(
        true
    );
    expect(validate.validate("09:20:22", { type: "time_hhmmss_24h" })).toBe(
        true
    );
    expect(validate.validate("1:12:22", { type: "time_hhmmss_24h" })).toBe(
        true
    );
    expect(validate.validate("10:10:60", { type: "time_hhmmss_24h" })).toBe(
        false
    );
    expect(validate.validate("13:10:60", { type: "time_hhmmss_24h" })).toBe(
        false
    );
    expect(validate.validate("13:10:25", { type: "time_hhmmss_24h" })).toBe(
        true
    );
    expect(validate.validate("10:61:60", { type: "time_hhmmss_24h" })).toBe(
        false
    );
    expect(validate.validate(1, { type: "time_hhmmss_24h" })).toBe(false);

    // password
    expect(validate.validate("aA1!bcdef", { type: "password" })).toBe(true);
    expect(validate.validate("123456789", { type: "password" })).toBe(false);
    expect(validate.validate("abcdefghi", { type: "password" })).toBe(false);
    expect(validate.validate("ABCDEFGHI", { type: "password" })).toBe(false);
    expect(validate.validate("!)£$%^&*(", { type: "password" })).toBe(false);
    expect(validate.validate("aA1!bcd", { type: "password" })).toBe(false);
    expect(validate.validate("aA1bcdefg", { type: "password" })).toBe(false);
    expect(validate.validate("aA!bcdefg", { type: "password" })).toBe(false);
    expect(validate.validate("a!bcdefgh", { type: "password" })).toBe(false);
    expect(validate.validate(1, { type: "password" })).toBe(false);

    expect(validate.validate("+10,-12", { type: "longitude_latitude" })).toBe(
        true
    );
    expect(
        validate.validate("+10.0,-12.0", { type: "longitude_latitude" })
    ).toBe(true);
    expect(
        validate.validate("+10.123,-12.123", { type: "longitude_latitude" })
    ).toBe(true);
    expect(validate.validate("22,22", { type: "longitude_latitude" })).toBe(
        true
    );
    expect(validate.validate("-22,-22", { type: "longitude_latitude" })).toBe(
        true
    );
    expect(
        validate.validate("-22.12345678,-22.12345678", {
            type: "longitude_latitude",
        })
    ).toBe(true);
    expect(
        validate.validate("-22.12345678-22.12345678", {
            type: "longitude_latitude",
        })
    ).toBe(false);
    expect(
        validate.validate("fdgfd", {
            type: "longitude_latitude",
        })
    ).toBe(false);
    expect(
        validate.validate("233", {
            type: "longitude_latitude",
        })
    ).toBe(false);
    expect(
        validate.validate(",233", {
            type: "longitude_latitude",
        })
    ).toBe(false);
    expect(validate.validate(1, { type: "longitude_latitude" })).toBe(false);

    expect(
        validate.validate("123456789123", { type: "credit_card_number" })
    ).toBe(false);
    expect(
        validate.validate("5191511922153163", { type: "credit_card_number" })
    ).toBe(true);
    expect(
        validate.validate("320627372171367", { type: "credit_card_number" })
    ).toBe(false);
    expect(
        validate.validate("38522568168237", { type: "credit_card_number" })
    ).toBe(true);
    expect(validate.validate("sdf", { type: "credit_card_number" })).toBe(
        false
    );
    expect(
        validate.validate("1234566660000222", { type: "credit_card_number" })
    ).toBe(false);
    expect(validate.validate(1, { type: "credit_card_number" })).toBe(false);

    expect(validate.validate("0.0.0.0", { type: "ipv4_address" })).toBe(true);
    expect(validate.validate("255.255.255.255", { type: "ipv4_address" })).toBe(
        true
    );
    expect(validate.validate("1.1.1.1", { type: "ipv4_address" })).toBe(true);
    expect(validate.validate("192.168.2.144", { type: "ipv4_address" })).toBe(
        true
    );
    expect(validate.validate("256.265.256.256", { type: "ipv4_address" })).toBe(
        false
    );
    expect(validate.validate("1.1.1", { type: "ipv4_address" })).toBe(false);
    expect(validate.validate("1.1", { type: "ipv4_address" })).toBe(false);
    expect(validate.validate("1", { type: "ipv4_address" })).toBe(false);
    expect(validate.validate(1, { type: "ipv4_address" })).toBe(false);

    expect(
        validate.validate("2035:0db8:15a3:0000:0000:8a2e:0370:7334", {
            type: "ipv6_address",
        })
    ).toBe(true);
    expect(
        validate.validate("FE80:0000:0000:0000:0202:B3FF:FE1E:8329", {
            type: "ipv6_address",
        })
    ).toBe(true);
    expect(
        validate.validate("2155:225:2CA1:0000:0000:527:5553:12b5", {
            type: "ipv6_address",
        })
    ).toBe(true);
    expect(
        validate.validate("2314:0415:2CC1::0167:5653:23b5", {
            type: "ipv6_address",
        })
    ).toBe(true);
    expect(
        validate.validate("1.1.1.1", {
            type: "ipv6_address",
        })
    ).toBe(false);
    expect(
        validate.validate("192.168.1.1", {
            type: "ipv6_address",
        })
    ).toBe(false);
    expect(
        validate.validate("asdfads", {
            type: "ipv6_address",
        })
    ).toBe(false);
    expect(validate.validate(1, { type: "ipv6_address" })).toBe(false);

    expect(validate.validate("https://test.com", { type: "url" })).toBe(true);
    expect(validate.validate("https://www.test.com", { type: "url" })).toBe(
        true
    );
    expect(
        validate.validate("https://subdomain.test.com", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("https://subdomain.test.co.uk", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("https://subdomain.test.ac.uk", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("https://subdomain.test.ac.uk", { type: "url" })
    ).toBe(true);
    expect(validate.validate("http://test.com", { type: "url" })).toBe(true);
    expect(validate.validate("http://www.test.com", { type: "url" })).toBe(
        true
    );
    expect(
        validate.validate("http://subdomain.test.com", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("http://subdomain.test.co.uk", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("http://subdomain.test.ac.uk", { type: "url" })
    ).toBe(true);
    expect(
        validate.validate("http://subdomain.test.ac.uk", { type: "url" })
    ).toBe(true);
    expect(validate.validate("subdomain.test.ac.uk", { type: "url" })).toBe(
        false
    );
    expect(validate.validate("test.ac.uk", { type: "url" })).toBe(false);
    expect(validate.validate("test", { type: "url" })).toBe(false);
    expect(validate.validate(1, { type: "url" })).toBe(false);
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
            messages: "mes",
            validationErrors: "valErr",
            validator: "val2",
        },
        types: {
            test: {
                validators: [],
            },
        },
        requiredValues: ["", null],
    });

    expect(() => {
        new Valigator({ types: { test: {} as any } });
    }).toThrow("Types need to have an array of validators");

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

    expect(
        validate.validate_more(
            { name: "test", email: "", message: "", cv: false },
            {
                name: {
                    type: "text",
                    validators: [minMaxLength(1, 100)],
                },
                email: {
                    type: "text",
                    validators: [minMaxLength(1, 100)],
                },
                message: {
                    type: "text",
                    validators: [minMaxLength(5, 512)],
                },
                cv: { type: "boolean" },
            }
        )
    ).toEqual({
        success: false,
        values: {
            name: {
                success: true,
            },
            email: {
                success: false,
                message: "Value is required but is missing",
            },
            message: {
                success: false,
                message: "Value is required but is missing",
            },
            cv: { success: true },
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
                message: "Value you provided is unexpected",
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
                        message: "Value you provided is unexpected",
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
            bar: {
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
                message: "Value is required but is missing",
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
                message: "Invalid value for data",
                validationErrors: [
                    {
                        validator: "minLength",
                        message: "Invalid value for data",
                    },
                ],
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
                    validators: [minLength(5), maxLength(2)],
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
                message: "Invalid value for data",
                validationErrors: [
                    { validator: "minLength", message: "Test message" },
                    { validator: "maxLength", message: "Test message 2" },
                ],
            },
        },
    });
});

test("Testing onError callback for validate_more", () => {
    const validate = new Valigator();
    let value = false;
    validate.validate_more(
        { foo: 1 },
        {
            foo: {
                type: "text",
                onError: () => {
                    value = true;
                },
            },
        }
    );
    expect(value).toEqual(true);

    let value2 = 1;
    validate.validate_more(
        { foo: 1, bar: 2 },
        {
            foo: {
                type: "text",
                onError: () => {
                    value2 += 1;
                },
            },
            bar: {
                type: "text",
                onError: () => {
                    value2 += 1;
                },
            },
        }
    );
    expect(value2).toEqual(3);

    let value3 = 1;
    validate.validate_more(
        { foo: 1 },
        {
            foo: {
                bar: {
                    type: "text",
                    onError: () => {
                        value3 += 1;
                    },
                },
            },
        }
    );
    expect(value3).toEqual(2);

    let value4 = 1;
    validate.validate_more(
        { foo: 1 },
        {
            foo: {
                type: "text",
                onError: () => {
                    value4 += 1;
                },
            },
            bar: {
                type: "text",
                onError: () => {
                    value4 += 1;
                },
            },
        }
    );
    expect(value4).toEqual(3);

    let value5 = 1;
    validate.validate_more(
        { foo: 1 },
        {
            foo: {
                type: "number",
                onError: () => {
                    value5 += 1;
                },
            },
            bar: {
                type: "text",
                onError: () => {
                    value5 += 1;
                },
            },
        }
    );
    expect(value5).toEqual(2);

    value = false;
    validate.validate_more(
        { foo: 1 },
        {
            foo: {
                type: "text",
                onError: () => {
                    value = true;
                },
            },
        }
    );
    expect(value).toEqual(true);

    let value6 = 1;
    validate.validate_more(
        { foo: 1, bar: 1 },
        {
            foo: {
                type: "number",
                onError: () => {
                    value6 += 1;
                },
            },
            bar: {
                type: "number",
                onError: () => {
                    value6 += 1;
                },
            },
        }
    );
    expect(value6).toEqual(1);

    let value7 = 1;
    validate.validate_more(
        { foo: { bar: 1 } },
        {
            foo: {
                bar: {
                    type: "number",
                    onError: () => {
                        value7 += 1;
                    },
                },
            },
        }
    );
    expect(value7).toEqual(1);

    let value10 = {};
    validate.validate_more(
        { foo: { bar: 1 } },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value10 = e;
                },
            },
        }
    );
    expect(value10).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "isNumber" },
        ],
    });

    let value11 = {};
    let value12 = {};
    validate.validate_more(
        { foo: 1, bar: "hi" },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value11 = e;
                },
            },
            bar: {
                type: "number",
                onError: (e) => {
                    value12 = e;
                },
            },
        }
    );
    expect(value11).toEqual({});
    expect(value12).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "isNumber" },
        ],
    });

    let value13 = {};
    let value14 = {};
    validate.validate_more(
        { foo: 1, bar: "hi" },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value13 = e;
                },
            },
            bar: {
                type: "text",
                validators: [minLength(4)],
                onError: (e) => {
                    value14 = e;
                },
            },
        }
    );
    expect(value13).toEqual({});
    expect(value14).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "minLength" },
        ],
    });
});

test("Testing onError callback for validate", () => {
    const validate = new Valigator();

    let value2 = 1;
    validate.validate(
        { foo: 1, bar: 2 },
        {
            foo: {
                type: "text",
                onError: () => {
                    value2 += 1;
                },
            },
            bar: {
                type: "text",
                onError: () => {
                    value2 += 1;
                },
            },
        }
    );
    expect(value2).toEqual(3);

    let value3 = 1;
    validate.validate(
        { foo: 1 },
        {
            foo: {
                bar: {
                    type: "text",
                    onError: () => {
                        value3 += 1;
                    },
                },
            },
        }
    );
    expect(value3).toEqual(2);

    let value4 = 1;
    validate.validate(
        { foo: 1 },
        {
            foo: {
                type: "number",
                onError: () => {
                    value4 += 1;
                },
            },
            bar: {
                type: "text",
                onError: () => {
                    value4 += 1;
                },
            },
        }
    );
    expect(value4).toEqual(2);

    let value5 = 1;
    validate.validate(
        { foo: 1, bar: 1 },
        {
            foo: {
                type: "number",
                onError: () => {
                    value5 += 1;
                },
            },
            bar: {
                type: "number",
                onError: () => {
                    value5 += 1;
                },
            },
        }
    );
    expect(value5).toEqual(1);

    let value6 = 1;
    validate.validate(
        { foo: { bar: 1 } },
        {
            foo: {
                bar: {
                    type: "number",
                    onError: () => {
                        value6 += 1;
                    },
                },
            },
        }
    );
    expect(value6).toEqual(1);

    let value7 = 1;
    let value8 = 1;
    let value9 = 1;
    validate.validate(
        {
            email: "test@test.com",
            name: "",
            message: "abcdef",
        },
        {
            email: {
                type: "text",
                validators: [minMaxLength(1, 100)],
                onError: () => (value7 += 1),
            },
            name: {
                type: "text",
                validators: [minMaxLength(1, 100)],
                onError: () => (value8 += 1),
            },
            message: {
                type: "text",
                validators: [minMaxLength(5, 512)],
                onError: () => (value9 += 1),
            },
        }
    );
    expect(value7).toBe(1);
    expect(value8).toBe(2);
    expect(value9).toBe(1);

    let value10 = {};
    validate.validate(
        { foo: { bar: 1 } },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value10 = e;
                },
            },
        }
    );
    expect(value10).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "isNumber" },
        ],
    });

    let value11 = {};
    let value12 = {};
    validate.validate(
        { foo: 1, bar: "hi" },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value11 = e;
                },
            },
            bar: {
                type: "number",
                onError: (e) => {
                    value12 = e;
                },
            },
        }
    );
    expect(value11).toEqual({});
    expect(value12).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "isNumber" },
        ],
    });

    let value13 = {};
    let value14 = {};
    validate.validate(
        { foo: 1, bar: "hi" },
        {
            foo: {
                type: "number",
                onError: (e) => {
                    value13 = e;
                },
            },
            bar: {
                type: "text",
                validators: [minLength(4)],
                onError: (e) => {
                    value14 = e;
                },
            },
        }
    );
    expect(value13).toEqual({});
    expect(value14).toEqual({
        message: "Invalid value for data",
        validationErrors: [
            { message: "Invalid value for data", validator: "minLength" },
        ],
    });
});
