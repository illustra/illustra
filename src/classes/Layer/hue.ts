import Layer from "./Layer";

export default function hue(layer: Layer, degrees: number): Layer {

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