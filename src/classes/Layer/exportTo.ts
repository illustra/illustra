import sharp from "sharp";
import Layer from "./Layer";

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
 * Output
 *
 * The return value, which will be `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
 */
export type Output<ExportType> = ExportType extends "file" ? undefined : Buffer;

export default async function exportTo<ExportType extends ExportTypes>(layer: Layer, format: Format, exportType: ExportType, path?: string): Promise<Output<ExportType>> {

    // Invalid format
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    layer._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${path}` : ""}`);

    // Create canvas
    let canvas: sharp.Sharp = sharp(layer._inputData);

    // Transformations
    for (let transformation of layer._transformations) {

        // Rotate
        if (transformation.type === "rotation") canvas.rotate(transformation.degrees, {
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });

        // Resize
        else if (transformation.type === "resize") canvas.resize(transformation.width, transformation.height, {
            fit: "fill"
        });

        // Reflect
        else if (transformation.type === "reflection") transformation.direction === "vertical" ? canvas.flip() : canvas.flop();

        // Export and import
        const exported: Buffer = await canvas.toFormat("png").toBuffer();
        canvas = sharp(exported);
    }

    // Convert to format
    // https://sharp.pixelplumbing.com/api-output#toformat
    canvas.toFormat(format);

    // Export to file
    // https://sharp.pixelplumbing.com/api-output#tofile
    if (exportType === "file") {

        // No path
        if (!path) throw new Error("Path must be specified if exportType is 'file'");

        // Export
        await canvas.toFile(path);

        // Return
        return undefined as Output<ExportType>;
    }

    // Export as buffer
    // https://sharp.pixelplumbing.com/api-output#tobuffer
    return await canvas.toBuffer() as Output<ExportType>;
}