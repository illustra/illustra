import Layer from "./Layer";

export default function rotate(layer: Layer, direction: "vertical" | "horizontal"): Layer {

    // Debug
    layer._debug(`Reflecting ${direction === "vertical" ? "vertically" : "horizontally"}`);

    // Add to edits
    layer._edits.push({
        type: "reflect",
        direction
    });

    // Return
    return layer;
}