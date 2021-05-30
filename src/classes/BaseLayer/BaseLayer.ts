import debug from "../../debug";
import { ClippingMask, Document, Ellipse, ILAAsset, ILAData, Layer, Polygon, TextLayer } from "../../internal";
import align, { AlignOptions } from "./align";
import blur from "./blur";
import brightness from "./brightness";
import circularMask from "./circularMask";
import duplicate from "./duplicate";
import exportTo, { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "./exportTo";
import grayscale from "./grayscale";
import hue from "./hue";
import exportILA from "./ila/exportILA";
import getILAData from "./ila/getILAData";
import importILA from "./ila/importILA";
import invert from "./invert";
import move from "./move";
import rasterize from "./rasterize";
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

export type AnyLayer = BaseLayer | Layer | TextLayer | Polygon | Ellipse | ClippingMask;

export type LayerType = typeof LAYER_TYPE_LAYER | typeof LAYER_TYPE_TEXT | typeof LAYER_TYPE_POLYGON | typeof LAYER_TYPE_ELLIPSE | typeof LAYER_TYPE_CLIPPING_MASK;
export const LAYER_TYPE_LAYER = 0;
export const LAYER_TYPE_TEXT = 1;
export const LAYER_TYPE_POLYGON = 2;
export const LAYER_TYPE_ELLIPSE = 3;
export const LAYER_TYPE_CLIPPING_MASK = 4;

export interface BaseEdit {
    id: number;
}

export interface Rotate extends BaseEdit {
    type: "rotate";
    degrees: number;
}

export interface Resize extends BaseEdit {
    type: "resize";
    width?: number;
    height?: number;
}

export interface Reflect extends BaseEdit {
    type: "reflect";
    direction: ReflectDirection;
}

export interface Hue extends BaseEdit {
    type: "hue";
    degrees: number;
}

export interface Saturation extends BaseEdit {
    type: "saturation";
    amount: number;
}

export interface Brightness extends BaseEdit {
    type: "brightness";
    amount: number;
}

export interface Invert extends BaseEdit {
    type: "invert";
}

export interface Blur extends BaseEdit {
    type: "blur";
    sigma: number;
}

export type Edit = Rotate | Resize | Reflect | Hue | Saturation | Brightness | Invert | Blur;

export type ReflectDirection = "vertical" | "horizontal";

export type BlendMode = "normal" | "darken" | "multiply" | "colorBurn" | "lighten" | "screen" | "colorDodge" | "linearDodge" | "overlay" | "softLight" | "hardLight" | "difference" | "exclusion";
export const BLEND_MODES: BlendMode[] = ["normal", "darken", "multiply", "colorBurn", "lighten", "screen", "colorDodge", "linearDodge", "overlay", "softLight", "hardLight", "difference", "exclusion"];

export interface BaseLayerData {
    name: string;
    left?: number;
    top?: number;
    position?: number;
    debugMode?: boolean;
}

export default class BaseLayer {

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
     * Type
     *
     * This layer's type
     */
    type: LayerType;

    /**
     * Left
     *
     * The horizontal offset from the left to place this layer
     */
    left: number;

    /**
     * Top
     *
     * The vertical offset from the top to place this layer
     */
    top: number;

    /**
     * Position
     *
     * This layer's position
     */
    get position(): number {
        return this.document ? this.document.layers.findIndex((l: BaseLayer) => l === this) : 0;
    }

    /**
     * Edits
     *
     * The edits for this layer
     */
    edits: Edit[];

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
     * Last Edit ID
     *
     * The last edit ID for this layer
     *
     * @private
     */
    _lastEditID: number;

    /**
     * Base Layer
     *
     * @param document The document this layer is a part of
     * @param baseLayerData Data for the layer
     * @param baseLayerData.name The name of the layer
     * @param baseLayerData.left The horizontal offset from the left to place this layer
     * @param baseLayerData.top The vertical offset from the top to place this layer
     * @param baseLayerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param baseLayerData.debugMode Set to `true` to log debug info to the console
     */
    constructor(baseLayerData: BaseLayerData, document?: Document) {

        // Set document
        this.document = document;

        // Set data
        this.name = baseLayerData.name;
        this.left = baseLayerData.left || 0;
        this.top = baseLayerData.top || 0;
        this.edits = [];
        this.opacity = 100;
        this.blendMode = "normal";
        this._lastEditID = 0;

        // Set debug mode
        this.setDebugMode(baseLayerData.debugMode || false);

        // Add to document
        if (document) document.addLayer(this, baseLayerData.position);
    }

    /**
     * Set Name
     *
     * Set the layer's name
     *
     * @param name The name
     */
    setName(name: string) {
        this.name = name;
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
     * @returns {this} The new layer
     */
    duplicate(name?: string, position?: number, debugMode?: boolean): Promise<this> {
        return duplicate(this, name, position, debugMode);
    }

    /**
     * Move
     *
     * Moves this layer to a specified position
     *
     * @param position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param relative Whether or not the `position` is relative to the layer's current position
     *
     * @returns {number} The layer's new position
     */
    move(position: number, relative?: boolean): number {
        return move(this, position, relative);
    }

    /**
     * Translate
     *
     * Translate this layer to a specified position
     *
     * @param left The horizontal offset from the left to place this layer
     * @param top The vertical offset from the top to place this layer
     *
     * @returns {this} This layer
     */
    translate(left?: number, top?: number): this {
        return translate(this, left, top);
    }

    /**
     * Translate By
     *
     * Translate this layer relative to its current location
     *
     * @param x The amount of pixels to move this layer horizontally
     * @param y The amount of pixels to move this layer vertically
     *
     * @returns {this} This layer
     */
    translateBy(x?: number, y?: number): this {
        return translateBy(this, x, y);
    }

    /**
     * Align
     *
     * Align this layer to the document
     *
     * @param alignOptions Options for aligning this layer
     * @param alignOptions.left How this layer should be aligned horizontally
     * Either 'start', 'center' (default), or 'end'
     * @param alignOptions.top How this layer should be aligned vertically
     * Either 'start', 'center' (default), or 'end'
     * @param alignOptions.leftOffset The offset for aligning this layer horizontally
     * @param alignOptions.topOffset The offset for aligning this layer vertically
     * @param alignOptions.leftOffsetUnits The units for offsetting this layer horizontally
     * Either 'pixels' (default) or 'percent'
     * @param alignOptions.topOffsetUnits The units for offsetting this layer vertically
     * Either 'pixels' (default) or 'percent'
     *
     * @returns {this} This layer
     */
    align(alignOptions?: AlignOptions): this {
        return align(this, alignOptions);
    }

    /**
     * Rotate
     *
     * Rotate this layer
     *
     * @param degrees The amount of degrees to rotate this layer
     *
     * @returns {number} The edit's ID
     */
    rotate(degrees: number): number {
        return rotate(this, degrees);
    }

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
     * @returns {number} The edit's ID
     */
    resize(width?: number | null, height?: number | null): number {
        return resize(this, width, height);
    }

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
     * @returns {number} The edit's ID
     */
    resizeBy(width?: number | null, height?: number | null, scale?: boolean): number {
        return resizeBy(this, width, height, scale);
    }

    /**
     * Reflect
     *
     * Reflect this layer
     *
     * @param direction The direction to reflect this layer
     * Either 'vertical' or 'horizontal'
     *
     * @returns {number} The edit's ID
     */
    reflect(direction: ReflectDirection): number {
        return reflect(this, direction);
    }

    /**
     * Set Opacity
     *
     * Set the opacity of this layer
     *
     * @param opacity The opacity to set this layer to
     *
     * @returns {this} This layer
     */
    setOpacity(opacity: number): this {
        return setOpacity(this, opacity);
    }

    /**
     * Set Blend Mode
     *
     * Set the blend mode of this layer
     *
     * @param blendMode The blend mode to set this layer to
     *
     * @returns {this} This layer
     */
    setBlendMode(blendMode?: BlendMode | null): this {
        return setBlendMode(this, blendMode);
    }

    /**
     * Hue
     *
     * Rotate the hue of this layer
     *
     * @param degrees The degrees to rotate this layer's hue by
     *
     * @returns {number} The edit's ID
     */
    hue(degrees: number): number {
        return hue(this, degrees);
    }

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
     * @returns {number} The edit's ID
     */
    saturation(amount: number): number {
        return saturation(this, amount);
    }

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
     * @returns {number} The edit's ID
     */
    brightness(amount: number): number {
        return brightness(this, amount);
    }

    /**
     * Grayscale
     *
     * Grayscale this layer
     *
     * @returns {number} The edit's ID
     */
    grayscale(): number {
        return grayscale(this);
    }

    /**
     * Invert
     *
     * Invert the colors of this layer
     *
     * @returns {number} The edit's ID
     */
    invert(): number {
        return invert(this);
    }

    /**
     * Blur
     *
     * Apply a Gaussian blur to this layer
     *
     * @param sigma The sigma used to blur this layer
     *
     * @returns {number} The edit's ID
     */
    blur(sigma: number): number {
        return blur(this, sigma);
    }

    /**
     * Circular Mask
     *
     * Add a circular mask to this layer
     *
     * @param name The name of the clipping mask
     * @param keepSource Pass `true` to keep this layer in addition to the `ClippingMask`
     * Omit or pass `false` to remove this layer from its document
     *
     * @returns {ClippingMask} The clipping mask
     */
    circularMask(name: string, keepSource?: boolean): ClippingMask {
        return circularMask(this, name, keepSource);
    }

    /**
     * Remove
     *
     * Remove this layer from its document
     */
    remove() {
        remove(this);
    }

    /**
     * Rasterize
     *
     * Rasterize this layer
     *
     * @returns {Layer} The clipping mask
     */
    rasterize(): Promise<Layer> {
        return rasterize(this);
    }

    /**
     * Export To
     *
     * Export this layer
     *
     * @param format The format to export in - 'png' or 'jpeg'
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param pathOrWithMetadata The path to write the file to if the `exportType` is 'file' or whether or not to return metadata if the `exportType` is 'buffer'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer | ExportMetadata} `undefined` if the `exportType` is 'file', `Buffer` if the `exportType` is 'buffer' and `pathOrWithMetadata` is false, or `ExportMetadata` if the `exportType` is 'buffer' and `pathOrWithMetadata` is true
     */
    exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {
        return exportTo(this, format, exportType, pathOrWithMetadata);
    }

    /**
     * Export ILA
     *
     * Export this layer as an ILA (Illustra Layer) file
     *
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param path The path to write the file to if the `exportType` is 'file'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer} `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
     */
    exportILA<ExportType extends ExportTypes, Path extends string>(exportType: ExportType, path?: Path): Promise<Output<ExportType, Path>> {
        return exportILA(this, exportType, path);
    }

    /**
     * Import ILA
     *
     * Import a layer from an ILA (Illustra Layer) file
     *
     * @param pathOrBuffer The path or buffer to read the file from
     * @param assetsDirectory The path to a directory to store imported assets in
     * Omit to store them as an image buffer in memory
     *
     * @returns {AnyLayer} The layer
     */
    static importILA(pathOrBuffer: string | Buffer, assetsDirectory?: string): Promise<AnyLayer> {
        return importILA(pathOrBuffer, assetsDirectory);
    }

    /**
     * Get ILA Data
     *
     * Get data to create an ILA file from this layer
     *
     * @private
     * @param assets An array to add assets to
     *
     * @returns {ILAData} The ILA data
     */
    _getILAData(assets: ILAAsset[]): ILAData {
        return getILAData(this, assets);
    }

    /**
     * Set Debug Mode
     *
     * @param debugMode Set to `true` to log debug info to the console
     */
    setDebugMode(debugMode: boolean) {
        this.debugMode = debugMode;
    }

    /**
     * Debug
     *
     * Log debug info
     *
     * @private
     * @param info Debug info to log
     */
    _debug(info: string) {
        debug(info, this);
    }
}