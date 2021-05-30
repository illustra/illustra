import sharp from "sharp";
import { BaseLayer, ClippingMask, Ellipse, Layer, Polygon, TextLayer } from "../../internal";

export interface ExportMetadata {
    data: Buffer;
    width: number;
    height: number;
}

/**
 * Format
 *
 * The available formats for exporting
 */
export type Format = "png" | "jpeg";

/**
 * Export Types
 *
 * The available types for exporting
 */
export type ExportTypes = "file" | "buffer";

/**
 * Path or With Metadata Options
 *
 * The available types for `pathOrWithMetadata`
 */
export type PathOrWithMetadataOptions = string | boolean;

/**
 * Output
 *
 * The return value, which will be `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
 */
export type Output<ExportType, PathOrWithMetadata> = ExportType extends "file" ? undefined : (PathOrWithMetadata extends true ? ExportMetadata : Buffer);

export default async function exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(baseLayer: BaseLayer, format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {

    // Invalid format
    if (!["png", "jpeg"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    baseLayer._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${pathOrWithMetadata}` : ""}`);

    // Define a variable for the input file or buffer
    let inputData: string | Buffer | undefined;

    // Get input data from a regular layer
    if (baseLayer instanceof Layer) inputData = baseLayer.image;

    // Create an image buffer from polygons and ellipses
    if ((baseLayer instanceof Polygon) || (baseLayer instanceof Ellipse)) inputData = baseLayer.toBuffer();

    // Create an image buffer from text layers
    if (baseLayer instanceof TextLayer) inputData = await baseLayer.toBuffer();

    // Create an image buffer from clipping masks
    if (baseLayer instanceof ClippingMask) inputData = await baseLayer.toBuffer();

    // Create a sharp canvas with the input data
    // Careful, it's sharp
    let canvas: sharp.Sharp = sharp(inputData);

    // Loop through the edits for the layer
    for (let edit of baseLayer.edits) {

        // Rotate
        if (edit.type === "rotate") canvas.rotate(edit.degrees, {
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });

        // Resize
        else if (edit.type === "resize") canvas.resize(edit.width, edit.height, {
            fit: "fill"
        });

        // Reflect
        else if (edit.type === "reflect") edit.direction === "vertical" ? canvas.flip() : canvas.flop();

        // Hue
        else if (edit.type === "hue") canvas.modulate({ hue: edit.degrees });

        // Saturation
        else if (edit.type === "saturation") canvas.modulate({ saturation: edit.amount / 100 });

        // Brightness
        else if (edit.type === "brightness") canvas.modulate({ brightness: edit.amount / 100 });

        // Invert
        else if (edit.type === "invert") canvas.negate();

        // Blur
        else if (edit.type === "blur") canvas.blur(edit.sigma);

        // Export and reimport because sharp seems to screw up the order of the edits sometimes
        const exported: Buffer = await canvas.toFormat("png").toBuffer();
        canvas = sharp(exported);
    }

    // Opacity
    // https://github.com/lovell/sharp/issues/618#issuecomment-532293211
    if (baseLayer.opacity !== 100) canvas.composite([{
        input: Buffer.from([255, 255, 255, 255 * (baseLayer.opacity / 100)]),
        raw: {
            width: 1,
            height: 1,
            channels: 4
        },
        tile: true,
        blend: "dest-in"
    }]);

    // Convert to format
    canvas.toFormat(format);

    // Export to file
    if (exportType === "file") {

        // No path
        if (typeof pathOrWithMetadata !== "string") throw new Error("Path must be specified if exportType is 'file'");

        // Export
        await canvas.toFile(pathOrWithMetadata);

        // Return
        return undefined as Output<ExportType, PathOrWithMetadata>;
    }

    // Export as buffer
    const exported = await canvas.toBuffer({ resolveWithObject: true });

    // Return export metadata
    if (pathOrWithMetadata) return {
        data: exported.data,
        width: exported.info.width,
        height: exported.info.height
    } as Output<ExportType, PathOrWithMetadata>;

    // Return buffer
    return exported.data as Output<ExportType, PathOrWithMetadata>;
}