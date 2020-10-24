import Layer from "./Layer";

export default function translateBy(layer: Layer, x: number = 0, y: number = 0): Layer {

    // Debug
    layer._debug(`Translating by ${x}px (x) and ${y}px (y)`);

    // Translate
    layer.translate(layer.top + y, layer.left + x);

    // Return
    return layer;
}