import React, { useState } from "react";
import Valigator, { isString, minLength } from "valigators";

function App() {
    const [output, setOutput] = useState("");

    function click() {
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
        console.log(validation, string);
        setOutput(validation.toString());
    }

    return (
        <div>
            Running
            <button onClick={click}>Click me</button>
            {output && (
                <>
                    <pre>
                        {`Output from:

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
// => `}
                        {output}
                    </pre>
                </>
            )}
        </div>
    );
}

export default App;
