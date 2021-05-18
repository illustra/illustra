import sharp from "sharp";
import { Layer } from "../../internal";

export default async function setImage(layer: Layer, image: string | Buffer): Promise<Layer> {

    // Debug
    layer._debug("Setting image");

    // Parse image
    if ((typeof image === "string") && (image.trim().startsWith("<svg"))) layer.image = Buffer.from(image);
    else layer.image = image;

    // Set SVG
    layer._svg = Boolean(typeof image === "string" && image.trim().startsWith("<svg"));

    // Create sharp canvas
    const canvas: sharp.Sharp = sharp(layer.image);

    // Get metadata
    const metadata: sharp.Metadata = await canvas.metadata();

    // Set width and height
    layer.width = metadata.width || 0;
    layer.height = metadata.height || 0;

    // Return
    return layer;
}