import sharp, { Sharp } from "sharp";
import exportTo, { ExportTypes, Format, Output } from "./exportTo";

export interface DocumentData {
    width: number;
    height: number;
}

export default class Document {

    /**
     * Canvas
     *
     * The Sharp instance
     */
    canvas: Sharp;

    /**
     * Document
     *
     * @param documentData Options to initialize this document with
     * @param documentData.width The width of the document in pixels
     * @param documentData.height The height of the document in pixels
     */
    constructor(documentData: DocumentData) {

        // Create sharp canvas
        this.canvas = sharp({
            create: {
                width: documentData.width,
                height: documentData.height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        });
    }

    /**
     * Export To
     *
     * Export this document
     *
     * @param format The format to export in - One of: 'png', 'jpeg', 'webp', 'gif', 'tiff', 'heif', 'raw', or 'tile'
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param path The path to write the file to if the `exportType` is 'file'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer} `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
     */
    exportTo = <ExportType extends ExportTypes>(format: Format, exportType: ExportType, path?: string): Promise<Output<ExportType> | undefined> => exportTo(this, format, exportType, path);
}