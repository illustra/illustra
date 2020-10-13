import Layer, { LayerData } from "../Layer/Layer";
import { ExportTypes, Format, Output } from "../Layer/exportTo";
import createLayer from "./createLayer";
import debug from "./debug";
import exportTo from "./exportTo";
import mergeLayers from "./mergeLayers";

export interface DocumentData {
    name?: string;
    width: number;
    height: number;
    debugMode?: boolean;
}

export default class Document {

    /**
     * Name
     *
     * The name of this document
     */
    name: string;

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
     * Debug Mode
     *
     * Whether or not this document is in debug mode
     */
    debugMode: boolean;

    /**
     * Debug Group Depth
     *
     * The depth of the debug groups
     */
    _debugGroupDepth: number;

    /**
     * Document
     *
     * @param documentData Options to initialize this document with
     * @param documentData.name The name of the document
     * @param documentData.width The width of the document in pixels
     * @param documentData.height The height of the document in pixels
     * @param documentData.debugMode Set to `true` to log debug info to the console
     */
    constructor(documentData: DocumentData) {

        // Set data
        this.name = documentData.name || "Unnamed Document";
        this.width = documentData.width;
        this.height = documentData.height;

        // Set layers
        this.layers = [];

        // Set debug mode
        this.setDebugMode(documentData.debugMode || false);
        this._debugGroupDepth = 0;
    }

    /**
     * Create Layer
     *
     * Create a new layer
     *
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
     *
     * @returns {Layer} The created layer
     */
    createLayer = (layerData: LayerData): Promise<Layer> => createLayer(this, layerData);

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
     * Merge Layers
     *
     * Merge some or all layers
     * The new layer will be placed above the highest layer being merged
     *
     * @param name The name of the new layer
     * @param layers An array of the layers to merge
     * The array can contain a mix of `Layer` objects, layer names, or layer indexes
     * Omit to merge all layers
     * @param copy Set to `true` to keep the merged layers
     * Omit or set to `false` to delete the merged layers
     *
     * @returns {Layer} The new layer
     */
    mergeLayers = (name: string, layers?: Array<Layer | string | number>, copy?: boolean): Promise<Layer> => mergeLayers(this, name, layers, copy);

    /**
     * Export To
     *
     * Export this document
     *
     * @param format The format to export in - One of: 'png', 'jpeg', 'webp', 'gif', 'tiff', 'heif', 'raw', or 'tile'
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param path The path to write the file to if the `exportType` is 'file'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer} `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
     */
    exportTo = <ExportType extends ExportTypes>(format: Format, exportType: ExportType, path?: string): Promise<Output<ExportType>> => exportTo(this, format, exportType, path);

    /**
     * Set Debug Mode
     *
     * @param debugMode Set to `true` to log debug info to the console
     */
    setDebugMode = (debugMode: boolean) => this.debugMode = debugMode;

    /**
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     * @param layer The layer that was modified
     * @param startGroup Whether or not to start a group of logs
     */
    _debug = (info: string, layer?: Layer, startGroup?: boolean) => debug(this, info, layer, startGroup);

    /**
     * End Debug Group
     *
     * End a debug group
     */
    _endDebugGroup = () => {
        this._debugGroupDepth--;
        if (this._debugGroupDepth < 0) this._debugGroupDepth = 0;
    }
}