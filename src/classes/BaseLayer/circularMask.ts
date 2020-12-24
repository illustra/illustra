import { createClippingMask, createEllipse, AnyLayer, ClippingMask } from "../../internal";

export default function circularMask(layer: AnyLayer, name: string, keepSource?: boolean): ClippingMask {

    // Debug
    layer._debug("Adding circular mask");

    // Create clipping mask
    const clippingMask = createClippingMask({
        name,
        mask: createEllipse({
            name: "circleMask",
            shape: {
                width: layer.width,
                height: layer.height,
                fill: "#ffffff"
            },
            top: layer.top,
            left: layer.left
        }),
        source: layer
    });

    // Add layer
    if (layer.document) layer.document.addLayer(clippingMask, layer.position + 1);

    // Remove layer
    if ((!keepSource) && (layer.document)) layer.remove();

    // Return
    return clippingMask;
}