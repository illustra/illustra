import ShapeLayer from "./ShapeLayer";

export default function setCornerRadius(shapeLayer: ShapeLayer, cornerRadius?: number): ShapeLayer {

    // Debug
    shapeLayer._debug(cornerRadius ? `Setting corner radius to ${cornerRadius}` : "Resetting corner radius");

    // Invalid corner radius
    if ((cornerRadius !== undefined) && (cornerRadius < 0)) throw new Error("Corner radius can't be less than 0");

    // Set corner radius
    shapeLayer.cornerRadius = cornerRadius;

    // Return
    return shapeLayer;
}