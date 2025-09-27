/**
 * Common SVG attributes that can be applied to most elements
 */
export interface SVGAttributes {
  id?: string;
  class?: string;
  style?: string;
  transform?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

/**
 * Base interface for all SVG elements
 */
export interface SVGElement {
  tagName: string;
  attributes: SVGAttributes & Record<string, any>;
  children?: SVGElement[];
}

/**
 * Position interface for elements that need positioning
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Size interface for elements that have dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Point interface for path operations
 */
export interface Point {
  x: number;
  y: number;
}