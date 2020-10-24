import Layer from "./Layer";

export default function rotate(layer: Layer, degrees: number): Layer {

    // Debug
    layer._debug(`Rotating by ${degrees} degrees`);

    // Add to edits
    layer._edits.push({
        type: "rotate",
        degrees
    });

    // Return
    return layer;
}