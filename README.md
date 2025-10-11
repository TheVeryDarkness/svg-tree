# svg-tree

A TypeScript library for rendering objects into SVG in a programmatic, object-oriented way. Build SVG graphics using simple, composable classes without dealing with raw XML strings.

## Features

- 🎯 **Fully Typed**: Written in TypeScript with complete type definitions
- 🧩 **Composable**: Build complex SVG structures using simple, reusable components  
- 🎨 **Rich Shapes**: Support for rectangles, circles, paths, polygons, text and more
- 🔧 **Utilities**: Helper functions for transformations, colors, and geometric calculations
- 📦 **Zero Dependencies**: Pure TypeScript/JavaScript with no external dependencies
- 🌐 **Universal**: Works in both browser and Node.js environments

## Installation

```bash
npm install svg-tree
```

## Quick Start

```typescript
import { SVGTree, Rectangle, Circle, Text } from 'svg-tree';

// Create a new SVG canvas
const tree = new SVGTree(400, 300);

// Add shapes
tree.add(new Rectangle(
  { x: 50, y: 50 }, 
  { width: 100, height: 80 },
  { fill: 'blue', stroke: 'black', strokeWidth: 2 }
));

tree.add(new Circle(
  { x: 200, y: 100 },
  40,
  { fill: 'red', opacity: 0.7 }
));

tree.add(new Text(
  { x: 100, y: 200 },
  'Hello SVG!',
  { fontSize: '24px', fill: 'green' }
));

// Generate SVG string
console.log(tree.toString());
```

## API Reference

### Core Classes

#### `SVGTree`
The main container for your SVG content.

```typescript
const tree = new SVGTree(width: number, height: number, attributes?: SVGAttributes);
tree.setViewBox(x: number, y: number, width: number, height: number);
tree.add(element: SVGElement);
tree.toString(); // Returns complete SVG with XML declaration
tree.toSVG();    // Returns just the SVG element
```

#### Basic Shapes

**Rectangle**
```typescript
new Rectangle(
  position: { x: number, y: number },
  size: { width: number, height: number },
  attributes?: SVGAttributes
)
```

**Circle**
```typescript
new Circle(
  center: { x: number, y: number },
  radius: number,
  attributes?: SVGAttributes
)
```

**Ellipse**
```typescript
new Ellipse(
  center: { x: number, y: number },
  radiusX: number,
  radiusY: number,
  attributes?: SVGAttributes
)
```

**Line**
```typescript
new Line(
  start: { x: number, y: number },
  end: { x: number, y: number },
  attributes?: SVGAttributes
)
```

**Text**
```typescript
new Text(
  position: { x: number, y: number },
  text: string,
  attributes?: SVGAttributes
)
```

#### Advanced Shapes

**Path**
```typescript
const path = new Path();
path.moveTo(100, 100)
    .lineTo(200, 200)
    .curveTo(150, 50, 250, 50, 200, 100)
    .closePath();
```

**Polygon**
```typescript
new Polygon(
  points: Array<{ x: number, y: number }>,
  attributes?: SVGAttributes
)
```

**Group**
```typescript
const group = new Group({ transform: 'translate(50, 50)' });
group.appendChild(rectangle);
group.appendChild(circle);
```

### Utilities

#### `SVGUtils`
Helper functions for common SVG operations:

```typescript
// Transformations
SVGUtils.translate(x, y)
SVGUtils.rotate(angle, centerX?, centerY?)
SVGUtils.scale(x, y?)
SVGUtils.combineTransforms(...transforms)

// Colors
SVGUtils.rgb(r, g, b)
SVGUtils.rgba(r, g, b, a)
SVGUtils.hsl(h, s, l)

// Geometry
SVGUtils.distance(point1, point2)
SVGUtils.rotatePoint(point, center, angle)
SVGUtils.regularPolygon(center, radius, sides, rotation?)
SVGUtils.star(center, outerRadius, innerRadius, points, rotation?)
```

## Examples

### Creating a Star
```typescript
import { SVGTree, Polygon, SVGUtils } from 'svg-tree';

const tree = new SVGTree(200, 200);
const starPoints = SVGUtils.star({ x: 100, y: 100 }, 50, 25, 5);
const star = new Polygon(starPoints, {
  fill: 'gold',
  stroke: 'orange',
  strokeWidth: 2
});

tree.add(star);
```

### Using Groups and Transformations
```typescript
import { SVGTree, Rectangle, Group, SVGUtils } from 'svg-tree';

const tree = new SVGTree(300, 300);

// Create a group with transformation
const group = new Group({
  transform: SVGUtils.combineTransforms(
    SVGUtils.translate(150, 150),
    SVGUtils.rotate(45)
  )
});

// Add shapes to the group
group.appendChild(new Rectangle(
  { x: -25, y: -25 },
  { width: 50, height: 50 },
  { fill: 'purple' }
));

tree.add(group);
```

### Complex Path Drawing
```typescript
import { SVGTree, Path } from 'svg-tree';

const tree = new SVGTree(300, 200);

// Draw a house
const house = new Path({
  fill: 'brown',
  stroke: 'black',
  strokeWidth: 2
});

house.moveTo(100, 150)      // Start at bottom left
     .lineTo(100, 100)      // Up to wall
     .lineTo(150, 50)       // Up to roof peak
     .lineTo(200, 100)      // Down to wall
     .lineTo(200, 150)      // Down to bottom
     .closePath();          // Close the shape

tree.add(house);
```

## File Output (Node.js)

In Node.js environments, you can save SVG files directly:

```typescript
tree.save('output.svg');
```

## Browser Usage

In browsers, you can insert the SVG into the DOM:

```typescript
const svgString = tree.toSVG();
document.getElementById('container').innerHTML = svgString;
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
