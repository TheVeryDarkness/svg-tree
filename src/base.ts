import { SVGElement as ISVGElement, SVGAttributes } from './types.js';

/**
 * Base class for all SVG elements
 */
export abstract class SVGElement implements ISVGElement {
  public tagName: string;
  public attributes: SVGAttributes & Record<string, any>;
  public children: SVGElement[];

  constructor(tagName: string, attributes: SVGAttributes & Record<string, any> = {}) {
    this.tagName = tagName;
    this.attributes = { ...attributes };
    this.children = [];
  }

  /**
   * Add a child element
   */
  appendChild(child: SVGElement): this {
    this.children.push(child);
    return this;
  }

  /**
   * Set an attribute
   */
  setAttribute(name: string, value: any): this {
    this.attributes[name] = value;
    return this;
  }

  /**
   * Get an attribute
   */
  getAttribute(name: string): any {
    return this.attributes[name];
  }

  /**
   * Set multiple attributes
   */
  setAttributes(attributes: Record<string, any>): this {
    Object.assign(this.attributes, attributes);
    return this;
  }

  /**
   * Convert the element to SVG string
   */
  toSVG(): string {
    const attributeString = this.getAttributeString();
    const childrenString = this.children.map(child => child.toSVG()).join('');

    if (this.children.length === 0) {
      return `<${this.tagName}${attributeString} />`;
    } else {
      return `<${this.tagName}${attributeString}>${childrenString}</${this.tagName}>`;
    }
  }

  /**
   * Convert attributes to string format
   */
  protected getAttributeString(): string {
    const attrs = Object.entries(this.attributes)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebabKey}="${value}"`;
      });

    return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  }
}