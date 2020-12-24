
import { TextLayer } from "../../internal";

export default function setFont(textLayer: TextLayer, font?: string): TextLayer {

    // Debug
    textLayer._debug(font ? `Setting font to '${font}'` : "Resetting font");

    // Set font
    textLayer.font = font;

    // Return
    return textLayer;
}