import sharp from "sharp";
import BaseLayer, { BaseLayerData } from "../BaseLayer/BaseLayer";
import Document from "../Document/Document";
import duplicate from "./duplicate";

export type LayerData = BaseLayerData;

export default class Layer extends BaseLayer {

    /**
     * Layer
     *
     * @param document The document this layer is a part of
     * @param layerData Data for the layer
     * @param layerData.name The name of the layer
     * @param layerData.file An image file to use for this layer
     * @param layerData.buffer An image buffer to use for this layer
     * @param layerData.svg An SVG string to use for this layer
     * @param layerData.top The vertical offset from the top to place this layer
     * @param layerData.left The horizontal offset from the left to place this layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param layerData.debugMode Set to `true` to log debug info to the console
     * @param inputData Internal: Image data to use for this layer
     */
    constructor(layerData: BaseLayerData, document?: Document, inputData?: string | Buffer) {

        // Super
        super(layerData, document);

        // Set document
        this.document = document;

        // Parse input data
        if (layerData.file) inputData = layerData.file;
        else if (layerData.buffer) inputData = layerData.buffer;
        else if (layerData.svg?.trim().startsWith("<svg")) inputData = Buffer.from(layerData.svg);

        // Set data
        this._inputData = inputData;
        this.name = layerData.name;
        this.top = layerData.top || 0;
        this.left = layerData.left || 0;
        this._edits = [];
        this.opacity = 100;
        this.blendMode = "normal";

        // Set debug mode
        this.setDebugMode(layerData.debugMode || false);

        // Initialize
        this._initialize = new Promise(async (resolve) => {

            // No input data ie. for shape layers
            if (!this._inputData) return resolve();

            // Create sharp canvas
            const canvas: sharp.Sharp = sharp(inputData);

            // Get metadata
            const metadata: sharp.Metadata = await canvas.metadata();

            // Set data
            this.width = metadata.width || 0;
            this.height = metadata.height || 0;

            // Resolve
            resolve();
        });

        // Add to document
        if (document) document.addLayer(this, layerData.position);
    }

    /**
     * Duplicate
     *
     * Duplicate this layer
     *
     * @param name The name of the new layer. Omit to copy the name of the layer being duplicated
     * @param position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer above the layer being duplicated.
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param debugMode Set to `true` to log debug info to the console
     *
     * @returns {Layer} The new layer
     */
    duplicate = (name?: string, position?: number, debugMode?: boolean): Promise<Layer> => duplicate(this, name, position, debugMode);
}