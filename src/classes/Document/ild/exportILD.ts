import { promises as fs } from "fs";
import { extname as pathExtname } from "path";
import sharp from "sharp";
import tar from "tar";
import tmp, { DirectoryResult } from "tmp-promise";
import { AnyLayer, Document, ILAAsset } from "../../../internal";
import { ExportTypes, Output } from "../../BaseLayer/exportTo";

export default async function exportILD<ExportType extends ExportTypes, Path extends string>(document: Document, exportType: ExportType, path?: Path): Promise<Output<ExportType, Path>> {

    // Create temp directory
    const tempDirectory: DirectoryResult = await tmp.dir({
        unsafeCleanup: true
    });
    await fs.mkdir(`${tempDirectory.path}/data`);

    // Define assets
    const assets: ILAAsset[] = [];

    // Create data file
    await fs.writeFile(`${tempDirectory.path}/data/data.json`, JSON.stringify({
        name: document.name,
        width: document.width,
        height: document.height,
        layers: document.layers.map((l: AnyLayer) => l._getILAData(assets))
    }));

    // Create assets directory
    await fs.mkdir(`${tempDirectory.path}/data/assets`);

    // Create image files
    for (let i = 0; i < assets.length; i++) {

        // If its a string, copy the file
        if (typeof assets[0].image === "string") fs.copyFile(assets[0].image, `${tempDirectory.path}/data/assets/${i + 1}${pathExtname(assets[0].image)}`);

        // If its an SVG buffer, write the SVG string to a file
        else if (assets[i].svg) await fs.writeFile(`${tempDirectory.path}/data/assets/${i + 1}.svg`, assets[i].image.toString());

        // Otherwise, create an image file
        else await sharp(assets[i].image).toFormat("png").toFile(`${tempDirectory.path}/data/assets/${i + 1}.png`);
    }

    // Create tarball
    await tar.create({
        file: path || `${tempDirectory.path}/document.ild`,
        gzip: true,
        cwd: tempDirectory.path
    }, ["data/"]);

    // Export to file
    if (exportType === "file") {

        // Remove temp directory
        await tempDirectory.cleanup();

        // No path
        if (!path) throw new Error("Path must be specified if exportType is 'file'");

        // Return
        return undefined as Output<ExportType, Path>;
    }

    // Get buffer
    const exported: Buffer = await fs.readFile(`${tempDirectory.path}/document.ild`);

    // Remove temp directory
    await tempDirectory.cleanup();

    // Return buffer
    return exported as Output<ExportType, Path>;
}