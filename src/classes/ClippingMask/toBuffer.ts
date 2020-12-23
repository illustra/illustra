import sharp from "sharp";
import { ExportMetadata } from "../BaseLayer/exportTo";
import ClippingMask from "./ClippingMask";

export default async function toBuffer(clippingMask: ClippingMask): Promise<Buffer> {

    // Export mask
    const mask: ExportMetadata = await clippingMask.mask.exportTo("png", "buffer", true);

    // Export source
    const source: ExportMetadata = await clippingMask.source.exportTo("png", "buffer", true);

    // Create image
    const buffer: Buffer = await sharp({
        create: {
            width: Math.max(clippingMask.mask.left + mask.width, clippingMask.source.left + source.width),
            height: Math.max(clippingMask.mask.top + mask.height, clippingMask.source.top + source.height),
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
        .composite([
            {
                input: mask.data,
                top: clippingMask.mask.top,
                left: clippingMask.mask.left
            },
            {
                input: source.data,
                top: clippingMask.source.top,
                left: clippingMask.source.left,
                blend: "in"
            }
        ])
        .toFormat("png")
        .toBuffer();

    // Return buffer
    return buffer;
}