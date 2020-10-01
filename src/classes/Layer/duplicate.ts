import Layer from "./Layer";

export default function duplicate(layer: Layer, name?: string, position?: number): Layer {

    // Create layer
    const duplicatedLayer: Layer = layer.document.createLayer({
        name: name || layer.name,
        data: layer._data,
        top: layer.top,
        left: layer.left,
        position: position || layer.position
    });

    // Set rotation
    duplicatedLayer.rotateTo(layer.rotation);

    // Return
    return duplicatedLayer;
}