# Blend Modes

Blend modes allow you to mix the colors of layers together to create unique looks. Illustra supports plenty of blend modes, and since Illustra is modeled after Photoshop, all of our blend mode names match theirs. Here is a list of [`BlendMode`s](https://illustra.apixel.me/docs/typeAliases/BlendMode) that Illustra supports:

- Normal (default)
- Darken
- Multiply
- Color Burn
- Lighten
- Screen
- Color Dodge
- Linear Dodge
- Overlay
- Soft Light
- Hard Light
- Difference
- Exclusion

To learn how colors are blended together for each blend mode, we recommend checking out [Adobe's help article](https://helpx.adobe.com/photoshop/using/blending-modes.html).

Setting the blend mode of a layer is done with the [`BaseLayer.setBlendMode()`](https://illustra.apixel.me/docs/classes/BaseLayer#setBlendMode) method:

```js
// Set blend mode
layer.setBlendMode("multiply");
```