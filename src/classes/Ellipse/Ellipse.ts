import { Document, ShapeData, ShapeLayer, ShapeLayerData } from "../../internal";
import ellipseSVG from "./ellipseSVG";

export type EllipseShapeData = ShapeData;

export interface EllipseData extends ShapeLayerData {
    shape: EllipseShapeData;
}

export default class Ellipse extends ShapeLayer {

    /**
     * Ellipse
     *
     * @param document The document this layer is a part of
     * @param ellipseData Data for the layer
     * @param ellipseData.name The name of the layer
     * @param ellipseData.shape The data for the shape
     * @param ellipseData.shape.width The width of this shape
     * @param ellipseData.shape.height The height of this shape
     * @param ellipseData.shape.fill The color of this shape's fill
     * @param ellipseData.shape.stroke The color of this shape's stroke
     * @param ellipseData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param ellipseData.top The vertical offset from the top to place this layer
     * @param ellipseData.left The horizontal offset from the left to place this layer
     * @param ellipseData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param ellipseData.debugMode Set to `true` to log debug info to the console
     */
    constructor(ellipseData: EllipseData, document?: Document) {

        // Super
        super(ellipseData, document);
    }

    /**
     * Ellipse SVG
     *
     * Creates an SVG string from `EllipseShapeData`
     *
     * @param ellipseShapeData Data for the shape
     * @param ellipseShapeData.width The width of this shape
     * @param ellipseShapeData.height The height of this shape
     * @param ellipseShapeData.fill The color of this shape's fill
     * @param ellipseShapeData.stroke The color of this shape's stroke
     * @param ellipseShapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {string} The SVG string
     */
    static ellipseSVG = (ellipseShapeData: EllipseShapeData): string => ellipseSVG(ellipseShapeData);

    /**
     * To SVG
     *
     * Creates an SVG string from this ellipse
     *
     * @returns {string} The SVG string
     */
    toSVG = (): string => Ellipse.ellipseSVG(this);

    /**
     * Ellipse Buffer
     *
     * Creates an image buffer from `EllipseShapeData`
     *
     * @param ellipseShapeData Data for the shape
     * @param ellipseShapeData.width The width of this shape
     * @param ellipseShapeData.height The height of this shape
     * @param ellipseShapeData.fill The color of this shape's fill
     * @param ellipseShapeData.stroke The color of this shape's stroke
     * @param ellipseShapeData.strokeWidth The width of this shape's stroke in pixels
     *
     * @returns {Buffer} The image buffer
     */
    static ellipseBuffer = (ellipseShapeData: EllipseShapeData): Buffer => {

        // Get svg code
        const svgCode: string = Ellipse.ellipseSVG(ellipseShapeData);

        // Return buffer
        return Buffer.from(svgCode);
    }

    /**
     * To Buffer
     *
     * Creates an image buffer from this ellipse
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Buffer => Ellipse.ellipseBuffer(this);
}