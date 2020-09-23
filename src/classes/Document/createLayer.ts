import Layer from "../Layer/Layer";
import Document from "./Document";

export default function createLayer(document: Document, name: string): Document {

    // Create layer
    new Layer(document, name);

    // Return
    return document;
}