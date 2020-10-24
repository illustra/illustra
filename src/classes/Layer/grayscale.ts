import Layer from "./Layer";

export default function grayscale(layer: Layer): Layer {

    // Debug
    layer._debug("Grayscaling");

    // Adjust saturation
    layer.saturation(0);

    // Return
    return layer;
}