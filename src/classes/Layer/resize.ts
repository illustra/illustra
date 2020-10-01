import Layer from "./Layer";

export default function resize(layer: Layer, width?: number | null, height?: number | null, scale?: boolean): Layer {

    // Resize to
    layer.resizeTo(
        width && (scale ?
            layer.width * (width / 100) :
            layer.width + width),
        height && (scale ?
            layer.height * (height / 100) :
            layer.height + height)
    );

    // Return
    return layer;
}