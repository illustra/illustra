import sharp from "sharp";
import { parseColor } from "../../color";
import { DEFAULT_FONT_SIZE, TextData } from "../../internal";

export default async function textBuffer(textData: TextData): Promise<Buffer> {

    // Parse text data
    if (!textData.fontSize) textData.fontSize = DEFAULT_FONT_SIZE;
    textData.color = parseColor(textData.color || "#000000");
    if (!textData.maxWidth) textData.maxWidth = 400;

    // Get svg code
    const svgCode: string = `
        <svg viewBox="0 0 ${textData.maxWidth} ${textData.fontSize * 1.5}" xmlns="http://www.w3.org/2000/svg">
            <text y="${textData.fontSize}"${textData.font ? ` font-family="${textData.font}"` : ""} font-size="${textData.fontSize}px"${textData.fontWeight ? ` font-weight="${textData.fontWeight}"` : ""} fill="${textData.color}">${textData.text}</text>
        </svg>
    `;

    // Create image
    const image: Buffer = Buffer.from(svgCode);

    // Trim transparency
    const buffer: Buffer = await sharp(image)
        .trim()
        .toFormat("png")
        .toBuffer();

    // Return buffer
    return buffer;
}