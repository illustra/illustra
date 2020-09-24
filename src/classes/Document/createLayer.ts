import Layer, { LayerData } from "../Layer/Layer";
import Document from "./Document";

export default function createLayer(document: Document, layerData: LayerData): Document {

    // Create layer
    new Layer(document, layerData);

    // Return
    return document;
}