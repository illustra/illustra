import Layer from "./Layer";

export default function rotate(layer: Layer, direction: "vertical" | "horizontal"): Layer {

    // Add to transformations
    layer._transformations.push({
        type: "reflection",
        direction
    });

    // Return
    return layer;
}