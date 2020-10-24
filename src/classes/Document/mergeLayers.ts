import sharp from "sharp";
import Layer, { BlendMode } from "../Layer/Layer";
import Document from "./Document";

export default async function mergeLayers(document: Document, name: string, inputLayers?: Array<Layer | string | number>, copy?: boolean): Promise<Layer> {

    // Define layers
    let layers: Layer[];

    // Get layers
    if (inputLayers) {

        // Get layer objects from names and indexes
        const layerObjects: Array<Layer | undefined> = inputLayers.map((l: Layer | string | number): Layer | undefined => ((typeof l === "string") || (typeof l === "number")) ? document.getLayer(l) : l);

        // Layer isn't part of this document
        const invalidLayerIndex: number = layerObjects.findIndex((l: Layer | undefined) => l && l.document !== document);
        if (invalidLayerIndex !== -1) throw new Error(`Layer at index ${invalidLayerIndex} isn't part of this document`);

        // Unknown layer
        const unknownLayerIndex: number = layerObjects.findIndex((l: Layer | undefined) => !l);
        if (unknownLayerIndex !== -1) {

            // Get input layer
            const inputLayer: string | number = inputLayers[unknownLayerIndex] as string | number;

            // Throw error
            throw new Error(`Unknown layer with ${typeof inputLayer === "string" ? `name '${inputLayer}'` : `index ${inputLayer}`}`);
        }

        // Set layers
        layers = layerObjects as Layer[];
    }
    else layers = [...document.layers];

    // Get position
    const position: number = Math.max(...layers.map((l: Layer) => l.position)) + 1;

    // Debug
    document._debug(`Merging ${layers.length} layers (${layers.map((l: Layer) => l.name).join(", ")})${copy ? " via copy" : ""} into '${name}' at position ${position}`);

    // Export layers
    const exportedLayersPromises: Array<Promise<Buffer>> = layers.map((l: Layer) => l.exportTo("png", "buffer"));
    const exportedLayers: Buffer[] = await Promise.all(exportedLayersPromises);

    // Create sharp canvas
    const canvas: sharp.Sharp = sharp({
        create: {
            width: document.width,
            height: document.height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    });

    // Composite
    canvas.composite(exportedLayers.map((l: Buffer, index: number) => {

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
            top: layers[index].top,
            left: layers[index].left,
            blend: thisBlendMode as any
        };
    }));

    // Export canvas
    const mergedLayer: Buffer = await canvas.toFormat("png").toBuffer();

    // Create layer
    const newLayer: Layer = new Layer({
        name,
        buffer: mergedLayer,
        position
    }, document);
    await newLayer._initialize;

    // Remove layers
    if (!copy) layers.forEach((l: Layer) => l.remove());

    // Return
    return newLayer;
}