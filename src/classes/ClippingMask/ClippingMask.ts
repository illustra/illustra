import { AnyLayer, BaseLayer, Document, LAYER_TYPE_CLIPPING_MASK } from "../../internal";
import toBuffer from "./toBuffer";

export interface ClippingMaskData {
    name: string;
    mask: AnyLayer;
    source: AnyLayer;
    left?: number;
    top?: number;
    position?: number;
    debugMode?: boolean;
}

export default class ClippingMask extends BaseLayer {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_CLIPPING_MASK;

    /**
     * Mask
     *
     * The layer that the source will clip to
     */
    mask: AnyLayer;

    /**
     * Source
     *
     * The layer that will get clipped to the mask
     */
    source: AnyLayer;

    /**
     * Mask
     *
     * @param document The document this layer is a part of
     * @param clippingMaskData Data for the layer
     * @param clippingMaskData.name The name of the layer
     * @param clippingMaskData.mask The layer that the source will clip to
     * @param clippingMaskData.source The layer that will get clipped to the mask
     * @param clippingMaskData.left The horizontal offset from the left to place this layer
     * @param clippingMaskData.top The vertical offset from the top to place this layer
     * @param clippingMaskData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param clippingMaskData.debugMode Set to `true` to log debug info to the console
     */
    constructor(clippingMaskData: ClippingMaskData, document?: Document) {

        // Super
        super(clippingMaskData, document);

        // Set data
        this.type = LAYER_TYPE_CLIPPING_MASK;
        this.mask = clippingMaskData.mask;
        this.source = clippingMaskData.source;
    }

    /**
     * To Buffer
     *
     * Creates an image buffer from this clipping mask
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Promise<Buffer> => toBuffer(this);
}