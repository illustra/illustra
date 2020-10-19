import sharp from "sharp";
import { ShapeLayer, TextLayer } from "../../";
import Layer from "./Layer";

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

export default async function exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(layer: Layer, format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {

    // Invalid format
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    layer._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${pathOrWithMetadata}` : ""}`);

    // Define input data
    let inputData: string | Buffer | undefined = layer._inputData;

    // Create image buffer from shape layer
    if (layer instanceof ShapeLayer) inputData = layer.toBuffer();

    // Create image buffer from text layer
    if (layer instanceof TextLayer) inputData = await layer.toBuffer();

    // Create canvas
    let canvas: sharp.Sharp = sharp(inputData);

    // Edits
    for (let transformation of layer._transformations) {

        // Rotate
        if (transformation.type === "rotate") canvas.rotate(transformation.degrees, {
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });

        // Resize
        else if (transformation.type === "resize") canvas.resize(transformation.width, transformation.height, {
            fit: "fill"
        });

        // Reflect
        else if (transformation.type === "reflect") transformation.direction === "vertical" ? canvas.flip() : canvas.flop();

        // Export and import
        const exported: Buffer = await canvas.toFormat("png").toBuffer();
        canvas = sharp(exported);
    }

    // Invert
    if (layer._invert) canvas.negate();

    // Blur
    if (layer._blurSigma) canvas.blur(layer._blurSigma);

    // Opacity
    if (layer.opacity !== 100) canvas.joinChannel(Buffer.alloc(layer.width * layer.height, 255 * (layer.opacity / 100)), {
        raw: {
            width: layer.width,
            height: layer.height,
            channels: 1
        }
    });

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