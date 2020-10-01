import Layer from "./Layer";

export default function rotateTo(layer: Layer, degrees: number): Layer {

    // Set rotation
    layer.rotation = degrees;

    // Return
    return layer;
}