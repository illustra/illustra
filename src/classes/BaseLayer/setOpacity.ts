import { AnyLayer } from "./BaseLayer";

export default function setOpacity<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, opacity: number): AnyLayerInput {

    // Debug
    layer._debug(`Setting opacity to ${opacity}%`);

    // Invalid opacity
    if ((opacity < 0) || (opacity > 100)) throw new Error("Opacity must be between 0 and 100");

    // Set opacity
    layer.opacity = opacity;

    // Return
    return layer;
}