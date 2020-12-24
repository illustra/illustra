import { AnyLayer } from "../../internal";

export default function invert<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput): AnyLayerInput {

    // Debug
    layer._debug("Inverting");

    // Add to edits
    layer._edits.push({
        type: "invert"
    });

    // Return
    return layer;
}