import { parseColor, Color } from "../../color";
import Document from "../Document/Document";
import Layer from "../Layer/Layer";
import shapeSVG from "./shapeSVG";
import toShapeData from "./toShapeData";

type Shape = "polygon" | "ellipse";

interface CommonShapeData {
    width: number;
    height: number;
    fill?: Color;
    stroke?: Color;
    strokeWidth?: number;
}

interface PolygonData extends CommonShapeData {
    type: "polygon";
    sides: number;
    cornerRadius?: number;
}

interface EllipseData extends CommonShapeData {
    type: "ellipse";
}

export type ShapeData = PolygonData | EllipseData;

export interface ShapeLayerData {
    name: string;
    shape: ShapeData;
    top?: number;
    left?: number;
    position?: number;
    debugMode?: boolean;
}

export default class ShapeLayer extends Layer {

    /**
     * Type
     *
     * The type of shape
     */
    type: Shape;

    /**
     * Sides
     *
     * The number of sides this shape has if it's a polygon
     */
    sides?: number;

    /**
     * Corner Radius
     *
     * The radius of this shape's corners if it's a polygon
     */
    cornerRadius?: number;

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
     */
    constructor(shapeLayerData: ShapeLayerData, document?: Document) {

        // Super
        super(shapeLayerData, document);

        // Set data
        this.type = shapeLayerData.shape.type;
        this.width = shapeLayerData.shape.width;
        this.height = shapeLayerData.shape.height;
        if (shapeLayerData.shape.type === "polygon") this.sides = shapeLayerData.shape.sides;
        if (shapeLayerData.shape.type === "polygon") this.cornerRadius = shapeLayerData.shape.cornerRadius;
        if (shapeLayerData.shape.fill) this.fill = parseColor(shapeLayerData.shape.fill);
        if (shapeLayerData.shape.stroke) this.stroke = parseColor(shapeLayerData.shape.stroke);
        this.strokeWidth = shapeLayerData.shape.strokeWidth;
    }

    /**
     * To Shape Data
     *
     * Creates a `ShapeData` object from this shape layer
     *
     * @returns {ShapeData} The `ShapeData` object
     */
    _toShapeData = (): ShapeData => toShapeData(this);

    /**
     * Shape SVG
     *
     * Creates an SVG string from `ShapeData`
     *
     * @param shapeData Data for the shape
     * @param shapeData.type The type of shape
     * Either 'polygon' or 'ellipse'
     * @param shapeData.width The width of this shape
     * @param shapeData.height The height of this shape
     * @param shapeData.sides The number of sides this shape has if it's a polygon
     * @param shapeData.cornerRadius The radius of this shape's corners if it's a polygon
     * @param shapeData.fill The color of this shape's fill
     * @param shapeData.stroke The color of this shape's stroke
     * @param shapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {string} The SVG string
     */
    static shapeSVG = (shapeData: ShapeData): string => shapeSVG(shapeData);

    /**
     * To SVG
     *
     * Creates an SVG string from this shape layer
     *
     * @returns {string} The SVG string
     */
    toSVG = (): string => ShapeLayer.shapeSVG(this._toShapeData());

    /**
     * Shape Buffer
     *
     * Creates an image buffer from `ShapeData`
     *
     * @param shapeData Data for the shape
     * @param shapeData.type The type of shape
     * Either 'polygon' or 'ellipse'
     * @param shapeData.width The width of this shape
     * @param shapeData.height The height of this shape
     * @param shapeData.sides The number of sides this shape has if it's a polygon
     * @param shapeData.cornerRadius The radius of this shape's corners if it's a polygon
     * @param shapeData.fill The color of this shape's fill
     * @param shapeData.stroke The color of this shape's stroke
     * @param shapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {Buffer} The image buffer
     */
    static shapeBuffer = (shapeData: ShapeData): Buffer => {

        // Get svg code
        const svgCode: string = ShapeLayer.shapeSVG(shapeData);

        // Return buffer
        return Buffer.from(svgCode);
    }

    /**
     * To Buffer
     *
     * Creates an image buffer from this shape layer
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Buffer => ShapeLayer.shapeBuffer(this._toShapeData());
}