import { Document, TextLayer, TextLayerData } from "../../internal";

export default function createTextLayer(document: Document, textLayerData: TextLayerData): TextLayer {

    // Debug
    document._debug(`Creating text layer '${textLayerData.name}' at position ${textLayerData.position || document.layers.length}`);

    // Create layer
    const layer: TextLayer = new TextLayer(textLayerData, document);

    // Return created text layer
    return layer;
}