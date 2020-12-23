import { AnyLayer } from "./BaseLayer";

export default function hue<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, degrees: number): AnyLayerInput {

    // Debug
    layer._debug(`Rotating hue by ${degrees} degrees`);

    // No change
    if (degrees % 360 === 0) {
        layer._debug(`Layer rotation would cause no change, ignoring`);
        return layer;
    }

    // Add to edits
    layer._edits.push({
        type: "hue",
        degrees
    });

    // Return
    return layer;
}