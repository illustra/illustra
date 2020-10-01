import sharp from "sharp";
import Layer from "./Layer";

export default function translate(layer: Layer, x: number = 0, y: number = 0): Layer {

    // Set top
    layer.top = layer.top + y;

    // Set left
    layer.left = layer.left + x;

    // Return
    return layer;
}