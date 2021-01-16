# Documents vs Layers

[Documents](https://illustra.apixel.me/docs/classes/Document) can be thought of as canvases, they holds all the parts of the image together and let you organize everything. These documents are made up of [`Layer`s](https://illustra.apixel.me/docs/classes/BaseLayer), which hold the data to create the image. There are different kinds of layers, such as regular [`Layer`s](https://illustra.apixel.me/docs/classes/Layer), [`TextLayer`s](https://illustra.apixel.me/docs/classes/TextLayer), [`Polygon`s](https://illustra.apixel.me/docs/classes/Polygon), [`Ellipse`s](https://illustra.apixel.me/docs/classes/Ellipse), and even [`ClippingMask`s](https://illustra.apixel.me/docs/classes/ClippingMask).

---

# Documents

You can create a [Document](https://illustra.apixel.me/docs/classes/Document) with the `Document` constructor. It takes an object with the document's name and dimensions:

```js
// Create document
const document = new Document({
    name: "Document Name",
    width: 1920,
    height: 1080
});
```

With a `Document`, you can use the [`createLayer`](https://illustra.apixel.me/docs/classes/Document#createLayer), [`createTextLayer`](https://illustra.apixel.me/docs/classes/Document#createTextLayer), [`createPolygon`](https://illustra.apixel.me/docs/classes/Document#createPolygon), [`createEllipse`](https://illustra.apixel.me/docs/classes/Document#createEllipse), and [`createClippingMask`](https://illustra.apixel.me/docs/classes/Document#createClippingMask) methods to create different types of layers.

---

# Layers

There are five types of layers: regular [`Layer`s](https://illustra.apixel.me/docs/classes/Layer), [`TextLayer`s](https://illustra.apixel.me/docs/classes/TextLayer), [`Polygon`s](https://illustra.apixel.me/docs/classes/Polygon), [`Ellipse`s](https://illustra.apixel.me/docs/classes/Ellipse), and [`ClippingMask`s](https://illustra.apixel.me/docs/classes/ClippingMask). There are two ways to create each type of layer. You can either create it directly into a document, or on its own. Let's cover creating a layer into a document first:

```js
// Create layer
await document.createLayer({
    name: "layerName",
    file: `${__dirname}/assets/image.png`
});
```

This uses the [`Document.createLayer`](https://illustra.apixel.me/docs/classes/Document#createLayer) method to create a layer and add it to the document. Although this is the most common way to create a layer, it isn't the only way.

Layers don't *have* to be part of a document. If you're making a simple change, like [grayscaling](https://illustra.apixel.me/docs/classes/BaseLayer#grayscale) a layer, you might not need multiple layers. If you don't need multiple layers, there's a good chance you also don't need a document. That's why Illustra allows you to create a standalone layer:

```js
import { createLayer } from "illustra";

// Create layer
await createLayer({
    name: "layerName",
    file: `${__dirname}/assets/image.png`
});
```

Or, if you've imported Illustra without destructing properties, ie. `import illustra from "illustra"`, you can use `illustra.createLayer(...)`.

---

# Getting Layers

Getting layers from documents is simple. Just use the [`Document.getLayer()`](https://illustra.apixel.me/docs/classes/Document#getLayer) method and pass a layer name or index as a parameter:

```js
// Get layer from name
const layerFromName = document.getLayer("layerName");

// Get layer from index
const layerFromIndex = document.getLayer(2);
```

---

# Layer Operations

There are plenty of ways to organize your documents. [Duplicating](https://illustra.apixel.me/docs/classes/BaseLayer#duplicate) layers, [merging](https://illustra.apixel.me/docs/classes/Document#mergeLayers) them, [flattening](https://illustra.apixel.me/docs/classes/Document#mergeLayers) an entire document, and [removing or deleting](https://illustra.apixel.me/docs/classes/BaseLayer#remove) layers from documents.

Illustra also provides methods to [transform layers](https://illustra.apixel.me/guide/transformations), adjust the [hue](https://illustra.apixel.me/docs/classes/BaseLayer#hue) and [saturation](https://illustra.apixel.me/docs/classes/BaseLayer#saturation), as well as support for [blend modes](https://illustra.apixel.me/guide/blend-modes).

You can check out the [`BaseLayer` docs](https://illustra.apixel.me/docs/classes/BaseLayer) to see everything you can do with layers.

---

# Exporting

Illustra lets you export an entire document, or individual layers. There are two ways to export something: to a file and as a buffer. Let's cover exporting to a file first:

```js
// Export
await document.exportTo("png", "file", `${__dirname}/images/image.png`);
```

We're using the [`Document.exportTo`](https://illustra.apixel.me/docs/classes/Document#exportTo) method to export the document. You can also use [`BaseLayer.exportTo`](https://illustra.apixel.me/docs/classes/BaseLayer#exportTo) in the same way to export a single layer. The first parameter is the file format, which is PNG in this example. You can see the supported file format in the [docs](https://illustra.apixel.me/docs/classes/Document#exportTo). The next parameter is the type. This is either `"file"` or `"buffer"`. Since we're exporting as a file, we need to specify the path as the third parameter. Note how we're using an absolute path.

Now let's look at exporting as a buffer:

```js
// Export
const imageData = await document.exportTo("png", "buffer");
```

This is similar to exporting as a file, except the `exportType` parameter is `"buffer"` instead of `"file"`. We also don't need to specify the path, since the [Buffer](https://nodejs.org/api/buffer.html) will simply be returned. We can also optionally pass a third boolean parameter. When `true`, an [ExportMetadata](https://illustra.apixel.me/docs/interfaces/ExportMetadata) object will be returned instead of a Buffer.