import { parseColor, Color } from "../../color";
import { ShapeLayer } from "../../internal";

export default function setStroke(shapeLayer: ShapeLayer, stroke?: Color): ShapeLayer {

    // Parse color
    if (stroke !== undefined) stroke = parseColor(stroke);

    // Debug
    shapeLayer._debug(stroke ? `Setting stroke to ${stroke}` : "Resetting stroke");

    // Set stroke
    shapeLayer.stroke = stroke;

    // Return
    return shapeLayer;
}