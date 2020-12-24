import { Layer, LayerData } from "./internal";

export default async function createLayer(layerData: LayerData): Promise<Layer> {

    // Create layer
    const layer: Layer = new Layer(layerData);
    await layer._initialize;

    // Return created layer
    return layer;
}