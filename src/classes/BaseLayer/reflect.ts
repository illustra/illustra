import { AnyLayer } from "./BaseLayer";

export default function rotate<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, direction: "vertical" | "horizontal"): AnyLayerInput {

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