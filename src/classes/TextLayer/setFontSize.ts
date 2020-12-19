import TextLayer, { DEFAULT_FONT_SIZE } from "./TextLayer";

export default function setFontSize(textLayer: TextLayer, fontSize: number = DEFAULT_FONT_SIZE): TextLayer {

    // Debug
    textLayer._debug(`Setting font size to ${fontSize}`);

    // Invalid font size
    if (fontSize < 0) throw new Error("Font size can't be less than 0");

    // Set font size
    textLayer.fontSize = fontSize;

    // Return
    return textLayer;
}