import ShapeLayer, { ShapeData } from "./ShapeLayer";

export default function toShapeData(shapeLayer: ShapeLayer): ShapeData {

    // Polygon
    if (shapeLayer.type === "polygon") return {
        type: "polygon",
        width: shapeLayer.width,
        height: shapeLayer.height,
        sides: shapeLayer.sides || 0,
        cornerRadius: shapeLayer.cornerRadius,
        fill: shapeLayer.fill,
        stroke: shapeLayer.stroke,
        strokeWidth: shapeLayer.strokeWidth,
    };

    // Ellipse
    else return {
        type: "ellipse",
        width: shapeLayer.width,
        height: shapeLayer.height,
        fill: shapeLayer.fill,
        stroke: shapeLayer.stroke,
        strokeWidth: shapeLayer.strokeWidth,
    };
}