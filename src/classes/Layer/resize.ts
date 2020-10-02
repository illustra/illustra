import Layer from "./Layer";

export default function resize(layer: Layer, width?: number | null, height?: number | null): Layer {

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

    // Add to transformations
    layer._transformations.push({
        type: "resize",
        width: layer.width,
        height: layer.height
    });

    // Return
    return layer;
}