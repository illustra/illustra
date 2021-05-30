import { AnyLayer, Layer, ShapeLayer } from "../../internal";

export default function resizeBy(layer: AnyLayer, width?: number | null, height?: number | null, scale?: boolean): number {

    // Throw an error if the layer type doesn't keep track of the width and height
    if ((!(layer instanceof Layer)) && (!(layer instanceof ShapeLayer))) throw new Error("This layer can't be resized");

    // Debug
    const units: string = scale ? "%" : "px";
    layer._debug(`Resizing by ${width}${units} (width) by ${height}${units} (height)`);

    // Resize
    const editID: number = layer.resize(
        width && (scale ?
            layer.width * (width / 100) :
            layer.width + width),
        height && (scale ?
            layer.height * (height / 100) :
            layer.height + height)
    );

    // Return
    return editID;
}