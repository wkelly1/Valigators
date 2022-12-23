// rollup.config.js
import typescript from "rollup-plugin-typescript";

const dist = "dist";

export default {
    input: "src/index.ts",
    plugins: [
        typescript({
            declaration: true /* Generates corresponding '.d.ts' file. */,
            declarationDir: `${dist}/types`,
        }),
    ],
    output: [
        {
            file: `${dist}/bundle.cjs.js`,
            format: "cjs",
        },
        {
            file: `${dist}/bundle.esm.js`,
            format: "esm",
        },
        {
            name: "Valigators",
            file: `${dist}/valigators.min.js`,
            format: "umd",
        },
    ],
};
