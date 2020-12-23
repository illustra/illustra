import { AnyLayer } from "../BaseLayer/BaseLayer";
import Document from "./Document";

export default function addLayer<AnyLayerInput extends AnyLayer>(document: Document, layer: AnyLayerInput, position?: number) {

    // Debug
    layer._debug(`Adding layer to '${document.name}' at position ${position || document.layers.length}`);

    // Add layer
    document.layers.splice(position || document.layers.length, 0, layer);
    layer.document = document;
}