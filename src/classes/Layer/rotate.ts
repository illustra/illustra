import Layer from "./Layer";

export default function rotate(layer: Layer, degrees: number): Layer {

    // Set rotation
    layer.rotation = layer.rotation + degrees;

    // Return
    return layer;
}