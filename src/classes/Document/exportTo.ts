import Document from "./Document";

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

export default async function exportTo<ExportType extends ExportTypes>(document: Document, format: Format, exportType: ExportType, path?: string): Promise<Output<ExportType> | undefined> {

    // Convert to format
    // https://sharp.pixelplumbing.com/api-output#toformat
    document.canvas.toFormat(format);

    // Export to file
    // https://sharp.pixelplumbing.com/api-output#tofile
    if (exportType === "file") {

        // No path
        if (!path) throw new Error("Path must be specified if exportType is 'file'");

        // Export
        await document.canvas.toFile(path);
    }

    // Export as buffer
    // https://sharp.pixelplumbing.com/api-output#tobuffer
    else if (exportType === "buffer") return await document.canvas.toBuffer() as Output<ExportType>;
}