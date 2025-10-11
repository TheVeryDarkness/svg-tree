import { Position as Point } from './types.js';

/**
 * Utility functions for working with SVG elements
 */
export class SVGUtils {
  /**
   * Convert degrees to radians
   */
  static degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees
   */
  static radToDeg(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Calculate distance between two points
   */
  static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Rotate a point around a center
   */
  static rotatePoint(point: Point, center: Point, angle: number): Point {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = point.x - center.x;
    const dy = point.y - center.y;

    return {
      x: center.x + dx * cos - dy * sin,
      y: center.y + dx * sin + dy * cos
    };
  }

  /**
   * Generate a transform string for rotation
   */
  static rotate(angle: number, centerX?: number, centerY?: number): string {
    if (centerX !== undefined && centerY !== undefined) {
      return `rotate(${angle} ${centerX} ${centerY})`;
    }
    return `rotate(${angle})`;
  }

  /**
   * Generate a transform string for translation
   */
  static translate(x: number, y: number): string {
    return `translate(${x} ${y})`;
  }

  /**
   * Generate a transform string for scaling
   */
  static scale(x: number, y?: number): string {
    return y !== undefined ? `scale(${x} ${y})` : `scale(${x})`;
  }

  /**
   * Combine multiple transforms
   */
  static combineTransforms(...transforms: string[]): string {
    return transforms.join(' ');
  }

  /**
   * Create RGB color string
   */
  static rgb(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
  }

  /**
   * Create RGBA color string
   */
  static rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r},${g},${b},${a})`;
  }

  /**
   * Create HSL color string
   */
  static hsl(h: number, s: number, l: number): string {
    return `hsl(${h},${s}%,${l}%)`;
  }

  /**
   * Clamp a value between min and max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolation between two values
   */
  static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  /**
   * Generate points for a regular polygon
   */
  static regularPolygon(center: Point, radius: number, sides: number, rotation: number = 0): Point[] {
    const points: Point[] = [];
    const angleStep = (Math.PI * 2) / sides;
    
    for (let i = 0; i < sides; i++) {
      const angle = angleStep * i + rotation;
      points.push({
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      });
    }
    
    return points;
  }

  /**
   * Generate points for a star
   */
  static star(center: Point, outerRadius: number, innerRadius: number, points: number, rotation: number = 0): Point[] {
    const result: Point[] = [];
    const angleStep = Math.PI / points;
    
    for (let i = 0; i < points * 2; i++) {
      const angle = angleStep * i + rotation;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      result.push({
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      });
    }
    
    return result;
  }
}