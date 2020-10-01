import Layer from "./Layer";

export default function translate(layer: Layer, top: number = 0, left: number = 0): Layer {

    // Set top
    layer.top = top;

    // Set left
    layer.left = left;

    // Return
    return layer;
}