import { parseColor, Color } from "../../color";
import { BaseLayer, Document, EllipseData, LAYER_TYPE_ELLIPSE, LAYER_TYPE_POLYGON, PolygonData } from "../../internal";
import setFill from "./setFill";
import setHeight from "./setHeight";
import setStroke from "./setStroke";
import setStrokeWidth from "./setStrokeWidth";
import setWidth from "./setWidth";

export type ShapeLayerType = typeof LAYER_TYPE_POLYGON | typeof LAYER_TYPE_ELLIPSE;

export interface ShapeData {
    width: number;
    height: number;
    fill?: Color;
    stroke?: Color;
    strokeWidth?: number;
}

export interface ShapeLayerData {
    name: string;
    left?: number;
    top?: number;
    position?: number;
    debugMode?: boolean;
}

export default class ShapeLayer extends BaseLayer {

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

    /**
     * Shape Layer
     *
     * @param document The document this layer is a part of
     * @param shapeLayerData Data for the layer
     * @param shapeLayerData.name The name of the layer
     * @param shapeLayerData.shape The data for the shape
     * @param shapeLayerData.shape.width The width of this shape
     * @param shapeLayerData.shape.height The height of this shape
     * @param shapeLayerData.shape.fill The color of this shape's fill
     * @param shapeLayerData.shape.stroke The color of this shape's stroke
     * @param shapeLayerData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param shapeLayerData.left The horizontal offset from the left to place this layer
     * @param shapeLayerData.top The vertical offset from the top to place this layer
     * @param shapeLayerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param shapeLayerData.debugMode Set to `true` to log debug info to the console
     */
    constructor(shapeLayerData: PolygonData | EllipseData, document?: Document) {

        // Super
        super(shapeLayerData, document);

        // Set data
        this.width = shapeLayerData.shape.width;
        this.height = shapeLayerData.shape.height;
        if (shapeLayerData.shape.fill) this.fill = parseColor(shapeLayerData.shape.fill);
        if (shapeLayerData.shape.stroke) this.stroke = parseColor(shapeLayerData.shape.stroke);
        this.strokeWidth = shapeLayerData.shape.strokeWidth;
    }

    /**
     * Set Width
     *
     * Set the width of this shape layer
     *
     * @param width The width of this shape
     *
     * @returns {ShapeLayer} This shape layer
     */
    setWidth(width: number): ShapeLayer {
        return setWidth(this, width);
    }

    /**
     * Set Height
     *
     * Set the height of this shape layer
     *
     * @param height The height of this shape
     *
     * @returns {ShapeLayer} This shape layer
     */
    setHeight(height: number): ShapeLayer {
        return setHeight(this, height);
    }

    /**
     * Set Fill
     *
     * Set the fill of this shape layer
     *
     * @param fill The color of this shape's fill
     *
     * @returns {ShapeLayer} This shape layer
     */
    setFill(fill?: Color): ShapeLayer {
        return setFill(this, fill);
    }

    /**
     * Set Stroke
     *
     * Set the stroke of this shape layer
     *
     * @param stroke The color of this shape's stroke
     *
     * @returns {ShapeLayer} This shape layer
     */
    setStroke(stroke?: Color): ShapeLayer {
        return setStroke(this, stroke);
    }

    /**
     * Set Stroke Width
     *
     * Set the stroke width of this shape layer
     *
     * @param strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {ShapeLayer} This shape layer
     */
    setStrokeWidth(strokeWidth?: number): ShapeLayer {
        return setStrokeWidth(this, strokeWidth);
    }
}