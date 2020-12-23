import { AnyLayer } from "./BaseLayer";

export default function resize<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, width?: number | null, height?: number | null): AnyLayerInput {

    // Get original width and height
    const originalWidth: number = layer.width;
    const originalHeight: number = layer.height;

    // Set width
    if (width) {

        // Set width
        layer.width = width;

        /**
         * Set height
         *
         * If the height is `undefined`, scale it automatically
         */
        if (height === undefined) {
            const heightScale: number = originalHeight / originalWidth;
            layer.height = Math.round(layer.width * heightScale);
        }
    }

    // Set height
    if (height) {

        // Set height
        layer.height = height;

        /**
         * Set width
         *
         * If the width is `undefined`, scale it automatically
         */
        if (width === undefined) {
            const widthScale: number = originalWidth / originalHeight;
            layer.width = Math.round(layer.height * widthScale);
        }
    }

    // Add to edits
    layer._edits.push({
        type: "resize",
        width: layer.width,
        height: layer.height
    });

    // Debug
    layer._debug(`Resizing to ${layer.width}px (width) by ${layer.height}px (height)`);

    // Return
    return layer;
}