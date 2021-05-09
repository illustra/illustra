import { Document, LAYER_TYPE_POLYGON, ShapeData, ShapeLayer, ShapeLayerData } from "../../internal";
import polygonSVG from "./polygonSVG";
import setSides from "./setSides";

export interface PolygonShapeData extends ShapeData {
    sides: number;
}

export interface PolygonData extends ShapeLayerData {
    shape: PolygonShapeData;
}

export default class Polygon extends ShapeLayer {

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

    /**
     * Polygon
     *
     * @param document The document this layer is a part of
     * @param polygonData Data for the layer
     * @param polygonData.name The name of the layer
     * @param polygonData.shape The data for the shape
     * @param polygonData.shape.width The width of this shape
     * @param polygonData.shape.height The height of this shape
     * @param polygonData.shape.sides The number of sides this polygon has
     * @param polygonData.shape.fill The color of this shape's fill
     * @param polygonData.shape.stroke The color of this shape's stroke
     * @param polygonData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param polygonData.left The horizontal offset from the left to place this layer
     * @param polygonData.top The vertical offset from the top to place this layer
     * @param polygonData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param polygonData.debugMode Set to `true` to log debug info to the console
     */
    constructor(polygonData: PolygonData, document?: Document) {

        // Super
        super(polygonData, document);

        // Set data
        this.type = LAYER_TYPE_POLYGON;
        this.sides = polygonData.shape.sides;
    }

    /**
     * Set Sides
     *
     * Set the sides of this polygon
     *
     * @param sides The number of sides this polygon has
     *
     * @returns {Polygon} This polygon
     */
    setSides = (sides: number): Polygon => setSides(this, sides);

    /**
     * Polygon SVG
     *
     * Creates an SVG string from `PolygonShapeData`
     *
     * @param polygonShapeData Data for the shape
     * @param polygonShapeData.width The width of this shape
     * @param polygonShapeData.height The height of this shape
     * @param polygonShapeData.sides The number of sides this polygon has
     * @param polygonShapeData.fill The color of this shape's fill
     * @param polygonShapeData.stroke The color of this shape's stroke
     * @param polygonShapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {string} The SVG string
     */
    static polygonSVG = (polygonShapeData: PolygonShapeData): string => polygonSVG(polygonShapeData);

    /**
     * To SVG
     *
     * Creates an SVG string from this polygon
     *
     * @returns {string} The SVG string
     */
    toSVG = (): string => Polygon.polygonSVG(this);

    /**
     * Polygon Buffer
     *
     * Creates an image buffer from `PolygonShapeData`
     *
     * @param polygonShapeData Data for the shape
     * @param polygonShapeData.width The width of this shape
     * @param polygonShapeData.height The height of this shape
     * @param polygonShapeData.sides The number of sides this polygon has
     * @param polygonShapeData.fill The color of this shape's fill
     * @param polygonShapeData.stroke The color of this shape's stroke
     * @param polygonShapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {Buffer} The image buffer
     */
    static polygonBuffer = (polygonShapeData: PolygonShapeData): Buffer => {

        // Get svg code
        const svgCode: string = Polygon.polygonSVG(polygonShapeData);

        // Return buffer
        return Buffer.from(svgCode);
    }

    /**
     * To Buffer
     *
     * Creates an image buffer from this polygon
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Buffer => Polygon.polygonBuffer(this);
}