import Layer, { LayerData } from "../Layer/Layer";
import createLayer from "./createLayer";
import flattenLayers from "./flattenLayers";

export interface DocumentData {
    width: number;
    height: number;
    layer: LayerData;
}

export default class Document {

    /**
     * Width
     *
     * The width of this document
     */
    width: number;

    /**
     * Height
     *
     * The height of this document
     */
    height: number;

    /**
     * Layers
     *
     * This document's layers
     * The lower the layer's index, the lower the layer is in the stack
     */
    layers: Layer[];

    /**
     * Document
     *
     * @param documentData Options to initialize this document with
     * @param documentData.width The width of the document in pixels
     * @param documentData.height The height of the document in pixels
     * @param documentData.layer Data for the initial layer
     * @param documentData.layer.name The name of the initial layer
     * @param documentData.layer.data The image data of the initial layer
     * @param documentData.layer.backgroundColor The background color of the initial layer
     */
    constructor(documentData: DocumentData) {

        // Set width and height
        this.width = documentData.width;
        this.height = documentData.height;

        // Set layers
        this.layers = [];

        // Create layer
        this.createLayer(documentData.layer);
    }

    /**
     * Create Layer
     *
     * Create a new layer
     *
     * @param layerData Data for the layer
     * @param layerData.name The name of the layer
     * @param layerData.data The image data of the layer
     * @param layerData.backgroundColor The background color of the layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     *
     * @returns {Layer} The created layer
     */
    createLayer = (layerData: LayerData): Layer => createLayer(this, layerData);

    /**
     * Get Layer
     *
     * Get a layer by name or index
     *
     * @returns {Layer | undefined} The layer if found or `undefined`
     */
    getLayer = (nameOrIndex: string | number): Layer | undefined => {

        // Get by index
        if (typeof nameOrIndex === "string") return this.layers.find((l: Layer) => l.name === nameOrIndex);

        // Get by index
        else if (typeof nameOrIndex === "number") return this.layers[nameOrIndex];
    }

    /**
     * Flatten Layers
     *
     * Flatten some or all layers
     * The new layer will be placed at the same index as the layer with the highest index being flattened
     *
     * @param name The name of the new layer
     * @param layers An array of the layers to flatten
     * The array can contain a mix of `Layer` objects, layer names, or layer indexes
     * Omit to flatten all layers
     *
     * @returns {Layer} The new layer
     */
    flattenLayers = (name: string, layers?: Array<Layer | string | number>): Promise<Layer> => flattenLayers(this, name, layers);
}