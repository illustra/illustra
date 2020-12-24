
import { ShapeLayer } from "../../internal";

export default function setHeight(shapeLayer: ShapeLayer, height: number): ShapeLayer {

    // Debug
    shapeLayer._debug(`Setting height to ${height}`);

    // Invalid height
    if (height < 0) throw new Error("Height can't be less than 0");

    // Set height
    shapeLayer.height = height;

    // Return
    return shapeLayer;
}