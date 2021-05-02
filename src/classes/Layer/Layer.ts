import sharp from "sharp";
import { BaseLayer, BaseLayerData, Document } from "../../internal";

export type LayerData = BaseLayerData;

export default class Layer extends BaseLayer {

    /**
     * Initialize
     *
     * A promise for when this layer will be initialized
     *
     * @private
     */
    _initialize: Promise<void>;

    /**
     * Input Data
     *
     * This layer's input data
     *
     * @private
     */
    _inputData?: string | Buffer;

    /**
     * SVG
     *
     * Whether or not the input data is an SVG buffer
     *
     * @private
     */
    _svg: boolean;

    /**
     * Width
     *
     * The width of this layer
     */
    width: number;

    /**
     * Height
     *
     * The height of this layer
     */
    height: number;

    /**
     * Layer
     *
     * @param document The document this layer is a part of
     * @param layerData Data for the layer
     * @param layerData.name The name of the layer
     * @param layerData.file An image file to use for this layer
     * @param layerData.buffer An image buffer to use for this layer
     * @param layerData.svg An SVG string to use for this layer
     * @param layerData.left The horizontal offset from the left to place this layer
     * @param layerData.top The vertical offset from the top to place this layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param layerData.debugMode Set to `true` to log debug info to the console
     * @param inputData Image data to use for this layer
     */
    constructor(layerData: BaseLayerData, document?: Document, inputData?: string | Buffer) {

        // Super
        super(layerData, document);

        // Parse input data
        if (layerData.file) inputData = layerData.file;
        else if (layerData.buffer) inputData = layerData.buffer;
        else if (layerData.svg && layerData.svg.trim().startsWith("<svg")) inputData = Buffer.from(layerData.svg);

        // Set data
        this._inputData = inputData;
        this._svg = Boolean(layerData.svg && layerData.svg.trim().startsWith("<svg"));

        // Initialize
        this._initialize = new Promise(async (resolve) => {

            // No input data ie. for text layers
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
    }
}