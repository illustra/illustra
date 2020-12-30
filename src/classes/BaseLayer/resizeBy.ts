import { AnyLayer, Layer, ShapeLayer } from "../../internal";

export default function resizeBy<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, width?: number | null, height?: number | null, scale?: boolean): AnyLayerInput {

    // Invalid layer type
    if ((!(layer instanceof Layer)) && (!(layer instanceof ShapeLayer))) throw new Error("This layer can't be resized");

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