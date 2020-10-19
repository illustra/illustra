import Layer from "./Layer";

export default async function duplicate(layer: Layer, name?: string, position?: number, debugMode?: boolean): Promise<Layer> {

    // Debug
    layer._debug(`Duplicating to '${name || layer.name}' at position ${position || layer.position + 1}`);

    // Create layer
    const duplicatedLayer: Layer = new Layer(layer.document, {
        name: name || layer.name,
        top: layer.top,
        left: layer.left,
        position: position || layer.position + 1,
        debugMode
    }, layer._inputData);
    await duplicatedLayer._initialize;

    // Set edits
    duplicatedLayer._edits = [...layer._edits];

    // Return
    return duplicatedLayer;
}