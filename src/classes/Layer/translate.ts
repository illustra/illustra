import Layer from "./Layer";

export default function translate(layer: Layer, top: number = 0, left: number = 0): Layer {

    // Debug
    layer._debug(`Translating to ${top}px (top) and ${left}px (left)`);

    // Set top
    layer.top = top;

    // Set left
    layer.left = left;

    // Return
    return layer;
}