# Shape Layers

A [`ShapeLayer`](https://illustra.apixel.me/docs/classes/ShapeLayer) allows you to add shapes to your document. A shape layer's fill color, stroke color, and stroke width can be customized. There are two types of shapes that Illustra supports: polygons and ellipses. Let's go over creating a polygon:

```js
// Create a polygon shape layer
document.createShapeLayer({
    name: "layerName",
    shape: {
        type: "polygon",
        sides: 5,
        width: 200,
        height: 200,
        fill: "#574ae2",
        stroke: "#f63e70",
        strokeWidth: 5
    }
});
```

We can also create an ellipse:

```js
// Create an ellipse shape layer
document.createShapeLayer({
    name: "layerName",
    shape: {
        type: "ellipse",
        width: 200,
        height: 200,
        fill: "#574ae2",
        stroke: "#f63e70",
        strokeWidth: 5
    }
});
```