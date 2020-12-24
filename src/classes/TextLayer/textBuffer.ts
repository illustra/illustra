import canvas from "canvas";
import sharp from "sharp";
import textToImage, { GenerateOptions } from "text-to-image";
import { parseColor } from "../../color";
import { DEFAULT_FONT_SIZE, TextData } from "../../internal";

export default async function textBuffer(textData: TextData): Promise<Buffer> {

    // Default font size
    if (!textData.fontSize) textData.fontSize = DEFAULT_FONT_SIZE;

    // Register font
    let fontName: string | undefined = textData.font;
    if ((textData.font) && (textData.font.includes("."))) {

        // Generate font name
        fontName = Buffer.from(textData.font).toString("base64");

        // Register font
        canvas.registerFont(textData.font, { family: fontName });
    }

    // Define options
    const options: GenerateOptions = { bgColor: "#00000000" };
    if (fontName) options.fontFamily = `"${fontName}"`;
    options.fontSize = textData.fontSize;
    if (textData.fontWeight) options.fontWeight = textData.fontWeight;
    options.textAlign = textData.textAlign || "left";
    options.textColor = parseColor(textData.color || "#000000");
    options.lineHeight = textData.lineHeight || (textData.fontSize * 1.5);
    if (textData.maxWidth) options.maxWidth = textData.maxWidth;

    // Create image
    // data:image/png;base64,AAA...
    const imageData: string = await textToImage.generate(textData.text, options);

    // Parse image data by removing `data:image/png;base64,`
    const image: string = imageData.split(",").slice(1).join(",");

    // Create text image
    const textImage: Buffer = Buffer.from(image, "base64");

    // Trim transparency
    const buffer: Buffer = await sharp(textImage)
        .trim()
        .toFormat("png")
        .toBuffer();

    // Return buffer
    return buffer;
}