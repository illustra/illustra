import { promises as fs } from "fs";
import tar from "tar";
import tmp, { DirectoryResult } from "tmp-promise";
import { AnyLayer, ILAData } from "../../../internal";
import parseILAData from "../../BaseLayer/ila/parseILAData";

export default async function importILA(pathOrBuffer: string | Buffer, assetsDirectory?: string): Promise<AnyLayer> {

    // Create temp directory
    const tempDirectory: DirectoryResult = await tmp.dir({
        unsafeCleanup: true
    });

    // If the input is a path, copy the file to the temp directory
    if (typeof pathOrBuffer === "string") await fs.copyFile(pathOrBuffer, `${tempDirectory.path}/layer.ila`);

    // Otherwise, if its a buffer, write the file to the temp directory
    else await fs.writeFile(`${tempDirectory.path}/layer.ila`, pathOrBuffer);

    // Extract the tarball
    await tar.extract({
        file: `${tempDirectory.path}/layer.ila`,
        cwd: tempDirectory.path
    });

    // Get data file
    const data: ILAData = JSON.parse((await fs.readFile(`${tempDirectory.path}/data/data.json`)).toString());

    // Get asset names
    const assetNames: string[] = (await fs.readdir(`${tempDirectory.path}/data/assets`)).sort((a: string, b: string) => parseInt(a) - parseInt(b));

    // Define assets
    let assets: Array<string | Buffer> = [];

    // If the assets directory is specified, copy the assets there
    if (assetsDirectory) for (let asset of assetNames) {

        // Copy file
        await fs.copyFile(`${tempDirectory.path}/data/assets/${asset}`, `${assetsDirectory}/${asset}`);

        // Add to assets
        assets.push(`${assetsDirectory}/${asset}`);
    }

    // Otherwise, read the assets into an array
    else for (let asset of assetNames) {

        // Get image
        const image: Buffer = await fs.readFile(`${tempDirectory.path}/data/assets/${asset}`);

        // Add to assets
        assets.push(asset.endsWith(".svg") ? image.toString() : image);
    }

    // Create layer
    const layer: AnyLayer = await parseILAData(data, assets);

    // Remove temp directory
    await tempDirectory.cleanup();

    // Return
    return layer;
}