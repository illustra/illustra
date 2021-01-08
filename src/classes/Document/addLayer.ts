import { AnyLayer, Document } from "../../internal";

export default function addLayer(document: Document, layer: AnyLayer, position?: number) {

    // Debug
    layer._debug(`Adding layer to '${document.name}' at position ${position || document.layers.length}`);

    /**
     * Add layer
     *
     * Splice the array of layers at the right position to add the layer
     * The position is either the inputted position or the top of the list of layers
     *
     * Then set the `document` property of the layer
     */
    document.layers.splice(position || document.layers.length, 0, layer);
    layer.document = document;
}