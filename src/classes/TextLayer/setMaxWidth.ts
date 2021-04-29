import { TextLayer } from "../../internal";

export default function setMaxWidth(textLayer: TextLayer, maxWidth?: number): TextLayer {

    // Debug
    textLayer._debug(maxWidth ? `Setting max width to ${maxWidth}` : "Resetting max width");

    // Invalid max width
    if ((maxWidth !== undefined) && (maxWidth < 0)) throw new Error("Max width can't be less than 0");

    // Set max width
    textLayer.maxWidth = maxWidth || textLayer.document?.width || 400;

    // Return
    return textLayer;
}