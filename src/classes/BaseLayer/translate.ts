import { AnyLayer } from "../../internal";

export default function translate<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, left: number = 0, top: number = 0): AnyLayerInput {

    // Debug
    layer._debug(`Translating to ${left}px (left) and ${top}px (top)`);

    // Set left
    layer.left = left;

    // Set top
    layer.top = top;

    // Return
    return layer;
}