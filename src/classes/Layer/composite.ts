import Layer from "./Layer";

export default function composite(layer: Layer, data: string | Buffer, top: number = 0, left: number = 0): Layer {

    // Add to compositions
    layer._compositions.push({
        input: data,
        top,
        left
    });

    // Return
    return layer;
}