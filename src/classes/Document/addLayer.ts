import { AnyLayer, Document } from "../../internal";

export default function addLayer(document: Document, layer: AnyLayer, position?: number) {

    // Debug
    layer._debug(`Adding layer to '${document.name}' at position ${position || document.layers.length}`);

    // Add layer
    document.layers.splice(position || document.layers.length, 0, layer);
    layer.document = document;
}