
import { TextAlign, TextLayer } from "../../internal";

export default function setTextAlign(textLayer: TextLayer, textAlign: TextAlign = "left"): TextLayer {

    // Debug
    textLayer._debug(`Setting text align to ${textAlign}`);

    // Invalid text align
    if (!["left", "center", "right", "justify"].includes(textAlign)) throw new Error("Invalid text align");

    // Set text align
    textLayer.textAlign = textAlign;

    // Return
    return textLayer;
}