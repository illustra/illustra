# Transformations

Transformations are a way to move layers around a document. Transformations include translating, rotating, resizing, reflecting, and aligning. This guide will cover all the transformations you can use with Illustra.

# Translating

A translation is a basic movement of a layer. For example, we can translate a layer to be 100 pixels from the left and 200 pixels from the top of the document with the [`Layer.translate()`](https://illustra.apixel.me/docs/classes/Layer#translate) method:

```js
// Translate layer
layer.translate(100, 200);
```

We can also translate a layer relative to its current position with the [`Layer.translateBy()`](https://illustra.apixel.me/docs/classes/Layer#translateBy) method:

```js
// Translate layer relatively
layer.translateBy(100, 200);
```

---

# Rotating

You can rotate a layer with the [`Layer.rotate()`](https://illustra.apixel.me/docs/classes/Layer#translate) method:

```js
// Rotate layer by 30 degrees
layer.rotate(30);
```

---

# Resizing

Resizing works in a similar way to translating with the [`Layer.resize()`](https://illustra.apixel.me/docs/classes/Layer#resize) and [`Layer.resizeBy()`](https://illustra.apixel.me/docs/classes/Layer#resizeBy) methods:

```js
// Resize layer to be 200 pixels by 200 pixels
layer.resize(200, 200);

// Resize layer to be 200 by 200 pixels larger
layer.resizeBy(200, 200);
```

Omitting or passing `undefined` to a parameter will scale the layer automatically to preserve aspect ratio. To allow the layer to stretch, you can pass `null`.

`Layer.resizeBy()` also takes an optional third boolean parameter. When `true`, the `width` and `height` parameters will be used as a percent of this layer's current size:

```js
// Resize layer to be half its current size
layer.resizeBy(50, 50, true);
```

---

# Reflecting

You can reflect a layer with the [`Layer.reflect()`](https://illustra.apixel.me/docs/classes/Layer#reflect) method:

```js
// Reflect layer vertically
layer.reflect("vertical");

// Reflect layer horizontally
layer.reflect("horizontal");
```

---

# Aligning

The [`Layer.align()`](https://illustra.apixel.me/docs/classes/Layer#align) method lets you align a layer to a document. For example, you can align a layer to the right center of the document with an offset of 50 pixels:

```js
// Align layer
layer.align({
    left: "end",
    top: "center",
    leftOffset: 50,
    topOffset: 50
});
```

You can also enter the offset as a percent of the document's size with the `topOffsetUnits` and `leftOffsetUnits` properties:

```js
// Align layer
layer.align({
    left: "end",
    top: "center",
    leftOffset: 50,
    topOffset: 50,
    leftOffsetUnits: "percent",
    topOffsetUnits: "percent"
});
```