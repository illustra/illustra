import debug from "../../debug";
import ClippingMask, { ClippingMaskData } from "../ClippingMask/ClippingMask";
import Layer, { LayerData } from "../Layer/Layer";
import { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "../Layer/exportTo";
import ShapeLayer, { ShapeLayerData } from "../ShapeLayer/ShapeLayer";
import TextLayer, { TextLayerData } from "../TextLayer/TextLayer";
import addLayer from "./addLayer";
import createClippingMask from "./createClippingMask";
import createLayer from "./createLayer";
import createShapeLayer from "./createShapeLayer";
import createTextLayer from "./createTextLayer";
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
    layers: Array<Layer | ShapeLayer>;

    /**
     * Debug Mode
     *
     * Whether or not this document is in debug mode
     */
    debugMode: boolean;

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
     * Create Shape Layer
     *
     * Create a new shape layer
     *
     * @param shapeLayerData Data for the layer
     * @param shapeLayerData.name The name of the layer
     * @param shapeLayerData.shape The data for the shape
     * @param shapeLayerData.shape.type The type of shape
     * Either 'polygon' or 'ellipse'
     * @param shapeLayerData.shape.width The width of this shape
     * @param shapeLayerData.shape.height The height of this shape
     * @param shapeLayerData.shape.sides The number of sides this shape has if it's a polygon
     * @param shapeLayerData.shape.cornerRadius The radius of this shape's corners if it's a polygon
     * @param shapeLayerData.shape.fill The color of this shape's fill
     * @param shapeLayerData.shape.stroke The color of this shape's stroke
     * @param shapeLayerData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param shapeLayerData.top The vertical offset from the top to place this layer
     * @param shapeLayerData.left The horizontal offset from the left to place this layer
     * @param shapeLayerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param shapeLayerData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {ShapeLayer} The created shape layer
     */
    createShapeLayer = (shapeLayerData: ShapeLayerData): ShapeLayer => createShapeLayer(this, shapeLayerData);

    /**
     * Create Text Layer
     *
     * Create a new text layer
     *
     * @param textLayerData Data for the layer
     * @param textLayerData.name The name of the layer
     * @param textLayerData.text The data for the text
     * @param textLayerData.text.text The text
     * @param textLayerData.text.font The font to use
     * @param textLayerData.text.fontSize The font size to use
     * @param textLayerData.text.fontWeight The font weight to use
     * @param textLayerData.text.textAlign How the text should be aligned
     * @param textLayerData.text.color The color of the text
     * @param textLayerData.text.lineHeight The line height to use
     * @param textLayerData.text.maxWidth The max width of the text
     * @param textLayerData.top The vertical offset from the top to place this layer
     * @param textLayerData.left The horizontal offset from the left to place this layer
     * @param textLayerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param textLayerData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {TextLayer} The created text layer
     */
    createTextLayer = (textLayerData: TextLayerData): TextLayer => createTextLayer(this, textLayerData);

    /**
     * Create Clipping Mask
     *
     * Create a new clipping mask
     *
     * @param clippingMaskData Data for the layer
     * @param clippingMaskData.name The name of the layer
     * @param clippingMaskData.mask The layer that the source will clip to
     * @param clippingMaskData.source The layer that will get clipped to the mask
     * @param clippingMaskData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param clippingMaskData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {ClippingMask} The created text layer
     */
    createClippingMask = (clippingMaskData: ClippingMaskData): ClippingMask => createClippingMask(this, clippingMaskData);

    /**
     * Add Layer
     *
     * Add a layer to this document
     */
    addLayer = (layer: Layer, position?: number) => addLayer(this, layer, position);

    /**
     * Get Layer
     *
     * Get a layer by name or index
     *
     * @returns {Layer | ShapeLayer | undefined} The layer if found or `undefined`
     */
    getLayer = (nameOrIndex: string | number): Layer | ShapeLayer | undefined => {

        // Get by index
        if (typeof nameOrIndex === "string") return this.layers.find((l: Layer | ShapeLayer) => l.name === nameOrIndex);

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
     * @param pathOrWithMetadata The path to write the file to if the `exportType` is 'file' or whether or not to return metadata if the `exportType` is 'buffer'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer | ExportMetadata} `undefined` if the `exportType` is 'file', `Buffer` if the `exportType` is 'buffer' and `pathOrWithMetadata` is false, or `ExportMetadata` if the `exportType` is 'buffer' and `pathOrWithMetadata` is true
     */
    exportTo = <ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> => exportTo(this, format, exportType, pathOrWithMetadata);

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
     */
    _debug = (info: string) => debug(info, this);
}