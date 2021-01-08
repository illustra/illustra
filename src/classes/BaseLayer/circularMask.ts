import { createClippingMask, createEllipse, AnyLayer, ClippingMask, Layer, ShapeLayer } from "../../internal";

export default function circularMask(layer: AnyLayer, name: string, keepSource?: boolean): ClippingMask {

    // Invalid layer type
    if ((!(layer instanceof Layer)) && (!(layer instanceof ShapeLayer))) throw new Error("A circular mask can't be created with this layer");

    // Debug
    layer._debug("Adding circular mask");

    // Create clipping mask
    const clippingMask = createClippingMask({
        name,

        // The mask is an ellipse with the same dimensions as the layer
        mask: createEllipse({
            name: "circleMask",
            shape: {
                width: layer.width,
                height: layer.height,
                fill: "#ffffff"
            },
            left: layer.left,
            top: layer.top
        }),
        source: layer
    });

    // Add the layer to the document
    if (layer.document) layer.document.addLayer(clippingMask, layer.position + 1);

    // Remove the original layer from the document unless we need to keep the source
    if ((!keepSource) && (layer.document)) layer.remove();

    // Return
    return clippingMask;
}