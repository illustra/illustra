import { BlendMode, Edit, LayerType, LAYER_TYPE_CLIPPING_MASK, LAYER_TYPE_ELLIPSE, LAYER_TYPE_LAYER, LAYER_TYPE_POLYGON, LAYER_TYPE_TEXT, ShapeLayerType } from "../../../internal";

/**
 * ILA Data
 *
 * An ILA file's metadata
 */
export type ILAData = ILALayerData | ILATextData | ILAPolygonData | ILAEllipseData | ILAClippingMaskData;

/**
 * ILA Base Data
 *
 * An ILA file's base metadata
 */
export interface ILABaseData {

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
}

/**
 * ILA Layer Data
 *
 * An ILA file's metadata for regular layers
 */
export interface ILALayerData extends ILABaseData {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_LAYER;

    /**
     * Input Image ID
     *
     * The ID of the input data's image
     */
    inputImageID: number;
}

/**
 * ILA Text Data
 *
 * An ILA file's metadata for text layers
 */
export interface ILATextData extends ILABaseData {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_TEXT;

    /**
     * Text
     *
     * The text
     */
    text: string;

    /**
     * Font
     *
     * The font to use
     */
    font?: string;

    /**
     * Font Size
     *
     * The font size to use
     */
    fontSize: number;

    /**
     * Font Weight
     *
     * The font weight to use
     */
    fontWeight?: string;

    /**
     * Color
     *
     * The color of the text
     */
    color: string;

    /**
     * Max Width
     *
     * The max width of the text
     */
    maxWidth: number;
}

/**
 * ILA Shape Data
 *
 * An ILA file's metadata for shape layers
 */
export interface ILAShapeData extends ILABaseData {

    /**
     * Type
     *
     * This layer's type
     */
    type: ShapeLayerType;

    /**
     * Width
     *
     * The width of this shape layer
     */
    width: number;

    /**
     * Height
     *
     * The height of this shape layer
     */
    height: number;

    /**
     * Fill
     *
     * The color of this shape's fill
     */
    fill?: string;

    /**
     * Stroke
     *
     * The color of this shape's stroke
     */
    stroke?: string;

    /**
     * Stroke Width
     *
     * The width of this shape's stroke in pixels
     */
    strokeWidth?: number;
}

/**
 * ILA Polygon Data
 *
 * An ILA file's metadata for polygon layers
 */
export interface ILAPolygonData extends ILAShapeData {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_POLYGON;

    /**
     * Sides
     *
     * The number of sides this shape has
     */
    sides: number;
}

/**
 * ILA Ellipse Data
 *
 * An ILA file's metadata for ellipse layers
 */
export interface ILAEllipseData extends ILAShapeData {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_ELLIPSE;
}

/**
 * ILA Clipping Mask Data
 *
 * An ILA file's metadata for clipping mask layers
 */
export interface ILAClippingMaskData extends ILABaseData {

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
    mask: ILAData;

    /**
     * Source
     *
     * The layer that will get clipped to the mask
     */
    source: ILAData;
}

/**
 * ILA Asset
 *
 * An asset
 */
export interface ILAAsset {

    /**
     * Image
     *
     * The image
     */
    image: string | Buffer;

    /**
     * SVG
     *
     * Whether or not the image is an SVG buffer
     */
    svg: boolean;
}