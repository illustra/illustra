import Layer from "./Layer";

export default function rotate(layer: Layer, degrees: number): Layer {

    // Rotate to
    layer.rotateTo(layer.rotation + degrees);

    // Return
    return layer;
}