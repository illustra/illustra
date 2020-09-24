import Layer, { LayerData } from "../Layer/Layer";
import createLayer from "./createLayer";

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
     * @param layerData Date for the layer
     * @param layerData.name The name of the layer
     * @param layerData.backgroundColor The background color of the layer
     *
     * @returns {Document} This document
     */
    createLayer = (layerData: LayerData): Document => createLayer(this, layerData);

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
}