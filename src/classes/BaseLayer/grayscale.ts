import { AnyLayer } from "../../internal";

export default function grayscale<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput): AnyLayerInput {

    // Debug
    layer._debug("Grayscaling");

    // Adjust saturation
    layer.saturation(0);

    // Return
    return layer;
}