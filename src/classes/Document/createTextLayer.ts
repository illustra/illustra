import TextLayer, { TextLayerData } from "../TextLayer/TextLayer";
import Document from "./Document";

export default function createTextLayer(document: Document, textLayerData: TextLayerData): TextLayer {

    // Debug
    document._debug(`Creating text layer '${textLayerData.name}' at position ${textLayerData.position || document.layers.length}`);

    // Create layer
    const layer: TextLayer = new TextLayer(document, textLayerData);

    // Return created layer
    return layer;
}