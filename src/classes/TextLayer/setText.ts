import TextLayer from "./TextLayer";

export default function setText(textLayer: TextLayer, text: string): TextLayer {

    // Debug
    textLayer._debug(`Setting text to '${text}'`);

    // Set text
    textLayer.text = text;

    // Return
    return textLayer;
}