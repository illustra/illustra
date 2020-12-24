
import { ShapeLayer } from "../../internal";

export default function setStrokeWidth(shapeLayer: ShapeLayer, strokeWidth?: number): ShapeLayer {

    // Debug
    shapeLayer._debug(strokeWidth ? `Setting stroke width to ${strokeWidth}` : "Resetting stroke width");

    // Invalid stroke width
    if ((strokeWidth !== undefined) && (strokeWidth < 0)) throw new Error("Stroke width can't be less than 0");

    // Set stroke width
    shapeLayer.strokeWidth = strokeWidth;

    // Return
    return shapeLayer;
}