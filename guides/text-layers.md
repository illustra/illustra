# Text Layers

A [`TextLayer`](https://illustra.apixel.me/docs/classes/TextLayer) allows you to add text to your document. Illustra lets you customize the font, font size, font weight, text alignment, color, and more. Let's go over creating a text layer:

```js
// Create text layer
document.createTextLayer({
    name: "layerName",
    text: {
        text: "Illustra",
        font: "Roboto",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#574ae2"
    }
});
```

The `font` property can also take a path to a font file:

```js
// Create text layer
document.createTextLayer({
    name: "layerName",
    text: {
        ...
        font: `${__dirname}/fonts/roboto.ttf`
        ...
    }
});
```

The `text` property's object can also take the optional `lineHeight` and `maxWidth` properties. The `lineHeight` property tells Illustra how tall each line of text should be in pixels. The `maxWidth` property tells Illustra the maximum width the text can be.