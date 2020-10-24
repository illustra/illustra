import Layer from "../Layer/Layer";
import Document from "./Document";

export default function addLayer(document: Document, layer: Layer, position?: number) {

    // Debug
    layer._debug(`Adding to '${document.name}' at position ${position || document.layers.length}`);

    // Add layer
    document.layers.splice(position || document.layers.length, 0, layer);
}