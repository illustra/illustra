import { AnyLayer } from "./BaseLayer";

export default function rotate<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, degrees: number): AnyLayerInput {

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