import {
  minMaxLength,
  minLength,
  maxLength,
  customValidator,
  Validate,
} from "../src/Valigators";

test("Testing minMaxLength", () => {
  expect(minMaxLength(1, 5)("t")).toBe(true);
  expect(minMaxLength(1, 5)("tes")).toBe(true);
  expect(minMaxLength(1, 5)("testi")).toBe(true);
  expect(minMaxLength(1, 5)("testin")).toBe(false);
  expect(minMaxLength(2, 5)("t")).toBe(false);
});

test("Testing minLength", () => {
  expect(minLength(5)("testt")).toBe(true);
  expect(minLength(5)("testing")).toBe(true);
  expect(minLength(5)("t")).toBe(false);
  expect(minLength(5)("test")).toBe(false);
});

test("Testing maxLength", () => {
  expect(maxLength(5)("testt")).toBe(true);
  expect(maxLength(5)("testin")).toBe(false);
  expect(maxLength(5)("t")).toBe(true);
  expect(maxLength(5)("test")).toBe(true);
});

test("Testing Validate catches incorrect shape", () => {
  const validate = new Validate();

  expect(() => validate.validate("hi", { test: "test" })).toThrow(
    "Invalid shape object"
  );
  expect(() => validate.validate("hi", { type: "test", other: 2 })).toThrow(
    "Invalid shape object"
  );
  expect(() =>
    validate.validate("hi", { test: "test", other: { test: 1 } })
  ).toThrow("Invalid shape object");
  expect(() => validate.validate({ example: "hi" }, [])).toThrow(
    "Invalid value for property shape"
  );
});

test("Testing Validate on text", () => {
  const validate = new Validate();

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
  const validate = new Validate();
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
  const validate = new Validate();
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
});

test("Testing additional validators", () => {
  const validate = new Validate();
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

  const cusValidateExample = customValidator((a:any, res:any) => true);
  expect(
    validate.validate(
      { name: "bob" },
      {
        name: {
          type: "text",
          validators: [cusValidateExample(2)],
        },
      }
    )
  ).toBe(true);
});
