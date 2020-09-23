import sharp, { Sharp } from "sharp";

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
}