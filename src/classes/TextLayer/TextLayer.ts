import { parseColor, Color } from "../../color";
import Document from "../Document/Document";
import Layer from "../Layer/Layer";
import textBuffer from "./textBuffer";

type TextAlign = "left" | "center" | "right" | "justify";

export interface TextData {
    text: string;
    font?: string;
    fontSize?: number;
    fontWeight?: string;
    textAlign?: TextAlign;
    color?: Color;
    lineHeight?: number;
    maxWidth?: number;
}

export interface TextLayerData {
    name: string;
    text: TextData;
    top?: number;
    left?: number;
    position?: number;
    debugMode?: boolean;
}

export default class TextLayer extends Layer {

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
     * Text Align
     *
     * How the text should be aligned
     */
    textAlign?: TextAlign;

    /**
     * Color
     *
     * The color of the text
     */
    color?: string;

    /**
     * Line Height
     *
     * The line height to use
     */
    lineHeight?: number;

    /**
     * Max Width
     *
     * The max width of the text
     */
    maxWidth: number;

    /**
     * Text Layer
     *
     * @param document The document this layer is a part of
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
     */
    constructor(document: Document, textLayerData: TextLayerData) {

        // Super
        super(document, textLayerData);

        // Set data
        this.text = textLayerData.text.text;
        this.font = textLayerData.text.font;
        this.fontSize = textLayerData.text.fontSize || 24;
        this.fontWeight = textLayerData.text.fontWeight;
        this.textAlign = textLayerData.text.textAlign;
        if (textLayerData.text.color) this.color = parseColor(textLayerData.text.color);
        this.lineHeight = textLayerData.text.lineHeight;
        this.maxWidth = textLayerData.text.maxWidth || document.width;
    }

    /**
     * Text Buffer
     *
     * Creates an image buffer from `TextData`
     *
     * @param textData The data for the text
     * @param textData.text The text
     * @param textData.font The font to use
     * @param textData.color The color of the text
     *
     * @returns {Buffer} The image buffer
     */
    static textBuffer = (textData: TextData): Promise<Buffer> => textBuffer(textData);

    /**
     * To Buffer
     *
     * Creates an image buffer from this text layer
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Promise<Buffer> => TextLayer.textBuffer(this);
}