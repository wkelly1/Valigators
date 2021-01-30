# Valigators

Valigators is a simple library for validating that data matches a specific 'shape'

Note: This is still is not yet at release stage and is still in development

## Usage

```javascript
import { Valigator } from "./valigators";

const valigator = new Valigator();

const valid_data = {
  name: "bob",
  age: 12,
  example: {
    foo: "bar",
  },
};

const invalid_data = {
  // name: "bob" <- removed this value
  age: 12,
  example: {
    foo: "bar",
  },
};

const shape = {
  name: {
    type: "text", // Required attribute
    validators: [] // Optional list is extra validators to run
  },
  age: {
    type: "number",
  },
  example: { // Works with nested objects
    foo: {
      type: "text",
      required: false,
    },
  },
};

valigator.validate(valid_data, shape); // Returns true

valigator.validate(invalid_data, shape); // Returns false

valigator.validate_more(valid_data, shape);
// Returns:
//     {
//      name: { success: true },
//      age: { success: true },
//      example: { foo: { success: true } }
//     }

valigator.validate_more(invalid_data, shape);
// Returns:
// {
//   name: {
//     success: false,
//     message: "Value is required but is missing",
//   },
//   age: { success: true },
//   example: {
//     foo: { success: true },
//   },
// };

```

## The shape object

This is where we define what the data should look like.

### Attributes

- `type` - this is the type that the data should be (required attribute)
- `required` - Is the value required in the data structure

### Types

A type is the expected data type. It consists of a set of validators that will run when checking if some data matches

For example the `text` type runs the validators

```js
[isString]
```

Available default types:

- `text`
- `number`
- `email`
- `phone`
- `date`
- `time`
- `password`

### Extending default types

If you have a specific type you want to use you can specify it as an option

```javascript
const valigator = new Valigator({
  types: {
    your_new_type: {
      validators: [myValidator],
    },
  },
});
```

Now you can use this type

```javascript
const type = {
    type: "your_new_type"
}

const data = ... // Some valid data

valigator.validate(data, type);
```

## Validators

The back bone of the library are validator functions. These are functions that you can use to check your data.

The library has a set of pre-written validators for you to use:

- `minLength(min)` - If length of value is greater or equal to the min value
- `maxLength(max)` - If length of value is less than or equal to the max value
- `minMaxLength(min, max)` - If length of value is greater or equal to than the min value and less than or equal to the max value
- `length()`
- `substring()`
- `maxDecimalPoint()`
- `minDecimalPoint()`
- `decimalPoints()`
- `isString()`
- `isNumber()`
- `oneOf()`
- `containsNumber()`
- `containsUpper()`
- `containsLower()`
- `containsSymbol()`
- `containsRegex()`

These can be used on their own as well as in `validate()`

```javascript
import { minLength } from "./Valigators";

minLength(5, "example"); // True
minLength(5, "foo"); // False
```

The last parameter is the value.

### Custom validator

If you want to specify your own validator then we have a function called `customValidator` which can be used as follows:

```javascript
const my_validator = customValidator((a, b, value) = {
    return (value % a) === b;
})

const type = {
    type: "number",
    validators: [my_validator(2,4)]
}

const data = ...// Some valid data

valigator.validate(data, type);
```

The last parameter of the function must be the data value. You can specify as many other parameters as you need.

## Options

You can specify a set of options for the ```Valigator```

```typescript
const options = {
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
}
```

### Custom default error messages

To update the default error message:
```js
const options = {
    messages: {
        invalidValue: "New message"
        unexpectedValue: "New message"
        unexpectedValue: "New message"
    }
}

new Valigator(options);
```

### Naming conflicts

Sometimes your data will match the keys we use in the shape as well as in the output. You can change any of the values using the ```keys``` option.

```js
const options = {
    keys: {
        success: "newKey1",
        message: "newKey2",
        type: "newKey3",
        required: "newKey4",
        validators: "newKey5",
    }
}

new Valigator(options);
```