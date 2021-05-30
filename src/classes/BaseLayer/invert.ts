import { AnyLayer } from "../../internal";

export default function invert(layer: AnyLayer): number {

    // Debug
    layer._debug("Inverting");

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "invert"
    });

    // Return
    return layer._lastEditID;
}