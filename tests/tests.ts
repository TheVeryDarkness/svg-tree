import qunit from "qunit";
import { Tree } from "../src/svg";
import { Children, createContext, Data, defaultLightColorOptions, defaultOptions, mergeOptions, Options } from "../src/types";

interface T extends Data, Children<T> {}

/**
 * @param n depth
 * @returns
 */
function deepChain(n: number): T {
  let node: T = { name: "leaf", children: [] };
  for (let i = 0; i < n; i++) {
    node = { name: `node depth=${i}`, children: [node] };
  }
  return node;
}
/**
 * @param n depth
 * @returns
 */
function binaryTree(depth: number): T {
  if (depth === 0) {
    return { name: "leaf", children: [] };
  }
  return {
    name: `node depth=${depth}`,
    children: [binaryTree(depth - 1), binaryTree(depth - 1)],
  };
}

const deepChain10 = deepChain(10);
const deepBinary2 = binaryTree(2);

qunit.module("create test");

import deepChain10Std from "./deepChain10.svg?raw";
import deepBinary2Std from "./deepBinary2.svg?raw";

const canvas = new OffscreenCanvas(0, 0);
const ctx = createContext(canvas);

const options: Options = mergeOptions({
  color: { ...defaultLightColorOptions },
  font: { fontFamily: "JetBrains Mono" },
});

qunit.test("deepChain10", () => {
  const tree = new Tree(deepChain10, "path", options, ctx);
  // console.log(tree.svg.outerHTML);
  qunit.assert.strictEqual(tree.svg.outerHTML, deepChain10Std);
});

qunit.test("deepBinary2", () => {
  const tree = new Tree(deepBinary2, "path", options, ctx);
  // console.log(tree.svg.outerHTML);
  qunit.assert.strictEqual(tree.svg.outerHTML, deepBinary2Std);
});
