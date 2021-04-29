import { AnyLayer, ClippingMask, Ellipse, Layer, Polygon, TextLayer } from "../../internal";

export default async function duplicate<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, name?: string, position?: number, debugMode?: boolean): Promise<AnyLayerInput> {

    // Debug
    layer._debug(`Duplicating to '${name || layer.name}' at position ${position || layer.position + 1}`);

    // Define layer
    let duplicatedLayer: AnyLayerInput;

    // Text layer
    if (layer instanceof TextLayer) duplicatedLayer = new TextLayer({
        name: name || layer.name,
        text: {
            text: layer.text,
            font: layer.font,
            fontSize: layer.fontSize,
            fontWeight: layer.fontWeight,
            color: layer.color,
            maxWidth: layer.maxWidth
        },
        left: layer.left,
        top: layer.top,
        position: position || layer.position + 1,
        debugMode
    }, layer.document) as AnyLayerInput;

    // Polygon
    else if (layer instanceof Polygon) duplicatedLayer = new Polygon({
        name: name || layer.name,
        shape: {
            width: layer.width,
            height: layer.height,
            sides: layer.sides,
            fill: layer.fill,
            stroke: layer.stroke,
            strokeWidth: layer.strokeWidth
        },
        left: layer.left,
        top: layer.top,
        position: position || layer.position + 1,
        debugMode
    }, layer.document) as AnyLayerInput;

    // Ellipse
    else if (layer instanceof Ellipse) duplicatedLayer = new Ellipse({
        name: name || layer.name,
        shape: {
            width: layer.width,
            height: layer.height,
            fill: layer.fill,
            stroke: layer.stroke,
            strokeWidth: layer.strokeWidth
        },
        left: layer.left,
        top: layer.top,
        position: position || layer.position + 1,
        debugMode
    }, layer.document) as AnyLayerInput;

    // Clipping mask
    else if (layer instanceof ClippingMask) duplicatedLayer = new ClippingMask({
        name: name || layer.name,
        mask: layer.mask,
        source: layer.source,
        position: position || layer.position + 1,
        debugMode
    }, layer.document) as AnyLayerInput;

    // Layer
    else {
        duplicatedLayer = new Layer({
            name: name || layer.name,
            left: layer.left,
            top: layer.top,
            position: position || layer.position + 1,
            debugMode
        }, layer.document, (layer as Layer)._inputData) as AnyLayerInput;
        await (duplicatedLayer as Layer)._initialize;
    }

    // Set edits
    duplicatedLayer._edits = [...layer._edits];

    // Set data
    duplicatedLayer.opacity = layer.opacity;
    duplicatedLayer.blendMode = layer.blendMode;

    // Return
    return duplicatedLayer;
}