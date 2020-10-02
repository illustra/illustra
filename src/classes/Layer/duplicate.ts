import Layer from "./Layer";

export default async function duplicate(layer: Layer, name?: string, position?: number): Promise<Layer> {

    // Create layer
    const duplicatedLayer: Layer = await layer.document.createLayer({
        name: name || layer.name,
        data: layer._data,
        top: layer.top,
        left: layer.left,
        position: position || layer.position
    });

    // Set transformations
    duplicatedLayer._transformations = [...layer._transformations];

    // Return
    return duplicatedLayer;
}