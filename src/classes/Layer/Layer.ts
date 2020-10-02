import sharp, { Sharp } from "sharp";
import Document from "../Document/Document";
import deleteLayer from "./delete";
import duplicate from "./duplicate";
import exportTo, { ExportTypes, Format, Output } from "./exportTo";
import resize from "./resize";
import resizeBy from "./resizeBy";
import rotate from "./rotate";
import translate from "./translate";
import translateBy from "./translateBy";

interface Transformation {
    type: "rotation" | "resize";
    degrees?: number;
    width?: number;
    height?: number;
}

export interface LayerData {
    name: string;
    data?: string | Buffer;
    top?: number;
    left?: number;
    position?: number;
}

export default class Layer {

    /**
     * Document
     *
     * The document this layer is a part of
     */
    document: Document;

    /**
     * Initialize
     *
     * A promise for when this layer will be initialized
     */
    _initialize: Promise<void>;

    /**
     * Data
     *
     * This layer's input data
     */
    _data?: string | Buffer;

    /**
     * Name
     *
     * This layer's name
     */
    name: string;

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
     * Top
     *
     * The vertical offset from the top to place this layer
     */
    top: number;

    /**
     * Left
     *
     * The horizontal offset from the left to place this layer
     */
    left: number;

    /**
     * Position
     *
     * This layer's position
     */
    get position(): number {
        return this.document.layers.findIndex((l: Layer) => l === this);
    }

    /**
     * Transformations
     *
     * The transformations for this layer
     */
    _transformations: Transformation[];

    /**
     * Layer
     *
     * @param document The document this layer is a part of
     * @param layerData Data for the layer
     * @param layerData.name The name of the layer
     * @param layerData.data The image data of the layer
     * @param layerData.top The vertical offset from the top to place this layer
     * @param layerData.left The horizontal offset from the left to place this layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     */
    constructor(document: Document, layerData: LayerData) {

        // Set document
        this.document = document;

        // Set data
        this._data = layerData.data;
        this.name = layerData.name;
        this.top = layerData.top || 0;
        this.left = layerData.left || 0;
        this._transformations = [];

        // Initialize
        this._initialize = new Promise(async (resolve) => {

            // Create sharp canvas
            const canvas: sharp.Sharp = sharp(layerData.data);

            // Get metadata
            const metadata: sharp.Metadata = await canvas.metadata();

            // Set data
            this.width = metadata.width || 0;
            this.height = metadata.height || 0;

            // Resolve
            resolve();
        });

        // Add to document
        document.layers.splice(layerData.position || document.layers.length, 0, this);
    }

    /**
     * Translate
     *
     * Translate this layer to a specified position
     *
     * @param top The vertical offset from the top to place this layer
     * @param left The horizontal offset from the left to place this layer
     *
     * @returns {Layer} This layer
     */
    translate = (top?: number, left?: number): Layer => translate(this, top, left);

    /**
     * Translate By
     *
     * Translate this layer relative to its current location
     *
     * @param x The amount of pixels to move this layer horizontally
     * @param y The amount of pixels to move this layer vertically
     *
     * @returns {Layer} This layer
     */
    translateBy = (x?: number, y?: number): Layer => translateBy(this, x, y);

    /**
     * Rotate
     *
     * Rotate this layer
     *
     * @param degrees The amount of degrees to rotate this layer
     *
     * @returns {Layer} This layer
     */
    rotate = (degrees: number): Layer => rotate(this, degrees);

    /**
     * Resize
     *
     * Resize this layer to specified dimensions
     *
     * @param width The amount of pixels this layer's width should be
     * Pass `null` to stretch or `undefined` to automatically scale based on the `height`
     * @param height The amount of pixels this layer's height should be
     * Pass `null` to stretch or `undefined` to automatically scale based on the `width`
     *
     * @returns {Layer} This layer
     */
    resize = (width?: number | null, height?: number | null): Layer => resize(this, width, height);

    /**
     * Resize By
     *
     * Resize this layer relative to its current dimensions
     *
     * @param width The amount of pixels to increase this layer's width
     * Pass `null` to allow the `height` to stretch or `undefined` to automatically scale it`
     * @param height The amount of pixels to increase this layer's height
     * Pass `null` to allow the `width` to stretch or `undefined` to automatically scale it
     * @param scale Passing `true` will consider `width` and `height` to be a percent of this layer's current size
     *
     * @returns {Layer} This layer
     */
    resizeBy = (width?: number | null, height?: number | null, scale?: boolean): Layer => resizeBy(this, width, height, scale);

    /**
     * Duplicate
     *
     * Duplicate this layer
     *
     * @param name The name of the new layer. Omit to copy the name of the layer being duplicated
     * @param position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer above the layer being duplicated.
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     *
     * @returns {Layer} The new layer
     */
    duplicate = (name?: string, position?: number): Promise<Layer> => duplicate(this, name, position);

    /**
     * Delete
     *
     * Delete this layer
     */
    delete = () => deleteLayer(this);

    /**
     * Export To
     *
     * Export this layer
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
}