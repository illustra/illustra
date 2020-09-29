import sharp from "sharp";
import Layer from "./Layer";

export default function translateTo(layer: Layer, top: number = 0, left: number = 0): Layer {

    // Loop through compositions
    layer._compositions.forEach((c: sharp.OverlayOptions) => {

        // Set top
        c.top = top;

        // Set left
        c.left = left;
    });

    // Return
    return layer;
}