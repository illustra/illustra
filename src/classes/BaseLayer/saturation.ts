import { AnyLayer } from "../../internal";

export default function saturation(layer: AnyLayer, amount: number): number {

    // Debug
    layer._debug(`Saturating image by ${amount}`);

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "saturation",
        amount
    });

    // Return
    return layer._lastEditID;
}