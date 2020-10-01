import sharp from "sharp";
import Layer from "../Layer/Layer";
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
    canvas.composite(exportedLayers.map((l: Buffer, index: number) => ({
        input: l,
        top: layers[index].top,
        left: layers[index].left
    })));

    // Export canvas
    const mergedLayer: Buffer = await canvas.toFormat("png").toBuffer();

    // Create layer
    const newLayer: Layer = new Layer(document, {
        name,
        data: mergedLayer,
        position
    });
    await newLayer._initialize;

    // Delete layers
    if (!copy) layers.forEach((l: Layer) => l.delete());

    // Return
    return newLayer;
}