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

    // Rotate
    if (layer.rotation) layer.canvas.rotate(layer.rotation, {
        background: { r: 0, g: 0, b: 0, alpha: 0 }
    });

    // Resize
    if (layer._isResized) layer.canvas.resize(layer.width, layer.height, {
        fit: "fill"
    });

    // Convert to format
    // https://sharp.pixelplumbing.com/api-output#toformat
    layer.canvas.toFormat(format);

    // Export to file
    // https://sharp.pixelplumbing.com/api-output#tofile
    if (exportType === "file") {

        // No path
        if (!path) throw new Error("Path must be specified if exportType is 'file'");

        // Export
        await layer.canvas.toFile(path);

        // Return
        return undefined as Output<ExportType>;
    }

    // Export as buffer
    // https://sharp.pixelplumbing.com/api-output#tobuffer
    return await layer.canvas.toBuffer() as Output<ExportType>;
}