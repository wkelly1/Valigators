"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Valigators_1 = require("../src/Valigators");
test("Testing isString", function () {
    expect(Valigators_1.isString("t")).toBe(true);
    expect(Valigators_1.isString(1)).toBe(false);
    expect(Valigators_1.isString(1.1)).toBe(false);
    expect(Valigators_1.isString({ test: "test" })).toBe(false);
    expect(Valigators_1.isString([])).toBe(false);
});
test("Testing isNumber", function () {
    expect(Valigators_1.isNumber("t")).toBe(false);
    expect(Valigators_1.isNumber(1)).toBe(true);
    expect(Valigators_1.isNumber(1.1)).toBe(true);
    expect(Valigators_1.isNumber({ test: "test" })).toBe(false);
    expect(Valigators_1.isNumber([])).toBe(false);
});
test("Testing isArray", function () {
    expect(Valigators_1.isArray("t")).toBe(false);
    expect(Valigators_1.isArray(1)).toBe(false);
    expect(Valigators_1.isArray(1.1)).toBe(false);
    expect(Valigators_1.isArray({ test: "test" })).toBe(false);
    expect(Valigators_1.isArray([])).toBe(true);
    expect(Valigators_1.isArray([1, 2, 3])).toBe(true);
    expect(Valigators_1.isArray(["1", "2"])).toBe(true);
});
test("Testing minLength", function () {
    expect(Valigators_1.minLength(5)("testt")).toBe(true);
    expect(Valigators_1.minLength(5)("testing")).toBe(true);
    expect(Valigators_1.minLength(5)("t")).toBe(false);
    expect(Valigators_1.minLength(5)("test")).toBe(false);
    expect(Valigators_1.minLength(5)(11111)).toBe(true);
    expect(Valigators_1.minLength(5)(1111111)).toBe(true);
    expect(Valigators_1.minLength(5)(1)).toBe(false);
    expect(Valigators_1.minLength(5)(1111)).toBe(false);
    expect(Valigators_1.minLength(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(Valigators_1.minLength(5)([1, 1, 1, 1, 1, 1, 1])).toBe(true);
    expect(Valigators_1.minLength(5)([1])).toBe(false);
    expect(Valigators_1.minLength(5)([1, 1, 1, 1])).toBe(false);
});
test("Testing maxLength", function () {
    expect(Valigators_1.maxLength(5)("testt")).toBe(true);
    expect(Valigators_1.maxLength(5)("testin")).toBe(false);
    expect(Valigators_1.maxLength(5)("t")).toBe(true);
    expect(Valigators_1.maxLength(5)("test")).toBe(true);
    expect(Valigators_1.maxLength(5)(11111)).toBe(true);
    expect(Valigators_1.maxLength(5)(111111)).toBe(false);
    expect(Valigators_1.maxLength(5)(1)).toBe(true);
    expect(Valigators_1.maxLength(5)(1111)).toBe(true);
    expect(Valigators_1.maxLength(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(Valigators_1.maxLength(5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(Valigators_1.maxLength(5)([1])).toBe(true);
    expect(Valigators_1.maxLength(5)([1, 1, 1, 1])).toBe(true);
});
test("Testing minMaxLength", function () {
    expect(Valigators_1.minMaxLength(1, 5)("t")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("tes")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("testi")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("testin")).toBe(false);
    expect(Valigators_1.minMaxLength(2, 5)("t")).toBe(false);
    expect(Valigators_1.minMaxLength(1, 5)(1)).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)(111)).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)(11111)).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)(111111)).toBe(false);
    expect(Valigators_1.minMaxLength(2, 5)(1)).toBe(false);
    expect(Valigators_1.minMaxLength(1, 5)([1])).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)([1, 1, 1])).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)([1, 1, 1, 1, 1])).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(Valigators_1.minMaxLength(2, 5)([1])).toBe(false);
});
test("Testing length", function () {
    expect(Valigators_1.length(5)("t")).toBe(false);
    expect(Valigators_1.length(5)("tes")).toBe(false);
    expect(Valigators_1.length(5)("testi")).toBe(true);
    expect(Valigators_1.length(5)("testin")).toBe(false);
    expect(Valigators_1.length(5)(11111)).toBe(true);
    expect(Valigators_1.length(5)(111111)).toBe(false);
    expect(Valigators_1.length(5)(1)).toBe(false);
    expect(Valigators_1.length(5)(1111)).toBe(false);
    expect(Valigators_1.length(5)([1, 1, 1, 1, 1])).toBe(true);
    expect(Valigators_1.length(5)([1, 1, 1, 1, 1, 1])).toBe(false);
    expect(Valigators_1.length(5)([1])).toBe(false);
    expect(Valigators_1.length(5)([1, 1, 1, 1])).toBe(false);
});
test("Testing substring", function () {
    expect(Valigators_1.substring("te")("test")).toBe(true);
    expect(Valigators_1.substring("te")("tete")).toBe(true);
    expect(Valigators_1.substring("te")("et")).toBe(false);
    expect(Valigators_1.substring("te")(1)).toBe(false);
    expect(Valigators_1.substring("te")(["t", "e"])).toBe(false);
    expect(Valigators_1.substring(1)(1234)).toBe(true);
});
test("Testing maxDecimalPoint", function () {
    expect(Valigators_1.maxDecimalPoint(0)(1)).toBe(true);
    expect(Valigators_1.maxDecimalPoint(0)(1.1)).toBe(false);
    expect(Valigators_1.maxDecimalPoint(1)(1.1)).toBe(true);
    expect(Valigators_1.maxDecimalPoint(1)(2.444)).toBe(false);
    expect(Valigators_1.maxDecimalPoint(5)(2.44444)).toBe(true);
    expect(Valigators_1.maxDecimalPoint(1)("tes")).toBe(false);
    expect(Valigators_1.maxDecimalPoint(1)("1.1")).toBe(false);
});
test("Testing minDecimalPoint", function () {
    expect(Valigators_1.minDecimalPoint(0)(1)).toBe(true);
    expect(Valigators_1.minDecimalPoint(0)(1.1)).toBe(true);
    expect(Valigators_1.minDecimalPoint(1)(1.1)).toBe(true);
    expect(Valigators_1.minDecimalPoint(1)(2.444)).toBe(true);
    expect(Valigators_1.minDecimalPoint(5)(2.444)).toBe(false);
    expect(Valigators_1.minDecimalPoint(1)("tes")).toBe(false);
    expect(Valigators_1.minDecimalPoint(1)("1.1")).toBe(false);
});
test("Testing decimalPoints", function () {
    expect(Valigators_1.decimalPoints(0)(1)).toBe(true);
    expect(Valigators_1.decimalPoints(0)(1.1)).toBe(false);
    expect(Valigators_1.decimalPoints(1)(1.1)).toBe(true);
    expect(Valigators_1.decimalPoints(1)(2.444)).toBe(false);
    expect(Valigators_1.decimalPoints(3)(2.444)).toBe(true);
    expect(Valigators_1.decimalPoints(1)("tes")).toBe(false);
    expect(Valigators_1.decimalPoints(1)("1.1")).toBe(false);
});
test("Testing oneOf", function () {
    expect(Valigators_1.oneOf([])(1)).toBe(false);
    expect(Valigators_1.oneOf([1, 2])(1)).toBe(true);
    expect(Valigators_1.oneOf([1, 2])(2)).toBe(true);
    expect(Valigators_1.oneOf([1, 2])(3)).toBe(false);
    expect(Valigators_1.oneOf([])("1")).toBe(false);
    expect(Valigators_1.oneOf(["1", "2"])("1")).toBe(true);
    expect(Valigators_1.oneOf(["1", "2"])("2")).toBe(true);
    expect(Valigators_1.oneOf(["1", "2"])("3")).toBe(false);
});
test("Testing containsNumber", function () {
    expect(Valigators_1.containsNumber("abc")).toBe(false);
    expect(Valigators_1.containsNumber("a1c")).toBe(true);
    expect(Valigators_1.containsNumber("111")).toBe(true);
    expect(Valigators_1.containsNumber(11)).toBe(true);
    expect(Valigators_1.containsNumber([])).toBe(false);
    expect(Valigators_1.containsNumber([1, 2, 3])).toBe(true);
    expect(Valigators_1.containsNumber(["A"])).toBe(false);
    expect(Valigators_1.containsNumber({ test: 1 })).toBe(false);
});
test("Testing containsUpper", function () {
    expect(Valigators_1.containsUpper("abc")).toBe(false);
    expect(Valigators_1.containsUpper("aAc")).toBe(true);
    expect(Valigators_1.containsUpper("AAA")).toBe(true);
    expect(Valigators_1.containsUpper(11)).toBe(false);
    expect(Valigators_1.containsUpper([])).toBe(false);
    expect(Valigators_1.containsUpper([1, 2, 3])).toBe(false);
    expect(Valigators_1.containsUpper({ test: 1 })).toBe(false);
    expect(Valigators_1.containsUpper("AA")).toBe(true);
    expect(Valigators_1.containsUpper(["A", "b", "c"])).toBe(true);
    expect(Valigators_1.containsUpper(["a", "b", "c"])).toBe(false);
    expect(Valigators_1.containsUpper({ test: "A" })).toBe(false);
});
test("Testing containsLower", function () {
    expect(Valigators_1.containsLower("abc")).toBe(true);
    expect(Valigators_1.containsLower("aAc")).toBe(true);
    expect(Valigators_1.containsLower("AAA")).toBe(false);
    expect(Valigators_1.containsLower(11)).toBe(false);
    expect(Valigators_1.containsLower([])).toBe(false);
    expect(Valigators_1.containsLower([1, 2, 3])).toBe(false);
    expect(Valigators_1.containsLower({ test: 1 })).toBe(false);
    expect(Valigators_1.containsLower("AA")).toBe(false);
    expect(Valigators_1.containsLower(["A", "b", "c"])).toBe(true);
    expect(Valigators_1.containsLower(["a", "b", "c"])).toBe(true);
    expect(Valigators_1.containsLower(["A", "B", "C"])).toBe(false);
    expect(Valigators_1.containsLower({ test: "A" })).toBe(false);
});
test("Testing containsSymbol", function () {
    expect(Valigators_1.containsSymbol("[")).toBe(true);
    expect(Valigators_1.containsSymbol("|")).toBe(true);
    expect(Valigators_1.containsSymbol("\\")).toBe(true);
    expect(Valigators_1.containsSymbol("/")).toBe(true);
    expect(Valigators_1.containsSymbol("~")).toBe(true);
    expect(Valigators_1.containsSymbol("^")).toBe(true);
    expect(Valigators_1.containsSymbol(":")).toBe(true);
    expect(Valigators_1.containsSymbol(",")).toBe(true);
    expect(Valigators_1.containsSymbol(";")).toBe(true);
    expect(Valigators_1.containsSymbol("?")).toBe(true);
    expect(Valigators_1.containsSymbol("!")).toBe(true);
    expect(Valigators_1.containsSymbol("&")).toBe(true);
    expect(Valigators_1.containsSymbol("%")).toBe(true);
    expect(Valigators_1.containsSymbol("$")).toBe(true);
    expect(Valigators_1.containsSymbol("@")).toBe(true);
    expect(Valigators_1.containsSymbol("*")).toBe(true);
    expect(Valigators_1.containsSymbol("+")).toBe(true);
    expect(Valigators_1.containsSymbol("]")).toBe(true);
    expect(Valigators_1.containsSymbol("-")).toBe(true);
    expect(Valigators_1.containsSymbol("_")).toBe(true);
    expect(Valigators_1.containsSymbol("#")).toBe(true);
    expect(Valigators_1.containsSymbol("{")).toBe(true);
    expect(Valigators_1.containsSymbol("}")).toBe(true);
    expect(Valigators_1.containsSymbol("<")).toBe(true);
    expect(Valigators_1.containsSymbol(">")).toBe(true);
    expect(Valigators_1.containsSymbol(".")).toBe(true);
    expect(Valigators_1.containsSymbol("=")).toBe(true);
    expect(Valigators_1.containsSymbol("_")).toBe(true);
    expect(Valigators_1.containsSymbol("(")).toBe(true);
    expect(Valigators_1.containsSymbol(")")).toBe(true);
    expect(Valigators_1.containsSymbol("£")).toBe(true);
    expect(Valigators_1.containsSymbol("aAc")).toBe(false);
    expect(Valigators_1.containsSymbol("AAA")).toBe(false);
    expect(Valigators_1.containsSymbol(11)).toBe(false);
    expect(Valigators_1.containsSymbol([])).toBe(false);
    expect(Valigators_1.containsSymbol([1, 2, 3])).toBe(false);
    expect(Valigators_1.containsSymbol({ test: 1 })).toBe(false);
    expect(Valigators_1.containsSymbol("AA")).toBe(false);
    expect(Valigators_1.containsSymbol(["A", "b", "c"])).toBe(false);
    expect(Valigators_1.containsSymbol(["a", "b", "c"])).toBe(false);
    expect(Valigators_1.containsSymbol(["A", "B", "C"])).toBe(false);
    expect(Valigators_1.containsSymbol({ test: "A" })).toBe(false);
});
test("Testing containsRegex", function () {
    expect(Valigators_1.containsRegex(/[A-Z]/)("aAc")).toBe(true);
    expect(Valigators_1.containsRegex(/[A-Z]/)("AAA")).toBe(true);
    expect(Valigators_1.containsRegex(/[A-Z]/)(11)).toBe(false);
    expect(Valigators_1.containsRegex(/[A-Z]/)([])).toBe(false);
    expect(Valigators_1.containsRegex(/[A-Z]/)([1, 2, 3])).toBe(false);
    expect(Valigators_1.containsRegex(/[A-Z]/)({ test: 1 })).toBe(false);
    expect(Valigators_1.containsRegex(/[A-Z]/)("AA")).toBe(true);
    expect(Valigators_1.containsRegex(/[A-Z]/)(["A", "b", "c"])).toBe(true);
    expect(Valigators_1.containsRegex(/[A-Z]/)(["a", "b", "c"])).toBe(false);
    expect(Valigators_1.containsRegex(/[A-Z]/)(["A", "B", "C"])).toBe(true);
    expect(Valigators_1.containsRegex(/[A-Z]/)({ test: "A" })).toBe(false);
});
test("Testing or", function () {
    expect(Valigators_1.or([Valigators_1.isString, Valigators_1.isNumber])("aAc")).toBe(true);
    expect(Valigators_1.or([Valigators_1.isNumber])("aAc")).toBe(false);
    expect(Valigators_1.or([Valigators_1.containsSymbol, Valigators_1.containsUpper])("aAc")).toBe(true);
    expect(Valigators_1.or([Valigators_1.containsSymbol, Valigators_1.containsUpper])("aac")).toBe(false);
    expect(Valigators_1.or([Valigators_1.containsSymbol, Valigators_1.containsUpper])("£ss")).toBe(true);
});
test("Testing isInstanceOf", function () {
    var str = "The website is appdividend";
    var myString = new String();
    var nStr = new String("String created with constructor");
    var mDate = new Date();
    var mObj = {};
    var mNonObj = Object.create(null);
    expect(Valigators_1.isInstanceOf(String)(str)).toBe(false);
    expect(Valigators_1.isInstanceOf(String)(myString)).toBe(true);
    expect(Valigators_1.isInstanceOf(String)(nStr)).toBe(true);
    expect(Valigators_1.isInstanceOf(Date)(mDate)).toBe(true);
    expect(Valigators_1.isInstanceOf(Object)(mObj)).toBe(true);
    expect(Valigators_1.isInstanceOf(Object)(mNonObj)).toBe(false);
});
test("Testing isEven", function () {
    expect(Valigators_1.isEven(-1)).toBe(false);
    expect(Valigators_1.isEven(0)).toBe(false);
    expect(Valigators_1.isEven(1)).toBe(false);
    expect(Valigators_1.isEven(2)).toBe(true);
    expect(Valigators_1.isEven(100)).toBe(true);
    expect(Valigators_1.isEven("sfd")).toBe(false);
});
test("Testing isOdd", function () {
    expect(Valigators_1.isOdd(-1)).toBe(false);
    expect(Valigators_1.isOdd(0)).toBe(false);
    expect(Valigators_1.isOdd(1)).toBe(true);
    expect(Valigators_1.isOdd(2)).toBe(false);
    expect(Valigators_1.isOdd(100)).toBe(false);
    expect(Valigators_1.isOdd(101)).toBe(true);
    expect(Valigators_1.isOdd("sfd")).toBe(false);
});
test("Testing isPrime", function () {
    expect(Valigators_1.isPrime(1)).toBe(false);
    expect(Valigators_1.isPrime(2)).toBe(true);
    expect(Valigators_1.isPrime(3)).toBe(true);
    expect(Valigators_1.isPrime(4)).toBe(false);
    expect(Valigators_1.isPrime(5)).toBe(true);
    expect(Valigators_1.isPrime(6)).toBe(false);
    expect(Valigators_1.isPrime(7)).toBe(true);
    expect(Valigators_1.isPrime(8)).toBe(false);
    expect(Valigators_1.isPrime(9)).toBe(false);
    expect(Valigators_1.isPrime(10)).toBe(false);
    expect(Valigators_1.isPrime(11)).toBe(true);
    expect(Valigators_1.isPrime(30)).toBe(false);
    expect(Valigators_1.isPrime(32)).toBe(false);
    expect(Valigators_1.isPrime(33)).toBe(false);
    expect(Valigators_1.isPrime(34)).toBe(false);
    expect(Valigators_1.isPrime(35)).toBe(false);
    expect(Valigators_1.isPrime(13)).toBe(true);
    expect(Valigators_1.isPrime(17)).toBe(true);
    expect(Valigators_1.isPrime(19)).toBe(true);
    expect(Valigators_1.isPrime(71)).toBe(true);
    expect(Valigators_1.isPrime(181)).toBe(true);
    expect(Valigators_1.isPrime(1698)).toBe(false);
    expect(Valigators_1.isPrime(1699)).toBe(true);
    expect(Valigators_1.isPrime(-1)).toBe(false);
    expect(Valigators_1.isPrime("sdfd")).toBe(false);
    expect(Valigators_1.isPrime([1, 2, 3])).toBe(false);
    expect(Valigators_1.isPrime({ test: "dsfdf" })).toBe(false);
});
test("Testing isSquare", function () {
    expect(Valigators_1.isSquare(1)).toBe(true);
    expect(Valigators_1.isSquare(2)).toBe(false);
    expect(Valigators_1.isSquare(3)).toBe(false);
    expect(Valigators_1.isSquare(4)).toBe(true);
    expect(Valigators_1.isSquare(5)).toBe(false);
    expect(Valigators_1.isSquare(6)).toBe(false);
    expect(Valigators_1.isSquare(7)).toBe(false);
    expect(Valigators_1.isSquare(8)).toBe(false);
    expect(Valigators_1.isSquare(9)).toBe(true);
    expect(Valigators_1.isSquare(10)).toBe(false);
    expect(Valigators_1.isSquare(16)).toBe(true);
    expect(Valigators_1.isSquare(25)).toBe(true);
    expect(Valigators_1.isSquare(30)).toBe(false);
    expect(Valigators_1.isSquare(31)).toBe(false);
    expect(Valigators_1.isSquare(32)).toBe(false);
    expect(Valigators_1.isSquare(33)).toBe(false);
    expect(Valigators_1.isSquare(36)).toBe(true);
    expect(Valigators_1.isSquare(49)).toBe(true);
    expect(Valigators_1.isSquare(64)).toBe(true);
    expect(Valigators_1.isSquare(81)).toBe(true);
    expect(Valigators_1.isSquare(100)).toBe(true);
    expect(Valigators_1.isSquare(104)).toBe(false);
    expect(Valigators_1.isSquare(361)).toBe(true);
    expect(Valigators_1.isSquare(360)).toBe(false);
    expect(Valigators_1.isSquare("sdfd")).toBe(false);
    expect(Valigators_1.isSquare([1, 2, 3])).toBe(false);
    expect(Valigators_1.isSquare({ test: "dsfdf" })).toBe(false);
});
test("Testing isCube", function () {
    expect(Valigators_1.isCube(1)).toBe(true);
    expect(Valigators_1.isCube(2)).toBe(false);
    expect(Valigators_1.isCube(3)).toBe(false);
    expect(Valigators_1.isCube(4)).toBe(false);
    expect(Valigators_1.isCube(5)).toBe(false);
    expect(Valigators_1.isCube(6)).toBe(false);
    expect(Valigators_1.isCube(7)).toBe(false);
    expect(Valigators_1.isCube(8)).toBe(true);
    expect(Valigators_1.isCube(9)).toBe(false);
    expect(Valigators_1.isCube(10)).toBe(false);
    expect(Valigators_1.isCube(27)).toBe(true);
    expect(Valigators_1.isCube(28)).toBe(false);
    expect(Valigators_1.isCube(64)).toBe(true);
    expect(Valigators_1.isCube(125)).toBe(true);
    expect(Valigators_1.isCube(216)).toBe(true);
    expect(Valigators_1.isCube(343)).toBe(true);
    expect(Valigators_1.isCube(-1)).toBe(false);
    expect(Valigators_1.isCube(-2)).toBe(false);
    expect(Valigators_1.isCube(-3)).toBe(false);
    expect(Valigators_1.isCube(-10)).toBe(false);
    expect(Valigators_1.isCube("sdfd")).toBe(false);
    expect(Valigators_1.isCube([1, 2, 3])).toBe(false);
    expect(Valigators_1.isCube({ test: "dsfdf" })).toBe(false);
});
test("Testing isNegative", function () {
    expect(Valigators_1.isNegative(-100)).toBe(true);
    expect(Valigators_1.isNegative(-50)).toBe(true);
    expect(Valigators_1.isNegative(-10)).toBe(true);
    expect(Valigators_1.isNegative(-1)).toBe(true);
    expect(Valigators_1.isNegative(0)).toBe(false);
    expect(Valigators_1.isNegative(100)).toBe(false);
    expect(Valigators_1.isNegative(50)).toBe(false);
    expect(Valigators_1.isNegative(10)).toBe(false);
    expect(Valigators_1.isNegative(1)).toBe(false);
    expect(Valigators_1.isNegative("sdfd")).toBe(false);
    expect(Valigators_1.isNegative([1, 2, 3])).toBe(false);
    expect(Valigators_1.isNegative({ test: "dsfdf" })).toBe(false);
});
test("Testing isPositive", function () {
    expect(Valigators_1.isPositive(-100)).toBe(false);
    expect(Valigators_1.isPositive(-50)).toBe(false);
    expect(Valigators_1.isPositive(-10)).toBe(false);
    expect(Valigators_1.isPositive(-1)).toBe(false);
    expect(Valigators_1.isPositive(0)).toBe(false);
    expect(Valigators_1.isPositive(100)).toBe(true);
    expect(Valigators_1.isPositive(50)).toBe(true);
    expect(Valigators_1.isPositive(10)).toBe(true);
    expect(Valigators_1.isPositive(1)).toBe(true);
    expect(Valigators_1.isPositive("sdfd")).toBe(false);
    expect(Valigators_1.isPositive([1, 2, 3])).toBe(false);
    expect(Valigators_1.isPositive({ test: "dsfdf" })).toBe(false);
});
test("Testing equals", function () {
    expect(Valigators_1.equals(1)(1)).toBe(true);
    expect(Valigators_1.equals(1)(2)).toBe(false);
    expect(Valigators_1.equals("test")("test")).toBe(true);
    expect(Valigators_1.equals("test")("te")).toBe(false);
    expect(Valigators_1.equals([1, 2, 3])([1, 2, 3])).toBe(true);
    expect(Valigators_1.equals([1, 2, 3])([1, 2])).toBe(false);
    expect(Valigators_1.equals({ test: "test" })({ test: "test" })).toBe(true);
    expect(Valigators_1.equals({ test: { test2: "test2" } })({ test: { test2: "test2" } })).toBe(true);
    expect(Valigators_1.equals({ test: { test2: "test" } })({ test: { test2: "test2" } })).toBe(false);
    expect(Valigators_1.equals({ test: { test: "test2" } })({ test: { test2: "test2" } })).toBe(false);
});
test("Testing Validate catches incorrect shape", function () {
    var validate = new Valigators_1.Valigator();
    expect(function () { return validate.validate("hi", { test: "test" }); }).toThrow("Invalid shape object");
    expect(function () { return validate.validate("hi", { type: "test", other: 2 }); }).toThrow("Invalid shape object");
    expect(function () {
        return validate.validate("hi", { test: "test", other: { test: 1 } });
    }).toThrow("Invalid shape object");
    expect(function () { return validate.validate({ example: "hi" }, []); }).toThrow("Invalid value for property shape");
});
test("Testing Validate on text", function () {
    var validate = new Valigators_1.Valigator();
    expect(validate.validate("hi", {
        type: "text",
    })).toBe(true);
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
        },
    })).toBe(true);
    expect(validate.validate({ name: "bob", lastName: "bar" }, {
        name: {
            type: "text",
        },
        lastName: {
            type: "text",
        },
    })).toBe(true);
    expect(validate.validate({ name: { lastName: "bar" } }, {
        name: {
            lastName: {
                type: "text",
            },
        },
    })).toBe(true);
    expect(validate.validate({ name: { lastName: "bar" } }, {
        name: {
            type: "text",
        },
    })).toBe(false);
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
        },
        lastName: {
            type: "text",
        },
    })).toBe(false);
    expect(validate.validate({ name: "bob", other: "foo" }, {
        name: {
            type: "text",
        },
    })).toBe(false);
    expect(validate.validate("bob", {
        name: {
            lastName: {
                type: "text",
            },
        },
    })).toBe(false);
    expect(validate.validate({ name: "bob" }, {
        name: {
            age: {
                type: "text",
            },
        },
    })).toBe(false);
});
test("Testing validate on required parameters", function () {
    var validate = new Valigators_1.Valigator();
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
            required: false,
        },
    })).toBe(true);
    expect(validate.validate({}, {
        name: {
            type: "text",
            required: false,
        },
    })).toBe(true);
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
            required: true,
        },
        other1: {
            type: "text",
            required: false,
        },
    })).toBe(true);
});
test("Testing default validators", function () {
    var validate = new Valigators_1.Valigator();
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "number",
        },
    })).toBe(false);
    expect(validate.validate({ name: 1 }, {
        name: {
            type: "number",
        },
    })).toBe(true);
    expect(validate.validate("hi", {
        type: "number",
    })).toBe(false);
});
test("Testing additional validators", function () {
    var validate = new Valigators_1.Valigator();
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
            validators: [Valigators_1.minLength(1)],
        },
    })).toBe(true);
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
            validators: [Valigators_1.minLength(6)],
        },
    })).toBe(false);
    var cusValidateExample = Valigators_1.customValidator(function (a, res) { return true; });
    expect(validate.validate({ name: "bob" }, {
        name: {
            type: "text",
            validators: [cusValidateExample(2)],
        },
    })).toBe(true);
});
test("Testing custom options", function () {
    var validate = new Valigators_1.Valigator({
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
    expect(function () {
        validate.validate({ name: "bob" }, {
            name: {
                type: "text",
                validators: [Valigators_1.minLength(1)],
            },
        });
    }).toThrow("Invalid shape object");
    expect(validate.validate({ name: "bob" }, {
        name: {
            ty: "text",
            val: [Valigators_1.minLength(1)],
            req: false,
        },
    })).toBe(true);
    expect(validate.validate({}, {
        name: {
            ty: "text",
            val: [Valigators_1.minLength(1)],
            req: false,
        },
    })).toBe(true);
});
