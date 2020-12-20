import { parseColor, Color } from "../../color";
import ShapeLayer from "./ShapeLayer";

export default function setFill(shapeLayer: ShapeLayer, fill?: Color): ShapeLayer {

    // Parse color
    if (fill !== undefined) fill = parseColor(fill);

    // Debug
    shapeLayer._debug(fill ? `Setting fill to ${fill}` : "Resetting fill");

    // Set fill
    shapeLayer.fill = fill;

    // Return
    return shapeLayer;
}