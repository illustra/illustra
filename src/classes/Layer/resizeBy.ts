import Layer from "./Layer";

export default function resizeBy(layer: Layer, width?: number | null, height?: number | null, scale?: boolean): Layer {

    // Debug
    const units: string = scale ? "%" : "px";
    layer._debug(`Resizing by ${width}${units} (width) by ${height}${units} (height)`);

    // Resize
    layer.resize(
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