import Document from "../Document/Document";
import Layer from "../Layer/Layer";

export interface MaskData {
    name: string;
    mask: Layer;
    source: Layer;
    position?: number;
    debugMode?: boolean;
}

export default class Mask extends Layer {

    /**
     * Mask
     *
     * The layer that the source will clip to
     */
    mask: Layer;

    /**
     * Source
     *
     * The layer that will get clipped to the mask
     */
    source: Layer;

    /**
     * Mask
     *
     * @param document The document this layer is a part of
     * @param maskData Data for the layer
     * @param maskData.name The name of the layer
     * @param maskData.mask The layer that the source will clip to
     * @param maskData.source The layer that will get clipped to the mask
     * @param maskData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param maskData.debugMode Set to `true` to log debug info to the console
     */
    constructor(maskData: MaskData, document?: Document) {

        // Super
        super(maskData, document);

        // Set data
        this.mask = maskData.mask;
        this.source = maskData.source;
    }
}