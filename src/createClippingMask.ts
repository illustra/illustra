import ClippingMask from "./classes/ClippingMask/ClippingMask";
import { MaskData } from "./classes/Mask/Mask";

export default function createClippingMask(maskData: MaskData): ClippingMask {

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(maskData);

    // Return created clipping mask
    return clippingMask;
}