import { AnyLayer, Layer, ShapeLayer } from "../../internal";

export default function rotate(layer: AnyLayer, degrees: number): number {

    // Throw an error if the layer type doesn't keep track of the width and height
    if ((!(layer instanceof Layer)) && (!(layer instanceof ShapeLayer))) throw new Error("This layer can't be rotated");

    // Debug
    layer._debug(`Rotating by ${degrees} degrees`);

    // Get width and height
    let width: number = layer.width;
    let height: number = layer.height;

    // Get rotated angle in radians
    const rotatedAngle: number = degrees * (Math.PI / 180);

    // Set width and height
    // https://stackoverflow.com/a/3231438/8961491
    layer.width = Math.round(Math.abs(width * Math.cos(rotatedAngle)) + Math.abs(height * Math.sin(rotatedAngle)));
    layer.height = Math.round(Math.abs(width * Math.sin(rotatedAngle)) + Math.abs(height * Math.cos(rotatedAngle)));

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "rotate",
        degrees
    });

    // Return
    return layer._lastEditID;
}