import { AnyLayer } from "../../internal";

export default function move(layer: AnyLayer, position: number, relative?: boolean): number {

    // If the move is relative to the current position, parse the position
    if (relative) position = layer.position + position;

    // Debug
    layer._debug(`Moving to position ${position}`);

    // To move a layer through the stack of layers, there needs to be a document
    if (!layer.document) throw new Error("This layer isn't a part of a document");

    // Remove the layer from the document
    layer.document.layers.splice(layer.position, 1);

    // Add the layer to the document with the new position
    layer.document.layers.splice(position, 0, layer);

    // Return
    return position;
}