import Layer from "./Layer";

export default async function duplicate(layer: Layer, name?: string, position?: number, debugMode?: boolean): Promise<Layer> {

    // Debug
    layer._debug(`Duplicating to '${name || layer.name}' at position ${position || layer.position + 1}`, true);

    // Create layer
    const duplicatedLayer: Layer = await layer.document.createLayer({
        name: name || layer.name,
        data: layer._data,
        top: layer.top,
        left: layer.left,
        position: position || layer.position + 1,
        debugMode
    });

    // Set transformations
    duplicatedLayer._transformations = [...layer._transformations];

    // End Debug Group
    layer._endDebugGroup();

    // Return
    return duplicatedLayer;
}