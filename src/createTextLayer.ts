import { TextLayer, TextLayerData } from "./internal";

export default function createTextLayer(textLayerData: TextLayerData): TextLayer {

    // Create layer
    const layer: TextLayer = new TextLayer(textLayerData);

    // Return created text layer
    return layer;
}