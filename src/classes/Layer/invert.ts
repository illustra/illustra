import Layer from "./Layer";

export default function invert(layer: Layer): Layer {

    // Debug
    layer._debug("Inverting");

    // Set invert
    layer._invert = true;

    // Return
    return layer;
}