import Layer from "../Layer/Layer";
import { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "../Layer/exportTo";
import Document from "./Document";

export default async function exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(document: Document, format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {

    // Invalid format
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    document._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${pathOrWithMetadata}` : ""}`, undefined, true);

    // Merge layers
    const mergedLayer: Layer = await document.mergeLayers("merged", undefined, true);

    // Export merged layer
    const exported: Output<ExportType, PathOrWithMetadata> = await mergedLayer.exportTo(format, exportType, pathOrWithMetadata);

    // Delete merged layer
    mergedLayer.delete();

    // End Debug Group
    document._endDebugGroup();

    // Return
    return exported;
}