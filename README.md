# Illustra

> Illustra is currently in early development

[Illustra](https://illustra.apixel.me) is an object-oriented, document based Node.js image processing toolkit, complete with utility functions to make development a breeze. Illustra can be used for basic image operations like rotating and grayscaling, but Illustra's main purpose is for more complex images. A few examples could be generating avatars for users or banners for products.

---

# Installation

Illustra is distributed via [NPM](https://npmjs.com/package/illustra). You can install it with the NPM CLI tool or with Yarn. Illustra has TypeScript support built in.

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

Illustra uses the concept of [Documents](https://illustra.apixel.me/docs/classes/Document) for a canvas, and [Layers](https://illustra.apixel.me/docs/classes/BaseLayer) for each element on the canvas:

```js
// Create document
const banner = new Document({
    name: "Banner",
    width: 1500,
    height: 500
});

// Add background
await banner.createLayer({
    name: "background",
    file: `${__dirname}/assets/background.png`
});

// Add title
banner.createTextLayer({
    name: "title",
    text: {
        text: "Illustra",
        color: "#574ae2"
    }
});

// Export
await banner.exportTo("png", "file", `${__dirname}/images/banner.png`);
```

We recommend reading the [Getting Started guide](https://illustra.apixel.me/guide/getting-started) and the [Documents and Layers guide](https://illustra.apixel.me/guide/documents-and-layers) to learn more about how to use Illustra. You can view all of the available guides [here](https://illustra.apixel.me/guides).

---

# Issue Tracker

You can report bugs and suggest features by [opening an issue](https://github.com/APixelVisuals/illustra/issues/new). Please check to make sure that an issue for the bug or feature you're reporting doesn't already exist.

---

# Contributing

Contributing guidelines will be available once Illustra is out of early development.