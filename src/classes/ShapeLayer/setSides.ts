import ShapeLayer from "./ShapeLayer";

export default function setSides(shapeLayer: ShapeLayer, sides?: number): ShapeLayer {

    // Debug
    shapeLayer._debug(sides ? `Setting sides to ${sides}` : "Resetting sides");

    // Invalid sides
    if ((sides !== undefined) && (sides < 0)) throw new Error("Sides can't be less than 0");

    // Set sides
    shapeLayer.sides = sides;

    // Return
    return shapeLayer;
}