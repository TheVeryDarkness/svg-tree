// Basic usage example for svg-tree library
import { SVGTree, Rectangle, Circle, Text, SVGUtils } from '../dist/index.js';

// Create a new SVG tree
const tree = new SVGTree(400, 300);
tree.setViewBox(0, 0, 400, 300);

// Add a rectangle
const rect = new Rectangle(
  { x: 50, y: 50 }, 
  { width: 100, height: 80 },
  { fill: 'blue', stroke: 'black', strokeWidth: 2 }
);
tree.add(rect);

// Add a circle
const circle = new Circle(
  { x: 200, y: 100 },
  40,
  { fill: SVGUtils.rgba(255, 0, 0, 0.7), stroke: 'darkred', strokeWidth: 3 }
);
tree.add(circle);

// Add some text
const text = new Text(
  { x: 100, y: 200 },
  'Hello SVG Tree!',
  { fontSize: '24px', fill: 'darkgreen', fontFamily: 'Arial' }
);
tree.add(text);

// Output the SVG
console.log(tree.toString());