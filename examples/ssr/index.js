const { Valigator, isString, minLength } = require("valigators");
const express = require("express");

const port = 3000;
const app = express();

app.get("*", (req, res) => {
    let valigator = new Valigator();

    const valid_data = {
        name: "bob",
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
        },
        example: {
            // Works with nested objects
            foo: {
                type: "text",
                required: false,
            },
        },
    };

    const validation = valigator.validate(valid_data, shape);
    let string = isString("this");

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
    </head>
    <body>
        <h1>Validation: ${validation}</h1>
        <h1>isString: ${string}</h1>

    </body>
    </html>`);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
