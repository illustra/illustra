import { AnyLayer } from "./BaseLayer";

export default function saturation<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, amount: number): AnyLayerInput {

    // Debug
    layer._debug(`Saturating image by ${amount}`);

    // No change
    if (amount === 100) {
        layer._debug(`Layer saturation adjustment would cause no change, ignoring`);
        return layer;
    }

    // Add to edits
    layer._edits.push({
        type: "saturation",
        amount
    });

    // Return
    return layer;
}