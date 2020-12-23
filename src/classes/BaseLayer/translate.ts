import { AnyLayer } from "./BaseLayer";

export default function translate<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, top: number = 0, left: number = 0): AnyLayerInput {

    // Debug
    layer._debug(`Translating to ${top}px (top) and ${left}px (left)`);

    // Set top
    layer.top = top;

    // Set left
    layer.left = left;

    // Return
    return layer;
}