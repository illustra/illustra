import { BaseLayer, BaseLayerData, Document } from "../../internal";
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
        super(layerData, document, inputData);
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