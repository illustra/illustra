import Layer, { LayerData } from "../Layer/Layer";
import Document from "./Document";

export default async function createLayer(document: Document, layerData: LayerData): Promise<Layer> {

    // Debug
    document._debug(`Creating layer '${layerData.name}' at position ${layerData.position || document.layers.length}`);

    // Create layer
    const layer: Layer = new Layer(layerData, document);
    await layer._initialize;

    // Return created layer
    return layer;
}