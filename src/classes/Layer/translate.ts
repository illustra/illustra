import sharp from "sharp";
import Layer from "./Layer";

export default function translate(layer: Layer, x: number = 0, y: number = 0): Layer {

    // Translate to
    layer.translateTo(layer.top + y, layer.left + x);

    // Return
    return layer;
}