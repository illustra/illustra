import Layer from "./Layer";

export default function blur(layer: Layer, sigma: number): Layer {

    // Debug
    layer._debug(`Blurring with a sigma of ${sigma}`);

    // Add to edits
    layer._edits.push({
        type: "blur",
        sigma
    });

    // Return
    return layer;
}