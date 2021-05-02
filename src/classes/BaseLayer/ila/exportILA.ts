import { promises as fs } from "fs";
import { extname as pathExtname } from "path";
import sharp from "sharp";
import tar from "tar";
import tmp, { DirectoryResult } from "tmp-promise";
import { BaseLayer, ILAAsset, ILAData } from "../../../internal";
import { ExportTypes, Output } from "../exportTo";

export default async function exportILA<ExportType extends ExportTypes, Path extends string>(baseLayer: BaseLayer, exportType: ExportType, path?: Path): Promise<Output<ExportType, Path>> {

    // Create temp directory
    const tempDirectory: DirectoryResult = await tmp.dir({
        unsafeCleanup: true
    });
    await fs.mkdir(`${tempDirectory.path}/data`);

    // Get ILA data
    const assets: ILAAsset[] = [];
    const ilaData: ILAData = baseLayer._getILAData(assets);

    // Create data file
    await fs.writeFile(`${tempDirectory.path}/data/data.json`, JSON.stringify(ilaData));

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
        file: path || `${tempDirectory.path}/layer.ila`,
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
    const exported: Buffer = await fs.readFile(`${tempDirectory.path}/layer.ila`);

    // Remove temp directory
    await tempDirectory.cleanup();

    // Return buffer
    return exported as Output<ExportType, Path>;
}