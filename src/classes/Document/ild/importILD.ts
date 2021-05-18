import { promises as fs } from "fs";
import tar from "tar";
import tmp, { DirectoryResult } from "tmp-promise";
import { Document, ILDData } from "../../../internal";
import parseILAData from "../../BaseLayer/ila/parseILAData";

export default async function importILD(pathOrBuffer: string | Buffer, assetsDirectory?: string): Promise<Document> {

    // Create temp directory
    const tempDirectory: DirectoryResult = await tmp.dir({
        unsafeCleanup: true
    });

    // If the input is a path, copy the file to the temp directory
    if (typeof pathOrBuffer === "string") await fs.copyFile(pathOrBuffer, `${tempDirectory.path}/document.ild`);

    // Otherwise, if its a buffer, write the file to the temp directory
    else await fs.writeFile(`${tempDirectory.path}/document.ild`, pathOrBuffer);

    // Extract the tarball
    await tar.extract({
        file: `${tempDirectory.path}/document.ild`,
        cwd: tempDirectory.path
    });

    // Get data file
    const data: ILDData = JSON.parse((await fs.readFile(`${tempDirectory.path}/data/data.json`)).toString());

    // Invalid data
    if (typeof data.name !== "string") throw new Error("Error parsing Illustra file");
    if (typeof data.width !== "number") throw new Error("Error parsing Illustra file");
    if (typeof data.height !== "number") throw new Error("Error parsing Illustra file");
    if (!(data.layers instanceof Array)) throw new Error("Error parsing Illustra file");

    // Create document
    const document: Document = new Document({
        name: data.name,
        width: data.width,
        height: data.height
    });

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

    // Create layers
    for (let layer of data.layers) document.addLayer(await parseILAData(layer, assets));

    // Remove temp directory
    await tempDirectory.cleanup();

    // Return
    return document;
}