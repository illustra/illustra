import { AnyLayer } from "../../internal";

export default function move(layer: AnyLayer, position: number, relative?: boolean): number {

    // Get position
    if (relative) position = layer.position + position;

    // Debug
    layer._debug(`Moving to position ${position}`);

    // No document
    if (!layer.document) throw new Error("This layer isn't a part of a document");

    // Remove layer
    layer.document.layers.splice(layer.position, 1);

    // Add layer
    layer.document.layers.splice(position, 0, layer);

    // Return
    return position;
}