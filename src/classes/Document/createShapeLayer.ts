import ShapeLayer, { ShapeLayerData } from "../ShapeLayer/ShapeLayer";
import Document from "./Document";

export default function createShapeLayer(document: Document, shapeLayerData: ShapeLayerData): ShapeLayer {

    // Debug
    document._debug(`Creating shape layer '${shapeLayerData.name}' at position ${shapeLayerData.position || document.layers.length}`);

    // Create layer
    const layer: ShapeLayer = new ShapeLayer(document, shapeLayerData);

    // Return created layer
    return layer;
}