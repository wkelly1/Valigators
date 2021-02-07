# Valigators

Valigators is a simple library for validating that data matches a specific 'shape'

Note: This is still is not yet at release stage and is still in development

## Usage

### In Node.js

```javascript
const { Valigator } = require("valigators");
```

### ESM

```javascript
import { Valigator } from "valigators";
```

### Browser

```html
<script src="bundle.usm.js"></script>
```

```javascript
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
        validators: [], // Optional list is extra validators to run
    },
    age: {
        type: "number",
    },
    example: {
        // Works with nested objects
        foo: {
            type: "text",
            required: false,
        },
    },
};

valigator.validate(valid_data, shape); // Returns true

valigator.validate(invalid_data, shape); // Returns false

valigator.validate_more(valid_data, shape);
// => {
//      name: { success: true },
//      age: { success: true },
//      example: { foo: { success: true } }
//     }

valigator.validate_more(invalid_data, shape);
// => {
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

-   `type` - this is the type that the data should be (required attribute)
-   `required` - Is the value required in the data structure

### Types

A type is the expected data type. It consists of a set of validators that will run when checking if some data matches

For example the `text` type runs the validators

```js
[isString];
```

Available default types:

| Type       | Validations                             |
| ---------- | --------------------------------------- |
| `text`     | `[isString]`                            |
| `number`   | `[isNumber]`                            |
| `array`    | `[isArray]`                             |
| `boolean`  | `[isBoolean]`                           |
| `email`    | `[isString, containsRegex(emailRegex)]` |
| `phone`    | TODO                                    |
| `date`     | TODO                                    |
| `time`     | TODO                                    |
| `password` | TODO                                    |

See [here](https://github.com/wkelly1/Valigators/blob/development/src/lib/Regex.ts) for raw regex

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

| Validator                | Description                                                                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isString`               | If the value is a string                                                                                                                                                                                               |
| `isNumber`               | If the value is a number                                                                                                                                                                                               |
| `isArray`                | If the value is an array                                                                                                                                                                                               |
| `isBoolean`              | If the value is a boolean                                                                                                                                                                                              |
| `isNull`                 | If the value is null                                                                                                                                                                                                   |
| `minLength(min)`         | If length of value is greater or equal to the `min` value                                                                                                                                                              |
| `maxLength(max)`         | If length of value is less than or equal to the `max` value                                                                                                                                                            |
| `minMaxLength(min, max)` | If length of value is greater or equal to than the `min` value and less than or equal to the `max` value                                                                                                               |
| `length(n)`              | If the length of the value is equal to n                                                                                                                                                                               |
| `substring(inner)`       | If the string converted value contains substring `inner`                                                                                                                                                               |
| `maxDecimalPoint(max)`   | If the value is a number and has less than or equal to `max` decimal places                                                                                                                                            |
| `minDecimalPoint(min)`   | If the value is a number and greater than or equal to `min` decimal places                                                                                                                                             |
| `decimalPoints(n)`       | If the value is a number and has exactly `n` decimal places                                                                                                                                                            |
| `oneOf(elems)`           | If the value is equal to one of the elements in the array `elems` (e.g. `["one", "two"]`)                                                                                                                              |
| `containsNumber()`       | If the string converted value contains a number                                                                                                                                                                        |
| `containsUpper()`        | If the string converted value contains an upper case character                                                                                                                                                         |
| `containsLower()`        | If the string converted value contains a lower case character                                                                                                                                                          |
| `containsSymbol()`       | If the string converted value contains one of the symbols `[[\]\|\\/~^:,;?!&%$@*+\-_#}{<>.=_)(£]`                                                                                                                      |
| `containsRegex(reg)`     | If the string converted value contains matches the regular expression `reg` (e.g. `/[A-Z]/`)                                                                                                                           |
| `or(validators)`         | Takes an array of validators and runs each one and returns true if any of the validators return true, false otherwise (e.g. `validators([isNumber, isString])` will only be true if the value is a number or a string) |
| `isInstanceOf(func)`     | Checks if the value instanceof func                                                                                                                                                                                    |
| `isEven`                 | Checks if the value is a number and even                                                                                                                                                                               |
| `isOdd`                  | Checks if the value is a number and odd                                                                                                                                                                                |
| `isPrime`                | Checks if the value is a number and prime                                                                                                                                                                              |
| `isSquare`               | Checks if the value is a number and a square number                                                                                                                                                                    |
| `isCube`                 | Checks if the value is a number and is a cube number                                                                                                                                                                   |
| `isNegative`             | Checks if the value is a number and negative (0 is not negative)                                                                                                                                                       |
| `isPositive`             | Checks if the value is a number and positive (0 is not positive)                                                                                                                                                       |
| `equals(to)`             | Checks if the value is equal to `to`. It does more than `===` and compares the value. This means you can compare an arrays contents as well as objects with this                                                       |

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

## Arrays

It is possible to validate arrays as well as nested arrays. To do this use the `array` type.

Example with array on its own:

```js
const data = [1, 2, 3];
const shape = {
    type: "array",
    validators: [],
};
val.validate_more(data, shape);
// => { success: true }
```

Example with nested array:

```js
const data = { example: [1, 2, 3] };
const shape = {
    example: {
        type: "array",
        validators: [],
    },
};
val.validate_more(data, shape);
// => { example: { success: true } }
```

To actually check the contents of the array you can use any of the array validators.

| Validator                    | Description                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `all(shape)`                 | Checks that every element in the array matches the `shape`                                                  |
| `some(shape)`                | Checks that one or more elements in the array match the `shape`                                             |
| `fromN(start, shape)`        | Checks that every element from the start index `start` (inclusive) match the `shape`                        |
| `between(start, end, shape)` | Checks that every element between the `start` (inclusive) index and `end` (inclusive) index match the shape |
| `upto(end, shape)`           | Checks that every element up to `end` (inclusive) matches the shape                                         |
| `exact(array)`               | Checks that the value matches the `array` exactly                                                           |

Note: you can also perform other checks such as `maxLength` on arrays using the [validators](#validators)

## Options

You can specify a set of options for the `Valigator`

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
  types?: object
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

Sometimes your data will match the keys we use in the shape as well as in the output. You can change any of the values using the `keys` option.

```js
const options = {
    keys: {
        success: "newKey1",
        message: "newKey2",
        type: "newKey3",
        required: "newKey4",
        validators: "newKey5",
    },
};

new Valigator(options);
```

### Default type overriding

If you don't like the way we validate our default types you can override them. You can also add new types in the same way.

```js
const options = {
    types: {
        string: {
            validators: [someValidator, someOtherValidator],
        },
    },
};

new Valigator(options);
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Valigator](#valigator)
    -   [Parameters](#parameters)
    -   [validate](#validate)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples)
    -   [validate_more](#validate_more)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-1)

## Valigator

Valigator class is used to check that some data matches some specified shape

### Parameters

-   `options` **options?**

### validate

Checks whether some data matches a specified shape and just returns a boolean value as a result

#### Parameters

-   `data` **any** Data to check
-   `shape` **Record&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), any>** Shape the data is supposed to match

#### Examples

```javascript
const valigator = new Valigator();
valigator.validate(10, {type: "number"});
// => true

const valigator = new Valigator();
valigator.validate({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
// => true

const valigator = new Valigator();
valigator.validate({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
// => true
```

Returns **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** representing if data is valid or not

### validate_more

Checks whether some data matches a specified shape and returns an object containing all the places where it failed and their corresponding messages

#### Parameters

-   `data` **any** Data to check
-   `shape` **Record&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), any>** Shape the data is supposed to match

#### Examples

```javascript
const valigator = new Valigator();
valigator.validate_more(10, {type: "number"});
// => {success: true}

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
// => { names: { first: { success: true }, last: { success: true } } }

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
// => { names: { first: { success: true }, last: { success: true } } }

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh" }}, {names: {first: {type: "number"}}});
// => { names: { first: { success: false, message: 'Invalid value for data' } } }
```

Returns **Record&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), any>** Object representing what passed and what failed
