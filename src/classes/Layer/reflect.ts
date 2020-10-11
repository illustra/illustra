import Layer from "./Layer";

export default function rotate(layer: Layer, direction: "vertical" | "horizontal"): Layer {

    // Debug
    layer._debug(`Reflecting ${direction === "vertical" ? "vertically" : "horizontally"}`);

    // Add to transformations
    layer._transformations.push({
        type: "reflection",
        direction
    });

    // Return
    return layer;
}