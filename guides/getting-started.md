Getting Started (https://illustra.apixel.me/assets/guides/star.svg)

# Installation

Illustra is distributed via [NPM](https://npm.org/package/illustra). You can install it with the NPM CLI tool or with Yarn. Illustra has TypeScript support built in.

NPM:
```
npm install illustra
```

Yarn:
```
yarn add illustra
```

Once installed, you can import it into your project as usual:

```js
// CommonJS
const illustra = require("illustra");

// or ES6 imports
import illustra from "illustra";
```

Or if you'd prefer, you can destruct the imports:

```js
// CommonJS
const { Document, createLayer, createTextLayer, ... } = require("illustra");

// or ES6 imports
import { Document, createLayer, createTextLayer, ... } from "illustra";
```

---

# Basic Usage

Illustra is modeled the same way as Photoshop, so we use the concept of [Documents](https://illustra.apixel.me/docs/classes/Document) for a canvas, and [Layers](https://illustra.apixel.me/docs/classes/Layer) for each element on the canvas. In this example, we'll be creating a banner with some text and a logo. Start by creating a Document:

```js
// Create document
const banner = new Document({
    name: "Banner",
    width: 1500,
    height: 500
});
```

Now we can add a background image:

```js
// Add background
await banner.createLayer({
    name: "background",
    file: `${__dirname}/assets/background.png`
});
```

Firstly, you'll notice that the `async` keyword is used. This is because [`Document.createLayer`](https://illustra.apixel.me/docs/classes/Document#createLayer) returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This guide uses the `await` keyword, but you can handle Promises however you'd like.

You'll also notice that we used [`__dirname`](https://nodejs.org/docs/latest/api/modules.html#modules_dirname) to create an absolute file path. This is to ensure that Illustra can find the right file. If you were to use a relative path, ie. `./assets/background.png`, Illustra would end up searching relative to it's own code internally.

Now let's add some text:

```js
// Add title
banner.createTextLayer({
    name: "title",
    text: {
        text: "Illustra",
        color: "#574ae2"
    }
});
```

Finally, we can add the logo, similar to how we added the background image:

```js
// Add logo
const logo = await banner.createLayer({
    name: "logo",
    file: `${__dirname}/assets/logo.png`
});
```

Let's also [align](https://illustra.apixel.me/docs/classes/Layer#align) the logo to the center of the document:

```js
// Align logo
logo.align();
```

If you'd like to learn more about working with Documents and Layers, you can read the guide on [Documents and Layers](https://illustra.apixel.me/guide/documents-and-layers).

---

# Exporting

Now that we've created our banner, we need to export it. There are two ways to export a document: to a file and as a buffer. Let's cover exporting to a file first:

```js
// Export
await banner.exportTo("png", "file", `${__dirname}/images/banner.png`);
```

We're using the [`Document.exportTo`](https://illustra.apixel.me/docs/classes/Document#exportTo) method to export our banner. The first parameter is the file format, which is PNG in this case. You can see the supported file format in the [docs](https://illustra.apixel.me/docs/classes/Document#exportTo). The next parameter is the type. This is either `"file"` or `"buffer"`. Since we're exporting as a file, we need to specify the path as the third parameter. Note how we're using an absolute path again.

Now let's look at exporting as a buffer:

```js
// Export
const bannerData = await banner.exportTo("png", "buffer");
```

This is similar to exporting as a file, except the `exportType` parameter is `"buffer"` instead of `"file"`. We also don't need to specify the path, since the [Buffer](https://nodejs.org/api/buffer.html) will simply be returned. We can also optionally pass a third boolean parameter. When `true`, an [ExportMetadata](https://illustra.apixel.me/docs/interfaces/ExportMetadata) object will be returned instead of a Buffer.