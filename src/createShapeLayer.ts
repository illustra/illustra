import ShapeLayer, { ShapeLayerData } from "./classes/ShapeLayer/ShapeLayer";

export default function createShapeLayer(shapeLayerData: ShapeLayerData): ShapeLayer {

    // Create layer
    const layer: ShapeLayer = new ShapeLayer(shapeLayerData);

    // Return created layer
    return layer;
}