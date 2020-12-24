import { AnyLayer } from "../../internal";

export default function brightness<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, amount: number): AnyLayerInput {

    // Debug
    layer._debug(`Brightening image by ${amount}`);

    // No change
    if (amount === 100) {
        layer._debug(`Layer brightness adjustment would cause no change, ignoring`);
        return layer;
    }

    // Add to edits
    layer._edits.push({
        type: "brightness",
        amount
    });

    // Return
    return layer;
}