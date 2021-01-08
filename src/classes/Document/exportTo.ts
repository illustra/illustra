import { Document, Layer } from "../../internal";
import { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "../BaseLayer/exportTo";

export default async function exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(document: Document, format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {

    // Invalid format
    if (!["png", "jpeg", "webp", "gif", "tiff", "heif", "raw", "tile"].includes(format)) throw new Error("Invalid format");

    // Invalid export type
    if (!["file", "buffer"].includes(exportType)) throw new Error("Invalid export type");

    // Debug
    document._debug(`Exporting as ${exportType}${exportType === "file" ? ` to ${pathOrWithMetadata}` : ""}`);

    /**
     * Merge layers
     *
     * Merge all the layers in the document
     * That way we can export the merged layer
     */
    const mergedLayer: Layer = await document.mergeLayers("merged", undefined, true);

    // Export merged layer
    const exported: Output<ExportType, PathOrWithMetadata> = await mergedLayer.exportTo(format, exportType, pathOrWithMetadata);

    // Remove the merged layer that was created from the document
    mergedLayer.remove();

    // Return
    return exported;
}