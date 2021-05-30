import { AnyLayer } from "../../internal";

export default function hue(layer: AnyLayer, degrees: number): number {

    // Debug
    layer._debug(`Rotating hue by ${degrees} degrees`);

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "hue",
        degrees
    });

    // Return
    return layer._lastEditID;
}