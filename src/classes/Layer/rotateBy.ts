import Layer from "./Layer";

export default function rotateBy(layer: Layer, degrees: number): Layer {

    // Rotate
    layer.rotate(layer.rotation + degrees);

    // Return
    return layer;
}