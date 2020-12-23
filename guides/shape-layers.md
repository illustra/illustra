# Polygons

A [`Polygon`](https://illustra.apixel.me/docs/classes/Polygon) allows you to add polygons to your document. A polygon's fill color, stroke color, and stroke width can be customized. Let's go over creating a polygon:

```js
// Create a polygon
document.createPolygon({
    name: "layerName",
    shape: {
        width: 200,
        height: 200,
        sides: 5,
        fill: "#574ae2",
        stroke: "#f63e70",
        strokeWidth: 5
    }
});
```

---

# Ellipses

Illustra also supports creating ellipses:

```js
// Create an ellipse
document.createEllipse({
    name: "layerName",
    shape: {
        width: 200,
        height: 200,
        fill: "#574ae2",
        stroke: "#f63e70",
        strokeWidth: 5
    }
});
```