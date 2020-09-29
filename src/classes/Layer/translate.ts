import sharp from "sharp";
import Layer from "./Layer";

export default function translate(layer: Layer, x: number = 0, y: number = 0): Layer {

    // Loop through compositions
    layer._compositions.forEach((c: sharp.OverlayOptions) => {

        // Set top
        c.top = (c.top || 0) + y;

        // Set left
        c.left = (c.left || 0) + x;
    });

    // Return
    return layer;
}