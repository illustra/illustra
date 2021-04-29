# Text Layers

A [`TextLayer`](https://illustra.apixel.me/docs/classes/TextLayer) allows you to add text to your document. Illustra lets you customize the font, font size, font weight, color, and more. Let's go over creating a text layer:

```js
// Create text layer
document.createTextLayer({
    name: "layerName",
    text: {
        text: "Illustra",
        font: "Roboto",
        fontSize: 24,
        fontWeight: "bold",
        color: "#574ae2"
    }
});
```

The `text` property's object can also take the optional `maxWidth` property that tells Illustra the maximum width the text can be.