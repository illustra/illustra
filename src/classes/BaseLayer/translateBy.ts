import { AnyLayer } from "../../internal";

export default function translateBy<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, x: number = 0, y: number = 0): AnyLayerInput {

    // Debug
    layer._debug(`Translating by ${x}px (x) and ${y}px (y)`);

    // Translate
    layer.translate(layer.top + y, layer.left + x);

    // Return
    return layer;
}