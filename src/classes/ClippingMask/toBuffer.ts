import sharp from "sharp";
import { ClippingMask } from "../../internal";
import { ExportMetadata } from "../BaseLayer/exportTo";

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
                left: clippingMask.mask.left,
                top: clippingMask.mask.top
            },
            {
                input: source.data,
                left: clippingMask.source.left,
                top: clippingMask.source.top,
                blend: "in"
            }
        ])
        .toFormat("png")
        .toBuffer();

    // Return buffer
    return buffer;
}