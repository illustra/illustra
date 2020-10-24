import Layer from "./Layer";

export default function saturation(layer: Layer, amount: number): Layer {

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