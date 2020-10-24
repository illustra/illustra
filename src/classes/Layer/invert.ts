import Layer from "./Layer";

export default function invert(layer: Layer): Layer {

    // Debug
    layer._debug("Inverting");

    // Add to edits
    layer._edits.push({
        type: "invert"
    });

    // Return
    return layer;
}