import sharp from "sharp";
import { BaseLayer, BaseLayerData, Document, LAYER_TYPE_LAYER } from "../../internal";
import setImage from "./setImage";

export interface LayerData extends BaseLayerData {
    image: string | Buffer;
}

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
     * SVG
     *
     * Whether or not the image is an SVG buffer
     *
     * @private
     */
    _svg: boolean;

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_LAYER;

    /**
     * Image
     *
     * This layer's image
     */
    image: string | Buffer;

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
     * @param layerData.image A path to an image file, image buffer, or SVG string to use for this layer
     * @param layerData.left The horizontal offset from the left to place this layer
     * @param layerData.top The vertical offset from the top to place this layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param layerData.debugMode Set to `true` to log debug info to the console
     */
    constructor(layerData: LayerData, document?: Document) {

        // Super
        super(layerData, document);

        // Parse image
        if ((typeof layerData.image === "string") && (layerData.image.trim().startsWith("<svg"))) this.image = Buffer.from(layerData.image);
        else this.image = layerData.image;

        // Set data
        this._svg = Boolean(typeof layerData.image === "string" && layerData.image.trim().startsWith("<svg"));
        this.type = LAYER_TYPE_LAYER;

        // Initialize
        this._initialize = new Promise(async (resolve) => {

            // Create sharp canvas
            const canvas: sharp.Sharp = sharp(this.image);

            // Get metadata
            const metadata: sharp.Metadata = await canvas.metadata();

            // Set data
            this.width = metadata.width || 0;
            this.height = metadata.height || 0;

            // Resolve
            resolve();
        });
    }

    /**
     * Set Image
     *
     * Set the image for this layer
     *
     * @param image The image
     *
     * @returns {Layer} This layer
     */
    setImage(image: string | Buffer): Promise<Layer> {
        return setImage(this, image);
    }
}