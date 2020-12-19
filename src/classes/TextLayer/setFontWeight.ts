import TextLayer from "./TextLayer";

export default function setFontWeight(textLayer: TextLayer, fontWeight?: string): TextLayer {

    // Debug
    textLayer._debug(fontWeight ? `Setting font weight to '${fontWeight}'` : "Resetting font weight");

    // Set font weight
    textLayer.fontWeight = fontWeight;

    // Return
    return textLayer;
}