import Layer, { LayerData } from "../Layer/Layer";
import Document from "./Document";

export default function createLayer(document: Document, layerData: LayerData): Layer {

    // Return created layer
    return new Layer(document, layerData);
}