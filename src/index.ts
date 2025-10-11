// Export types
export * from './types.js';

// Export base classes
export { SVGElement } from './base.js';

// Export shapes
export {
  Rectangle,
  Circle,
  Ellipse,
  Line,
  Polyline,
  Polygon,
  Path,
  Text,
  Group
} from './shapes.js';

// Export SVG container and tree
export { SVG, SVGTree } from './svg.js';

// Export utilities
export { SVGUtils } from './utils.js';

// Re-export for convenience
export { SVGTree as default } from './svg.js';