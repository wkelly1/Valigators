
<p align="center"><img src="/.github/gator.png" alt="Valigator" title="Valigator" width="200px"></p>

<h1 align="center">Valigators</h1>
<p align="center">
    <a href="https://www.npmjs.com/package/valigators"><img src="https://shields.io/npm/v/valigators" alt="NPM version" title="NPM version"/></a>
    <a href="https://github.com/wkelly1/Valigators/blob/master/LICENSE"><img src="https://shields.io/npm/l/valigators" alt="Licence" title="Licence"/></a>
    <a href="https://www.npmjs.com/package/valigators"><img src="https://shields.io/npm/dt/valigators" alt="NPM downloads" title="NPM downloads"/></a>
    <a href="https://codecov.io/gh/wkelly1/Valigators"><img src="https://codecov.io/gh/wkelly1/Valigators/branch/master/graph/badge.svg?token=WVVZJV3PIH" alt="Code coverage" title="Code coverage"/></a>
</p>

<p align="center">Valigators is a simple library for validating that data matches a specific 'shape'</p>

## Usage

### Install

```bash
npm i valigators --save
# or
yarn add valigators
```

### In Node.js

```javascript
const { Valigator } = require("valigators");
```

### ESM

```javascript
import Valigator from "valigators";
```

### Browser

```html
<script src="valigators.min.js"></script>
```

#### CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/valigators/1.3.1/valigators.min.js" integrity="sha512-xmQDNVmIKZZSVSeuJzUi5o+VwhVPQCGBK27om2EqhXH7wWFQeLUPBOVPjZ49rt4NRvUTsMI64zURKzy8wx107Q==" crossorigin="anonymous"></script>
```

### Example

```javascript
import Valigator, { minLength } from "valigators";

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
        validators: [minLength(2)], // Optional list is extra validators to run
    },
    age: {
        type: "number",
        onError: (error) => {
            console.log("Error: ", error);
        }, // <== you can optionally add a onError method that runs if this value is an error
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
//     success: true,
//     values: {
//         name: { success: true },
//         age: { success: true },
//         example: { foo: { success: true } },
//     },
// };

valigator.validate_more(invalid_data, shape);
// => {
//     success: false,
//     values: {
//         age: { success: true },
//         example: { foo: { success: true } },
//         name: {
//             success: false,
//             message: "Value is required but is missing",
//         },
//     },
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

| Type                 | Validations                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| `text`               | `[isString]`                                                                        |
| `number`             | `[isNumber]`                                                                        |
| `array`              | `[isArray]`                                                                         |
| `boolean`            | `[isBoolean]`                                                                       |
| `email`              | `[isString, containsRegex(emailRegex)]`                                             |
| `phone`              | `[isString, containsRegex(phoneRegex)]`                                             |
| `date`               | `[isInstanceOf(Date)]`                                                              |
| `date_string`        | `[isString, containsRegex(dateRegex)]`                                              |
| `time_hhmm_12h`      | `[isString, containsRegex(time_hhmm_12h)]`                                          |
| `time_hhmm_24h`      | `[isString, containsRegex(time_hhmm_24h)]`                                          |
| `time_hhmmss_24h`    | `[isString, containsRegex(time_hhmmss_24h)]`                                        |
| `time_hhmmss_24h`    | `[isString, containsRegex(time_hhmmss_24h)]`                                        |
| `password`           | `[isString,containsUpper,containsLower,containsSymbol,containsNumber,minLength(8)]` |
| `longitude_latitude` | `[isString, containsRegex(longitude_latitude)]`                                     |
| `credit_card_number` | `[isString, containsRegex(credit_card_number)]`                                     |
| `ipv4_address`       | `[isString, containsRegex(ipv4_address)]`                                           |
| `ipv6_address`       | `[isString, containsRegex(ipv6_address)]`                                           |
| `url`                | `[isString, containsRegex(url)]`                                                    |

See [here](https://github.com/wkelly1/Valigators/blob/development/src/lib/Regex.ts) for raw regex

If you have additional types you want supported please add a feature request.

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

## Messages

By default valigators will display a message detailing what went wrong when you call `validate_more`. If any of the validators fail then you will get details about that in the `validationErrors` key:

```js
const valigator = new Valigator();

const invalid_data = {
    example: "bar",
};

const shape = {
    example: {
        type: "text",
        validators: [minLength(4)],
    },
};

valigator.validate_more(invalid_data, shape);
// => {
//     success: false, // Overall success
//     values: {
//         example: {
//             success: false, // Individual success
//             message: "Invalid value for data", // Individual error message
//             validationErrors: [
//                 {
//                     validator: "minLength",
//                     message: "Invalid value for data",
//                 },
//             ], // List of which validators failed
//         },
//     },
// };
```

When a validator failed you will get the default error message "Invalid value for data" (Default can be overwritten [see here](#Custom-default-error-messages)). However you may want individual custom messages for each validator. To do this:

```js
const valigator = new Valigator();

const invalid_data = {
    example: "bar",
};

const shape = {
    example: {
        type: "text",
        validators: [minLength(4)],
        messages: {
            minLength: "Oh no, minLength failed", // New message
        },
    },
};

valigator.validate_more(invalid_data, shape);
// => {
//     success: false, // Overall success
//     values: {
//         example: {
//             success: false, // Individual success
//             message: "Invalid value for data", // Individual error message
//             validationErrors: [
//                 {
//                     validator: "minLength",
//                     message: "Oh no, minLength failed", // <- now showing your message
//                 },
//             ], // List of which validators failed
//         },
//     },
// };
```

The key in the messages field matches the validator function name.

### Custom messages with custom validators

If you have written your own validator then to be able to provide a custom message you need to make sure you provide an id to the validator.

```js
const my_validator = customValidator((a, b, value) = {
    return (value % a) === b;
}, "myValidator") // <- make sure you define the identifier
```

Now when adding custom messages you can reference it via the identifer (e.g. `myValidator`)

```js
const shape = {
    example: {
        type: "text",
        validators: [my_validator],
        messages: {
            myValidator: "myValidator failed",
        },
    },
};
```

## onError callback

If you want a function to run when an error is found (for example to update some state to an error state) you can do it with the `onError` key in the shape object.

```js
const shape = {
    example: {
        type: "text",
        validators: [minLength(2)],
        onError: (error) => {
            console.log("Error:", error);
        }, // <== This is that call back function
    },
};
```

The `onError` function gives you access to the error which will like similar to the errors from `validate_more`. Here is an example:

```js
// error =>
{
    message: "Invalid value for data", // Overall error message
    validationErrors: [
        {
            validator: "minLength",
            message: "Invalid value for data",
        },
    ], // More details about which validators failed
};
```

Also note that the validationErrors field will not always be present as sometimes an error occurs thats not to do with a validation function failing.

Here is an example if your writing [React](https://reactjs.org/) code

```js
const [error, setError] = useState(false);
const [errorMsg, setErrorMsg] = useState("");

const shape = {
    example: {
        type: "text",
        validators: [minLength(2)],
        onError: (error) => {
            setError(true);
            setErrorMsg(error.message);
        },
    },
};
```

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
    messages?: string;
    validationErrors?: string;
    validator?: string;
    onError?: string;
  };
  types?: object
  requiredValues?: any[]
}
```

### Overriding the requiredValues

This field defines what should be caught when a value in the shape is set to required.

By default you will get a require error when the value does not exist in the data or when the value is just an empty string.

If you don't want it to check for empty string you can overwrite it.

```js
requiredValues: [];
```

Or if you want to add to it:

```js
requiredValues: [null, "foo"];
```

This will throw a value is required error whenever the value:

-   Does not exist in the data
-   Exists but is null
-   Exists but is equal to `"foo"`

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
        messages: "newKey6",
        validationErrors: "newKey7",
        validator: "newKey8",
        onError: "newKey9",
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

- [Valigators](#valigators)
  - [Usage](#usage)
    - [Install](#install)
    - [In Node.js](#in-nodejs)
    - [ESM](#esm)
    - [Browser](#browser)
    - [Example](#example)
  - [The shape object](#the-shape-object)
    - [Attributes](#attributes)
    - [Types](#types)
    - [Extending default types](#extending-default-types)
  - [Validators](#validators)
    - [Custom validator](#custom-validator)
  - [Arrays](#arrays)
  - [Messages](#messages)
    - [Custom messages with custom validators](#custom-messages-with-custom-validators)
  - [onError callback](#onerror-callback)
  - [Options](#options)
    - [Overriding the requiredValues](#overriding-the-requiredvalues)
    - [Custom default error messages](#custom-default-error-messages)
    - [Naming conflicts](#naming-conflicts)
    - [Default type overriding](#default-type-overriding)
- [API](#api)
    - [Table of Contents](#table-of-contents)
  - [arraysEqual](#arraysequal)
    - [Parameters](#parameters)
  - [all](#all)
    - [Parameters](#parameters-1)
  - [between](#between)
    - [Parameters](#parameters-2)
  - [containsLower](#containslower)
    - [Parameters](#parameters-3)
  - [containsNumber](#containsnumber)
    - [Parameters](#parameters-4)
  - [containsRegex](#containsregex)
    - [Parameters](#parameters-5)
  - [containsSymbol](#containssymbol)
    - [Parameters](#parameters-6)
  - [containsUpper](#containsupper)
    - [Parameters](#parameters-7)
  - [decimalPoints](#decimalpoints)
    - [Parameters](#parameters-8)
  - [equals](#equals)
    - [Parameters](#parameters-9)
  - [exact](#exact)
    - [Parameters](#parameters-10)
  - [fromN](#fromn)
    - [Parameters](#parameters-11)
  - [isArray](#isarray)
    - [Parameters](#parameters-12)
  - [isBoolean](#isboolean)
    - [Parameters](#parameters-13)
  - [isCube](#iscube)
    - [Parameters](#parameters-14)
  - [isDateString](#isdatestring)
    - [Parameters](#parameters-15)
  - [isEven](#iseven)
    - [Parameters](#parameters-16)
  - [isInstanceOf](#isinstanceof)
    - [Parameters](#parameters-17)
  - [isNegative](#isnegative)
    - [Parameters](#parameters-18)
  - [isNull](#isnull)
    - [Parameters](#parameters-19)
  - [isNumber](#isnumber)
    - [Parameters](#parameters-20)
  - [isOdd](#isodd)
    - [Parameters](#parameters-21)
  - [isPositive](#ispositive)
    - [Parameters](#parameters-22)
  - [isPrime](#isprime)
    - [Parameters](#parameters-23)
  - [isSquare](#issquare)
    - [Parameters](#parameters-24)
  - [isString](#isstring)
    - [Parameters](#parameters-25)
  - [length](#length)
    - [Parameters](#parameters-26)
  - [maxDecimalPoint](#maxdecimalpoint)
    - [Parameters](#parameters-27)
  - [maxLength](#maxlength)
    - [Parameters](#parameters-28)
  - [minDecimalPoint](#mindecimalpoint)
    - [Parameters](#parameters-29)
  - [minLength](#minlength)
    - [Parameters](#parameters-30)
  - [minMaxLength](#minmaxlength)
    - [Parameters](#parameters-31)
  - [oneOf](#oneof)
    - [Parameters](#parameters-32)
  - [or](#or)
    - [Parameters](#parameters-33)
  - [some](#some)
    - [Parameters](#parameters-34)
  - [substring](#substring)
    - [Parameters](#parameters-35)
  - [upto](#upto)
    - [Parameters](#parameters-36)
  - [Valigator](#valigator)
    - [Parameters](#parameters-37)
    - [validate](#validate)
      - [Parameters](#parameters-38)
      - [Examples](#examples)
    - [validate_more](#validate_more)
      - [Parameters](#parameters-39)
      - [Examples](#examples-1)
- [Contributing](#contributing)
  - [Build](#build)
  - [Code of Conduct](#code-of-conduct)
  - [Contributing Guide](#contributing-guide)
  - [Licence](#licence)

## arraysEqual

Checks that two values are both arrays and that they are equal

### Parameters

-   `a` **any** Value to check
-   `b` **any** Other value to check

## all

Checks that every value in an array matches some shape

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether they all match

## between

Checks that every value in an array between a start and end index matches some shape

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether they all match

## containsLower

Checks whether the value converted to string contains an lower case character

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether contains an lower case character

## containsNumber

Checks whether the value converted to string contains a number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether contains a number

## containsRegex

Checks whether the value converted to string contains a specified regex
With arrays it will check that any of the values match the regex

Type: TValidator

### Parameters

-   `reg` Regex to test
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether contains a specified regex

## containsSymbol

Checks whether the value converted to string contains a symbol
With arrays it will check that any of the values contain a symbol

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether contains a symbol

## containsUpper

Checks whether the value converted to string contains an upper case character

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether contains an upper case character

## decimalPoints

Checks whether a number has exactly the specified number of decimal points

Type: TValidator

### Parameters

-   `n` Value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing has correct decimal points

## equals

Checks whether the value is equal to a specified value using ===

Type: TValidator

### Parameters

-   `equal` Value to check equals to
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** {boolean} Boolean representing if they are equal

## exact

Checks that the value exactly matches the array

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether they match

## fromN

Checks that values from a start index in an array matches some shape

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether values from start index match

## isArray

Checks if value is an array

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether array or not

## isBoolean

Checks if value is a boolean

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether boolean or not

## isCube

Checks whether a value is a number and whether that number is a cube number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a cube or not

## isDateString

Checks whether a value is a string in the format of a date

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a date string or not

## isEven

Checks whether a value is a number and whether that number is even

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a even or not

## isInstanceOf

Tests the presence of constructor.prototype in object's prototype chain

Type: TValidator

### Parameters

-   `typeClass` function to test against
-   `value` Object to test

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean

## isNegative

Checks whether a value is a number and whether that number is a negative number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a negative number or not

## isNull

Checks if value is null

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether null or not

## isNumber

Checks if value is a number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether number or not

## isOdd

Checks whether a value is a number and whether that number is odd

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a odd or not

## isPositive

Checks whether a value is a number and whether that number is a positive number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a positive number or not

## isPrime

Checks whether a value is a number and whether that number is prime

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a prime or not

## isSquare

Checks whether a value is a number and whether that number is a square number

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether is a prime or not

## isString

Checks if value is a string

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether string or not

## length

Checks whether a value converted to a string has a specific length

Type: TValidator

### Parameters

-   `n` Length
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether right length or not

## maxDecimalPoint

Checks whether a number has less than or equal to a specified number of decimal points

Type: TValidator

### Parameters

-   `max` Max value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing has correct decimal points

## maxLength

Checks that a value has length less than max value inclusive

Type: TValidator

### Parameters

-   `max` Max value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether right length or not

## minDecimalPoint

Checks whether a number has greater than or equal to a specified number of decimal points

Type: TValidator

### Parameters

-   `min` Min value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing has correct decimal points

## minLength

Checks that a value has length greater than min value inclusive

Type: TValidator

### Parameters

-   `min` Min value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether right length or not

## minMaxLength

Checks whether a value has length between min and max value inclusive

Type: TValidator

### Parameters

-   `min` Min value
-   `max` Max value
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether right length or not

## oneOf

Takes an array and checks that the value matches on of the elements in the array

Type: TValidator

### Parameters

-   `elems` Elements value could be
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean representing whether the value matches one of the elems

## or

Used if you you don't mind if some of the validators fail as long as one passes

Type: TValidator

### Parameters

-   `validators` Functions to run
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value if one of the functions passes

## some

Checks that some values in an array matches some shape

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether some match

## substring

Checks whether a value converted to a string contains a specific substring inner

Type: TValidator

### Parameters

-   `inner` Substring to check for (converted to string)
-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether it contains substring

## upto

Checks that values up to an index value in an array matches some shape

Type: TValidator

### Parameters

-   `value` Value to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean value representing whether they all match

## Valigator

Valigator class is used to check that some data matches some specified shape

### Parameters

-   `options` **TOptions?** Optional settings

### validate

Checks whether some data matches a specified shape and just returns a boolean value as a result

#### Parameters

-   `data` **any** Data to check
-   `shape` **TShape** Shape the data is supposed to match
-   `stopAtError` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?**

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
-   `shape` **TShape** Shape the data is supposed to match

#### Examples

```javascript
const valigator = new Valigator();
valigator.validate_more(10, {type: "number"});
// => {success: true, values: {success: true}}

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh", last: "Chugtai" }, {names: {first: {type: "text"}, last: {type: "text"}}});
// => {success: true, values: { names: { first: { success: true }, last: { success: true } } }}

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh" }, {names: {first: {type: "text"}, last: {type: "text", required: false}}});
// => {success: true, values: { names: { first: { success: true }, last: { success: true } } }}

const valigator = new Valigator();
valigator.validate_more({names: {first: "Dinesh" }}, {names: {first: {type: "number"}}});
// => {success: false, values: { names: { first: { success: false, message: 'Invalid value for data' } } }}
```

Returns **{success: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean), values: TMsg}** Object representing what passed and what failed

# Contributing

## Build

To build the project

```bash
yarn build
# or
npm run build
```

## [Code of Conduct](CODE_OF_CONDUCT.md)

Please see full [code of conduct](CODE_OF_CONDUCT.md)

## [Contributing Guide](.github/CONTRIBUTING.md)

To contribute to the project please see the [contributing guide](.github/CONTRIBUTING.md)

## Licence

Valigators is [MIT licensed](LICENCE)
