import Layer from "./Layer";

export default function brightness(layer: Layer, amount: number): Layer {

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