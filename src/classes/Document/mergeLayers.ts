import sharp from "sharp";
import { AnyLayer, BlendMode, Document, Layer } from "../../internal";
import { ExportMetadata } from "../BaseLayer/exportTo";

export default async function mergeLayers(document: Document, name: string, inputLayers?: Array<AnyLayer | string | number>, copy?: boolean): Promise<Layer> {

    // Define an empty array for the layers that need to be merged
    let layers: AnyLayer[];

    // Get layers
    if (inputLayers) {

        // If there are input layers, we already have a list of layers that need to be merged

        /**
         * Since `inputLayers` can be either a layer, string, or number, we need to get the layer objects from the names and indexes
         * If the input layer is a string or number, get the layer object from the document
         * Otherwise, keep the layer object
         */
        const layerObjects: Array<AnyLayer | undefined> = inputLayers.map((l: AnyLayer | string | number): AnyLayer | undefined => ((typeof l === "string") || (typeof l === "number")) ? document.getLayer(l) : l);

        /**
         * Find any layers that aren't a part of this document
         * If any are found, throw an error
         */
        const invalidLayerIndex: number = layerObjects.findIndex((l: AnyLayer | undefined) => l && l.document !== document);
        if (invalidLayerIndex !== -1) throw new Error(`Layer at index ${invalidLayerIndex} isn't part of this document`);

        /**
         * Find any layers that couldn't be found by name or index
         * If any are found, throw an error
         */
        const unknownLayerIndex: number = layerObjects.findIndex((l: AnyLayer | undefined) => !l);
        if (unknownLayerIndex !== -1) {

            // Get input layer
            const inputLayer: string | number = inputLayers[unknownLayerIndex] as string | number;

            // Throw error
            throw new Error(`Unknown layer with ${typeof inputLayer === "string" ? `name '${inputLayer}'` : `index ${inputLayer}`}`);
        }

        // Set layers
        layers = layerObjects as AnyLayer[];
    }
    else {

        // Otherwise, we need to merge all the layers in the document
        layers = [...document.layers];
    }

    /**
     * We need to get the position of the highest layer and then add one to it
     * This will be used to add the merged layer to the document
     * We add one since we want the merged layer above the highest layer
     */
    const position: number = Math.max(...layers.map((l: AnyLayer) => l.position)) + 1;

    // Debug
    document._debug(`Merging ${layers.length} layers (${layers.map((l: AnyLayer) => l.name).join(", ")})${copy ? " via copy" : ""} into '${name}' at position ${position}`);

    // Export all the layers
    const exportedLayersPromises: Array<Promise<ExportMetadata>> = layers.map((l: AnyLayer) => l.exportTo("png", "buffer", true));
    let exportedLayers: ExportMetadata[] = await Promise.all(exportedLayersPromises);

    // Create a sharp canvas with the document's dimensions
    const canvas: sharp.Sharp = sharp({
        create: {
            width: document.width,
            height: document.height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    });

    /**
     * Crop
     *
     * If the image is larger than the canvas, sharp will error
     * Crop the images to fit on the canvas
     */
    const croppedLayersPromises: Array<Buffer | Promise<Buffer> | undefined> = exportedLayers.map((l: ExportMetadata, index: number) => {

        // Crop not needed
        if (

            // The top/left is positive (not off the canvas to the top left)
            layers[index].left >= 0 &&
            layers[index].top >= 0 &&

            // And the layer dimensions plus offset is less than the document's dimensions (not off the canvas to the bottom right)
            layers[index].left + l.width <= document.width &&
            layers[index].top + l.height <= document.height
        ) return l.data;

        // Get crop the amount of pixels we need to crop for the top left
        const cropLeft: number = layers[index].left < 0 ? (layers[index].left / -1) : 0;
        const cropTop: number = layers[index].top < 0 ? (layers[index].top / -1) : 0;

        // Get crop the amount of pixels we need to keep to crop the bottom right
        const cropWidth: number = document.width - layers[index].left;
        const cropHeight: number = document.height - layers[index].top;

        // If the layer is off completely the canvas, we don't need to render it
        if (((cropWidth < l.width ? cropWidth : l.width) - cropLeft <= 0) || ((cropHeight < l.height ? cropHeight : l.height) - cropTop <= 0)) return;

        // Crop
        return sharp(l.data)
            .extract({
                left: cropLeft,
                top: cropTop,
                width: (cropWidth < l.width ? cropWidth : l.width) - cropLeft,
                height: (cropHeight < l.height ? cropHeight : l.height) - cropTop
            })
            .toFormat("png")
            .toBuffer();
    });
    const croppedLayersPromisesFiltered: Array<Buffer | Promise<Buffer>> = croppedLayersPromises.filter((l: Buffer | Promise<Buffer> | undefined) => l) as Array<Buffer | Promise<Buffer>>;
    const croppedLayers: Buffer[] = await Promise.all(croppedLayersPromisesFiltered);

    // Composite
    canvas.composite(croppedLayers.map((l: Buffer, index: number) => {

        // Get blend mode
        const blendMode: BlendMode = layers[index].blendMode;
        let thisBlendMode: string = "";
        if (blendMode === "normal") thisBlendMode = "over";
        else if (blendMode === "darken") thisBlendMode = "darken";
        else if (blendMode === "multiply") thisBlendMode = "multiply";
        else if (blendMode === "colorBurn") thisBlendMode = "color-burn";
        else if (blendMode === "lighten") thisBlendMode = "lighten";
        else if (blendMode === "screen") thisBlendMode = "screen";
        else if (blendMode === "colorDodge") thisBlendMode = "color-dodge";
        else if (blendMode === "linearDodge") thisBlendMode = "add";
        else if (blendMode === "overlay") thisBlendMode = "overlay";
        else if (blendMode === "softLight") thisBlendMode = "soft-light";
        else if (blendMode === "hardLight") thisBlendMode = "hard-light";
        else if (blendMode === "difference") thisBlendMode = "difference";
        else if (blendMode === "exclusion") thisBlendMode = "exclusion";

        // Return
        return {
            input: l,
            left: layers[index].left < 0 ? 0 : layers[index].left,
            top: layers[index].top < 0 ? 0 : layers[index].top,
            blend: thisBlendMode as any
        };
    }));

    // Export canvas
    const mergedLayer: Buffer = await canvas.toFormat("png").toBuffer();

    // Create new layer
    const newLayer: Layer = new Layer({
        name,
        image: mergedLayer,
        position
    }, document);
    await newLayer._initialize;

    // Remove the merged layers unless we need to copy when merging
    if (!copy) layers.forEach((l: AnyLayer) => l.remove());

    // Return
    return newLayer;
}