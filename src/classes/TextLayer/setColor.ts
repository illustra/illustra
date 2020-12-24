import { parseColor, Color } from "../../color";
import { TextLayer } from "../../internal";

export default function setColor(textLayer: TextLayer, color: Color = "#000000"): TextLayer {

    // Parse color
    color = parseColor(color);

    // Debug
    textLayer._debug(`Setting color to ${color}`);

    // Set color
    textLayer.color = color;

    // Return
    return textLayer;
}