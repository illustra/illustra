import { AnyLayer, BaseLayer } from "./internal";

export default async function importILA(pathOrBuffer: string | Buffer, assetsDirectory?: string): Promise<AnyLayer> {

    // Import ILA
    const layer: AnyLayer = await BaseLayer.importILA(pathOrBuffer, assetsDirectory);

    // Return
    return layer;
}