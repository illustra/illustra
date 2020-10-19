import Layer from "./Layer";

export default function setOpacity(layer: Layer, opacity: number): Layer {

    // Debug
    layer._debug(`Setting opacity to ${opacity}%`);

    // Invalid opacity
    if ((opacity < 0) || (opacity > 100)) throw new Error("Opacity must be between 0 and 100");

    // Set opacity
    layer.opacity = opacity;

    // Return
    return layer;
}