import { SVGElement } from './base.js';
import { Position, Size, Point, SVGAttributes } from './types.js';

/**
 * Rectangle element
 */
export class Rectangle extends SVGElement {
  constructor(position: Position, size: Size, attributes: SVGAttributes = {}) {
    super('rect', {
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      ...attributes
    });
  }
}

/**
 * Circle element
 */
export class Circle extends SVGElement {
  constructor(center: Position, radius: number, attributes: SVGAttributes = {}) {
    super('circle', {
      cx: center.x,
      cy: center.y,
      r: radius,
      ...attributes
    });
  }
}

/**
 * Ellipse element
 */
export class Ellipse extends SVGElement {
  constructor(center: Position, radiusX: number, radiusY: number, attributes: SVGAttributes = {}) {
    super('ellipse', {
      cx: center.x,
      cy: center.y,
      rx: radiusX,
      ry: radiusY,
      ...attributes
    });
  }
}

/**
 * Line element
 */
export class Line extends SVGElement {
  constructor(start: Position, end: Position, attributes: SVGAttributes = {}) {
    super('line', {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      ...attributes
    });
  }
}

/**
 * Polyline element
 */
export class Polyline extends SVGElement {
  constructor(points: Point[], attributes: SVGAttributes = {}) {
    const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');
    super('polyline', {
      points: pointsString,
      ...attributes
    });
  }
}

/**
 * Polygon element
 */
export class Polygon extends SVGElement {
  constructor(points: Point[], attributes: SVGAttributes = {}) {
    const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');
    super('polygon', {
      points: pointsString,
      ...attributes
    });
  }
}

/**
 * Path element
 */
export class Path extends SVGElement {
  private pathData: string = '';

  constructor(attributes: SVGAttributes = {}) {
    super('path', attributes);
  }

  /**
   * Move to a point
   */
  moveTo(x: number, y: number): this {
    this.pathData += `M ${x} ${y} `;
    this.setAttribute('d', this.pathData.trim());
    return this;
  }

  /**
   * Draw line to a point
   */
  lineTo(x: number, y: number): this {
    this.pathData += `L ${x} ${y} `;
    this.setAttribute('d', this.pathData.trim());
    return this;
  }

  /**
   * Draw curve to a point
   */
  curveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this {
    this.pathData += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y} `;
    this.setAttribute('d', this.pathData.trim());
    return this;
  }

  /**
   * Close the path
   */
  closePath(): this {
    this.pathData += 'Z ';
    this.setAttribute('d', this.pathData.trim());
    return this;
  }

  /**
   * Set custom path data
   */
  setPathData(data: string): this {
    this.pathData = data;
    this.setAttribute('d', data);
    return this;
  }
}

/**
 * Text element
 */
export class Text extends SVGElement {
  private textContent: string;

  constructor(position: Position, text: string, attributes: SVGAttributes = {}) {
    super('text', {
      x: position.x,
      y: position.y,
      ...attributes
    });
    this.textContent = text;
  }

  /**
   * Set the text content
   */
  setText(text: string): this {
    this.textContent = text;
    return this;
  }

  /**
   * Get the text content
   */
  getText(): string {
    return this.textContent;
  }

  toSVG(): string {
    const attributeString = this.getAttributeString();
    return `<${this.tagName}${attributeString}>${this.textContent}</${this.tagName}>`;
  }
}

/**
 * Group element
 */
export class Group extends SVGElement {
  constructor(attributes: SVGAttributes = {}) {
    super('g', attributes);
  }
}