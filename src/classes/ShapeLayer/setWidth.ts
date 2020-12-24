
import { ShapeLayer } from "../../internal";

export default function setWidth(shapeLayer: ShapeLayer, width: number): ShapeLayer {

    // Debug
    shapeLayer._debug(`Setting width to ${width}`);

    // Invalid width
    if (width < 0) throw new Error("Width can't be less than 0");

    // Set width
    shapeLayer.width = width;

    // Return
    return shapeLayer;
}