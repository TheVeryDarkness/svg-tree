import { SVGElement } from './base.js';
import { Size, SVGAttributes } from './types.js';

/**
 * SVG container/root element
 */
export class SVG extends SVGElement {
  constructor(size: Size, attributes: SVGAttributes = {}) {
    super('svg', {
      width: size.width,
      height: size.height,
      xmlns: 'http://www.w3.org/2000/svg',
      ...attributes
    });
  }

  /**
   * Set the viewBox attribute
   */
  setViewBox(x: number, y: number, width: number, height: number): this {
    this.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
    return this;
  }

  /**
   * Convert to complete SVG string with XML declaration
   */
  toString(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${this.toSVG()}`;
  }

  /**
   * Save to file (Node.js environment)
   */
  save(filename: string): void {
    try {
      // Check if we're in Node.js environment
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        const fs = require('fs');
        fs.writeFileSync(filename, this.toString());
      } else {
        throw new Error('File saving is only available in Node.js environment');
      }
    } catch (error) {
      throw new Error('File saving is only available in Node.js environment');
    }
  }
}

/**
 * Factory class for creating SVG trees
 */
export class SVGTree {
  private svg: SVG;

  constructor(width: number, height: number, attributes: SVGAttributes = {}) {
    this.svg = new SVG({ width, height }, attributes);
  }

  /**
   * Get the root SVG element
   */
  getRoot(): SVG {
    return this.svg;
  }

  /**
   * Add an element to the root
   */
  add(element: SVGElement): this {
    this.svg.appendChild(element);
    return this;
  }

  /**
   * Set viewBox for the SVG
   */
  setViewBox(x: number, y: number, width: number, height: number): this {
    this.svg.setViewBox(x, y, width, height);
    return this;
  }

  /**
   * Convert to SVG string
   */
  toSVG(): string {
    return this.svg.toSVG();
  }

  /**
   * Convert to complete SVG string with XML declaration
   */
  toString(): string {
    return this.svg.toString();
  }

  /**
   * Save to file (Node.js environment)
   */
  save(filename: string): void {
    this.svg.save(filename);
  }
}