import { createEllipse, createLayer, BaseLayer, BaseLayerData, Document } from "../../src/internal";

export default async function addLayer(document: Document, layerType: string): Promise<BaseLayer> {

    // Define layer data
    const layerData: BaseLayerData = {
        name: layerType,
        file: "test/assets/apixel.png",
        top: 200,
        left: 250
    };

    // Text layer
    if (layerType === "textLayer") return document.createTextLayer({
        name: layerType,
        text: {
            text: "example",
            color: "#ff0000"
        },
        top: 200,
        left: 250
    });

    // Polygon
    else if (layerType === "polygon") return document.createPolygon({
        name: layerType,
        shape: {
            width: 300,
            height: 500,
            sides: 5,
            fill: "#ff0000"
        },
        top: 200,
        left: 250
    });

    // Ellipse
    else if (layerType === "ellipse") return document.createEllipse({
        name: layerType,
        shape: {
            width: 300,
            height: 500,
            fill: "#ff0000"
        },
        top: 200,
        left: 250
    });

    // Clipping mask
    else if (layerType === "clippingMask") return document.createClippingMask({
        name: layerType,
        mask: createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            },
            top: 200,
            left: 250
        }),
        source: await createLayer(layerData)
    });

    // Layer
    else return await document.createLayer(layerData);
}