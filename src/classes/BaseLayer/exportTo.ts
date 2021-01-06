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
export type Format = "png" | "jpeg" | "webp" | "gif" | "tiff" | "heif" | "raw" | "tile";

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
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    baseLayer._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${pathOrWithMetadata}` : ""}`);

    // Define input data
    let inputData: string | Buffer | undefined;

    // Get input data
    if (baseLayer instanceof Layer) inputData = baseLayer._inputData;

    // Create image buffer from polygons and ellipses
    if ((baseLayer instanceof Polygon) || (baseLayer instanceof Ellipse)) inputData = baseLayer.toBuffer();

    // Create image buffer from text layer
    if (baseLayer instanceof TextLayer) inputData = await baseLayer.toBuffer();

    // Create image buffer from clipping mask
    if (baseLayer instanceof ClippingMask) inputData = await baseLayer.toBuffer();

    // Create sharp canvas
    // Careful, it's sharp
    let canvas: sharp.Sharp = sharp(inputData);

    // Edits
    for (let edit of baseLayer._edits) {

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

        // Export and import
        const exported: Buffer = await canvas.toFormat("png").toBuffer();
        canvas = sharp(exported);
    }

    // Opacity
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
    // https://sharp.pixelplumbing.com/api-output#toformat
    canvas.toFormat(format);

    // Export to file
    // https://sharp.pixelplumbing.com/api-output#tofile
    if (exportType === "file") {

        // No path
        if (typeof pathOrWithMetadata !== "string") throw new Error("Path must be specified if exportType is 'file'");

        // Export
        await canvas.toFile(pathOrWithMetadata);

        // Return
        return undefined as Output<ExportType, PathOrWithMetadata>;
    }

    // Export as buffer
    // https://sharp.pixelplumbing.com/api-output#tobuffer
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