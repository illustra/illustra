import Layer from "./Layer";

export default function blur(layer: Layer, sigma: number): Layer {

    // Debug
    layer._debug(`Blurring with a sigma of ${sigma}`);

    // Set blur sigma
    layer._blurSigma = sigma;

    // Return
    return layer;
}