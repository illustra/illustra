import Layer from "../Layer/Layer";
import { ExportTypes, Format, Output } from "../Layer/exportTo";
import Document from "./Document";

export default async function exportTo<ExportType extends ExportTypes>(document: Document, format: Format, exportType: ExportType, path?: string): Promise<Output<ExportType>> {

    // Invalid format
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    document._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${path}` : ""}`, undefined, true);

    // Merge layers
    const mergedLayer: Layer = await document.mergeLayers("merged", undefined, true);

    // Export merged layer
    const exported: Output<ExportType> = await mergedLayer.exportTo(format, exportType, path);

    // Delete merged layer
    mergedLayer.delete();

    // End Debug Group
    document._endDebugGroup();

    // Return
    return exported;
}