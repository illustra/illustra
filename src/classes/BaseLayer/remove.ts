import { AnyLayer } from "./BaseLayer";

export default function remove<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput) {

    // Debug
    layer._debug("Removing");

    // No document
    if (!layer.document) throw new Error("This layer isn't a part of a document");

    // Remove layer
    layer.document.layers.splice(layer.position, 1);
    delete layer.document;
}