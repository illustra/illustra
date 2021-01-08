import { AnyLayer, Layer } from "../../internal";

export default async function rasterize(layer: AnyLayer): Promise<Layer> {

    // Debug
    layer._debug("Rasterizing");

    // Export layer
    const layerData = await layer.exportTo("png", "buffer");

    // Create layer
    const newLayer: Layer = new Layer({
        name: layer.name,
        left: layer.left,
        top: layer.top,
        position: layer.position,
        debugMode: layer.debugMode
    }, layer.document, layerData);
    await newLayer._initialize;

    // Remove the layer from the document
    if (layer.document) layer.remove();

    // Return
    return newLayer;
}