import Layer from "./Layer";

export default function rotate(layer: Layer, degrees: number): Layer {

    // Debug
    layer._debug(`Rotating by ${degrees} degrees`);

    // Add to transformations
    layer._transformations.push({
        type: "rotate",
        degrees
    });

    // Return
    return layer;
}