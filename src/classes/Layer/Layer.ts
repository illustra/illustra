import sharp, { Sharp } from "sharp";
import Document from "../Document/Document";
import exportTo, { ExportTypes, Format, Output } from "./exportTo";

export interface LayerData {
    name: string;
    backgroundColor?: sharp.Color;
}

export default class Layer {

    /**
     * Canvas
     *
     * The Sharp instance
     */
    canvas: Sharp;

    /**
     * Document
     *
     * The document this layer is a part of
     */
    document: Document;

    /**
     * Name
     *
     * This layer's name
     */
    name: string;

    /**
     * Layer
     *
     * @param document The document this layer is a part of
     * @param layerData Date for the layer
     * @param layerData.name The name of the layer
     * @param layerData.backgroundColor The background color of the layer
     */
    constructor(document: Document, layerData: LayerData) {

        // Create sharp canvas
        this.canvas = sharp({
            create: {
                width: document.width,
                height: document.height,
                channels: 4,
                background: layerData.backgroundColor || { r: 0, g: 0, b: 0, alpha: 0 }
            }
        });

        // Set document
        this.document = document;

        // Set name
        this.name = layerData.name;

        // Add to document
        document.layers.push(this);
    }

    /**
     * Export To
     *
     * Export this layer
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