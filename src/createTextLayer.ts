import TextLayer, { TextLayerData } from "./classes/TextLayer/TextLayer";

export default function createTextLayer(textLayerData: TextLayerData): TextLayer {

    // Create layer
    const layer: TextLayer = new TextLayer(textLayerData);

    // Return created layer
    return layer;
}