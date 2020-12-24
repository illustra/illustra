
import { TextLayer } from "../../internal";

export default function setLineHeight(textLayer: TextLayer, lineHeight?: number): TextLayer {

    // Debug
    textLayer._debug(lineHeight ? `Setting line height to ${lineHeight}` : "Resetting line height");

    // Invalid line height
    if ((lineHeight !== undefined) && (lineHeight < 0)) throw new Error("Line height can't be less than 0");

    // Set line height
    textLayer.lineHeight = lineHeight;

    // Return
    return textLayer;
}