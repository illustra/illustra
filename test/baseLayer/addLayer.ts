import { createClippingMask, createEllipse, createLayer, createPolygon, createTextLayer, BaseLayer, BaseLayerData, Document } from "../../src/internal";

export default async function addLayer(layerType: string, document?: Document): Promise<BaseLayer> {

    // Define layer
    let layer: BaseLayer;

    // Define layer data
    const layerData: BaseLayerData = {
        name: layerType,
        file: "test/assets/apixel.png",
        left: 250,
        top: 200
    };

    // Text layer
    if (layerType === "textLayer") layer = createTextLayer({
        name: layerType,
        text: {
            text: "example",
            font: "Arial",
            color: "#ff0000"
        },
        left: 250,
        top: 200
    });

    // Polygon
    else if (layerType === "polygon") layer = createPolygon({
        name: layerType,
        shape: {
            width: 300,
            height: 500,
            sides: 5,
            fill: "#ff0000"
        },
        left: 250,
        top: 200
    });

    // Ellipse
    else if (layerType === "ellipse") layer = createEllipse({
        name: layerType,
        shape: {
            width: 300,
            height: 500,
            fill: "#ff0000"
        },
        left: 250,
        top: 200
    });

    // Clipping mask
    else if (layerType === "clippingMask") layer = createClippingMask({
        name: layerType,
        mask: createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            },
            left: 250,
            top: 200
        }),
        source: await createLayer(layerData)
    });

    // Layer
    else layer = await createLayer(layerData);

    // Add layer to document
    if (document) document.addLayer(layer);

    // Return
    return layer;
}