Clipping Masks (https://illustra.apixel.me/assets/guides/scissors.svg)

# Clipping Masks

Illustra's [`ClippingMask`s](https://illustra.apixel.me/docs/classes/ClippingMask) are a way to map the brightness of one layer to the transparency of another layer. A clipping mask layer is composed of two other layers: the mask and the source layer. The mask layer should contain the data for the brightnesses to be used, and the source layer is the layer that will have its transparency changed.

For example, to turn an image into a circle, you could have the image as the source layer, and the following mask layer:

![A black sqaure with a white circle in it](https://illustra.apixel.me/assets/guides/clipping-mask-example.png)

The darker the pixel, the more transparency there will be. If the pixel is fully black, the source layer will have a fully transparent pixel in its place. If it's fully white, the source layer will have a fully opaque pixel in its place. In this example, only a circular area will be opaque, while everything else will be transparent.

This clipping mask can be created like so:

```js
// Create mask layer
const maskLayer = await createLayer({
    name: "layerName",
    file: `${__dirname}/assets/mask.png`
});

// Create source layer
const sourceLayer = await createLayer({
    name: "layerName",
    file: `${__dirname}/assets/image.png`
});

// Create clipping mask
const clippingMask = document.createClippingMask({
    name: "layerName",
    mask: maskLayer,
    source: sourceLayer
});
```

This can be used in conjuncture with [shape layers](https://illustra.apixel.me/guide/shape-layers) to create a clipping mask with any shape.