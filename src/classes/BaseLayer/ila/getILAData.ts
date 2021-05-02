import { BaseLayer, ClippingMask, Ellipse, ILAAsset, ILAData, Layer, LAYER_TYPE_CLIPPING_MASK, LAYER_TYPE_ELLIPSE, LAYER_TYPE_LAYER, LAYER_TYPE_POLYGON, LAYER_TYPE_TEXT, Polygon, TextLayer } from "../../../internal";

export default function getILAData(baseLayer: BaseLayer, assets: ILAAsset[]): ILAData {

    // Text layer
    if (baseLayer instanceof TextLayer) return {
        name: baseLayer.name,
        type: LAYER_TYPE_TEXT,
        left: baseLayer.left,
        top: baseLayer.top,
        edits: baseLayer._edits,
        opacity: baseLayer.opacity,
        blendMode: baseLayer.blendMode,
        text: baseLayer.text,
        font: baseLayer.font,
        fontSize: baseLayer.fontSize,
        fontWeight: baseLayer.fontWeight,
        color: baseLayer.color,
        maxWidth: baseLayer.maxWidth
    };

    // Polygon layer
    else if (baseLayer instanceof Polygon) return {
        name: baseLayer.name,
        type: LAYER_TYPE_POLYGON,
        left: baseLayer.left,
        top: baseLayer.top,
        edits: baseLayer._edits,
        opacity: baseLayer.opacity,
        blendMode: baseLayer.blendMode,
        width: baseLayer.width,
        height: baseLayer.height,
        fill: baseLayer.fill,
        stroke: baseLayer.stroke,
        strokeWidth: baseLayer.strokeWidth,
        sides: baseLayer.sides
    };

    // Ellipse layer
    else if (baseLayer instanceof Ellipse) return {
        name: baseLayer.name,
        type: LAYER_TYPE_ELLIPSE,
        left: baseLayer.left,
        top: baseLayer.top,
        edits: baseLayer._edits,
        opacity: baseLayer.opacity,
        blendMode: baseLayer.blendMode,
        width: baseLayer.width,
        height: baseLayer.height,
        fill: baseLayer.fill,
        stroke: baseLayer.stroke,
        strokeWidth: baseLayer.strokeWidth
    };

    // Clipping mask layer
    else if (baseLayer instanceof ClippingMask) return {
        name: baseLayer.name,
        type: LAYER_TYPE_CLIPPING_MASK,
        left: baseLayer.left,
        top: baseLayer.top,
        edits: baseLayer._edits,
        opacity: baseLayer.opacity,
        blendMode: baseLayer.blendMode,
        mask: baseLayer.mask._getILAData(assets),
        source: baseLayer.source._getILAData(assets)
    };

    // Layer
    else {

        // Define layer
        const layer: Layer = baseLayer as Layer;

        // Add to assets
        if (layer._inputData) assets.push({
            image: layer._inputData,
            svg: layer._svg
        });

        // Return
        return {
            name: layer.name,
            type: LAYER_TYPE_LAYER,
            left: layer.left,
            top: layer.top,
            edits: layer._edits,
            opacity: layer.opacity,
            blendMode: layer.blendMode,
            inputImageID: layer._inputData ? assets.length : undefined
        };
    }
}