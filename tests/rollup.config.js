import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import raw from "@loonguo/rollup-plugin-raw";

export default {
  input: "tests/tests.ts",
  output: {
    file: "dist-tests/tests.js",
    format: "es",
  },
  plugins: [
    typescript({
      tsconfig: "./tests/tsconfig.json",
    }),
    raw({
      include: "**/*.svg",
    }),
    nodeResolve(),
    commonjs(),
  ],
};
