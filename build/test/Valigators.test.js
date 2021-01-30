"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Valigators_1 = require("../src/Valigators");
test("Testing minMaxLength", function () {
    expect(Valigators_1.minMaxLength(1, 5)("t")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("tes")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("testi")).toBe(true);
    expect(Valigators_1.minMaxLength(1, 5)("testin")).toBe(false);
    expect(Valigators_1.minMaxLength(2, 5)("t")).toBe(false);
});
test("Testing minLength", function () {
    expect(Valigators_1.minLength(5)("testt")).toBe(true);
    expect(Valigators_1.minLength(5)("testing")).toBe(true);
    expect(Valigators_1.minLength(5)("t")).toBe(false);
    expect(Valigators_1.minLength(5)("test")).toBe(false);
});
test("Testing maxLength", function () {
    expect(Valigators_1.maxLength(5)("testt")).toBe(true);
    expect(Valigators_1.maxLength(5)("testin")).toBe(false);
    expect(Valigators_1.maxLength(5)("t")).toBe(true);
    expect(Valigators_1.maxLength(5)("test")).toBe(true);
});
test("Testing Validate catches incorrect shape", function () {
    var validate = new Valigators_1.Validate();
    expect(function () { return validate.validate("hi", { test: "test" }); }).toThrow("Invalid shape object");
    expect(function () { return validate.validate("hi", { type: "test", other: 2 }); }).toThrow("Invalid shape object");
    expect(function () {
        return validate.validate("hi", { test: "test", other: { test: 1 } });
    }).toThrow("Invalid shape object");
    expect(function () { return validate.validate({ example: "hi" }, []); }).toThrow("Invalid value for property shape");
});
test("Testing Validate on text", function () {
    var validate = new Valigators_1.Validate();
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
    var validate = new Valigators_1.Validate();
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
    var validate = new Valigators_1.Validate();
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
    var validate = new Valigators_1.Validate();
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
