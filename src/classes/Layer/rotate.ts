import Layer from "./Layer";

export default function rotate(layer: Layer, degrees: number): Layer {

    // Add to transformations
    layer._transformations.push({
        type: "rotation",
        degrees
    });

    // Return
    return layer;
}