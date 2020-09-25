import Layer from "./Layer";

export default function duplicate(layer: Layer, name?: string, position?: number): Layer {

    // Create layer
    const duplicatedLayer: Layer = layer.document.createLayer({
        name: name || layer.name,
        backgroundColor: layer.backgroundColor,
        position: position || layer.position
    });

    // Set compositions
    duplicatedLayer.compositions = [...layer.compositions];

    // Return
    return duplicatedLayer;
}