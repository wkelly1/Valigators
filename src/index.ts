import minMaxLength from "../src/lib/validators/minMaxLength";
import minLength from "../src/lib/validators/minLength";
import maxLength from "../src/lib/validators/maxLength";
import customValidator from "../src/lib/validators/customValidator";
import isString from "../src/lib/validators/isString";
import isBoolean from "../src/lib/validators/isBoolean";
import isNull from "../src/lib/validators/isNull";
import length from "../src/lib/validators/length";
import isNumber from "../src/lib/validators/isNumber";
import isArray from "../src/lib/validators/isArray";
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
import substring from "../src/lib/validators/substring";
import all from "../src/lib/validators/all";
import some from "../src/lib/validators/some";
import between from "../src/lib/validators/between";
import fromN from "../src/lib/validators/fromN";
import upto from "../src/lib/validators/upto";
import exact from "../src/lib/validators/exact";
import { Valigator } from "./lib/Valigators";

export {
    isString,
    isNumber,
    isArray,
    isBoolean,
    isNull,
    minLength,
    maxLength,
    minMaxLength,
    length,
    substring,
    maxDecimalPoint,
    minDecimalPoint,
    decimalPoints,
    oneOf,
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
    all,
    some,
    between,
    fromN,
    upto,
    exact,
    customValidator,
    Valigator,
};

export default Valigator;
