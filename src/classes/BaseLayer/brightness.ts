import { AnyLayer } from "../../internal";

export default function brightness(layer: AnyLayer, amount: number): number {

    // Debug
    layer._debug(`Brightening image by ${amount}`);

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "brightness",
        amount
    });

    // Return
    return layer._lastEditID;
}