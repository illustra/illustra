import sharp from "sharp";
import debug from "../../debug";
import Document from "../Document/Document";
import align, { AlignOptions } from "./align";
import blur from "./blur";
import brightness from "./brightness";
import duplicate from "./duplicate";
import exportTo, { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "./exportTo";
import hue from "./hue";
import invert from "./invert";
import reflect from "./reflect";
import remove from "./remove";
import resize from "./resize";
import resizeBy from "./resizeBy";
import rotate from "./rotate";
import saturation from "./saturation";
import setBlendMode from "./setBlendMode";
import setOpacity from "./setOpacity";
import translate from "./translate";
import translateBy from "./translateBy";

interface Rotate {
    type: "rotate";
    degrees: number;
}

interface Resize {
    type: "resize";
    width?: number;
    height?: number;
}

interface Reflect {
    type: "reflect";
    direction: "vertical" | "horizontal";
}

interface Hue {
    type: "hue";
    degrees: number;
}

interface Saturation {
    type: "saturation";
    amount: number;
}

interface Brightness {
    type: "brightness";
    amount: number;
}

interface Hue {
    type: "hue";
    degrees: number;
}

interface Invert {
    type: "invert";
}

interface Blur {
    type: "blur";
    sigma: number;
}

type Edit = Rotate | Resize | Reflect | Hue | Saturation | Brightness | Invert | Blur;

export type BlendMode = "normal" | "darken" | "multiply" | "colorBurn" | "lighten" | "screen" | "colorDodge" | "linearDodge" | "overlay" | "softLight" | "hardLight" | "difference" | "exclusion";

export interface LayerData {
    name: string;
    file?: string;
    buffer?: Buffer;
    svg?: string;
    top?: number;
    left?: number;
    position?: number;
    debugMode?: boolean;
}

export default class Layer {

    /**
     * Initialize
     *
     * A promise for when this layer will be initialized
     */
    _initialize: Promise<void>;

    /**
     * Input Data
     *
     * This layer's input data
     */
    _inputData?: string | Buffer;

    /**
     * Document
     *
     * The document this layer is a part of
     */
    document?: Document;

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
        return this.document ? this.document.layers.findIndex((l: Layer) => l === this) : 0;
    }

    /**
     * Edits
     *
     * The edits for this layer
     */
    _edits: Edit[];

    /**
     * Opacity
     *
     * The opacity of this layer
     */
    opacity: number;

    /**
     * Blend Mode
     *
     * The blend mode of this layer
     */
    blendMode: BlendMode;

    /**
     * Debug Mode
     *
     * Whether or not this layer is in debug mode
     */
    debugMode: boolean;

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
    constructor(layerData: LayerData, document?: Document, inputData?: string | Buffer) {

        // Set document
        this.document = document;

        // Parse input data
        if (layerData.file) inputData = layerData.file;
        else if (layerData.buffer) inputData = layerData.buffer;
        else if (layerData.svg?.trim().startsWith("<svg")) inputData = Buffer.from(layerData.svg);

        // Set data
        this._inputData = inputData;
        this.name = layerData.name;
        this.top = layerData.top || 0;
        this.left = layerData.left || 0;
        this._edits = [];
        this.opacity = 100;
        this.blendMode = "normal";

        // Set debug mode
        this.setDebugMode(layerData.debugMode || false);

        // Initialize
        this._initialize = new Promise(async (resolve) => {

            // No input data ie. for shape layers
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

        // Add to document
        if (document) document.addLayer(this, layerData.position);
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
     * Align
     *
     * Align this layer to the document
     *
     * @param alignOptions Options for aligning this layer
     * @param alignOptions.top How this layer should be aligned vertically
     * Either 'start', 'center' (default), or 'end'
     * @param alignOptions.left How this layer should be aligned horizontally
     * Either 'start', 'center' (default), or 'end'
     * @param alignOptions.topOffset The offset for aligning this layer vertically
     * @param alignOptions.leftOffset The offset for aligning this layer horizontally
     * @param alignOptions.topOffsetUnits The units for offsetting this layer vertically
     * Either 'pixels' (default) or 'percent'
     * @param alignOptions.leftOffsetUnits The units for offsetting this layer horizontally
     * Either 'pixels' (default) or 'percent'
     *
     * @returns {Layer} This layer
     */
    align = (alignOptions?: AlignOptions): Layer => align(this, alignOptions);

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
     * Reflect
     *
     * Reflect this layer
     *
     * @param direction The direction to reflect this layer
     * Either 'vertical' or 'horizontal'
     *
     * @returns {Layer} This layer
     */
    reflect = (direction: "vertical" | "horizontal"): Layer => reflect(this, direction);

    /**
     * Set Opacity
     *
     * Set the opacity of this layer
     *
     * @param opacity The opacity to set this layer to
     *
     * @returns {Layer} This layer
     */
    setOpacity = (opacity: number): Layer => setOpacity(this, opacity);

    /**
     * Set Blend Mode
     *
     * Set the blend mode of this layer
     *
     * @param blendMode The blend mode to set this layer to
     *
     * @returns {Layer} This layer
     */
    setBlendMode = (blendMode?: BlendMode | null): Layer => setBlendMode(this, blendMode);

    /**
     * Hue
     *
     * Rotate the hue of this layer
     *
     * @param degrees The degrees to rotate this layer's hue by
     *
     * @returns {Layer} This layer
     */
    hue = (degrees: number): Layer => hue(this, degrees);

    /**
     * Saturation
     *
     * Adjust the saturation of this layer
     *
     * @param amount The amount to adjust this layer's saturation by
     * 0 grayscales the layer
     * 100 causes no change
     * 200 doubles the saturation
     *
     * @returns {Layer} This layer
     */
    saturation = (amount: number): Layer => saturation(this, amount);

    /**
     * Brightness
     *
     * Adjust the brightness of this layer
     *
     * @param amount The amount to adjust this layer's brightness by
     * 0 darkens the layer by a factor of 2
     * 100 causes no change
     * 200 doubles the brightness
     *
     * @returns {Layer} This layer
     */
    brightness = (amount: number): Layer => brightness(this, amount);

    /**
     * Invert
     *
     * Invert the colors of this layer
     *
     * @returns {Layer} This layer
     */
    invert = (): Layer => invert(this);

    /**
     * Blur
     *
     * Apply a Gaussian blur to this layer
     *
     * @param sigma The sigma used to blur this layer
     *
     * @returns {Layer} This layer
     */
    blur = (sigma: number): Layer => blur(this, sigma);

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

    /**
     * Remove
     *
     * Remove this layer from its document
     */
    remove = () => remove(this);

    /**
     * Export To
     *
     * Export this layer
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