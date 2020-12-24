import { ClippingMask, ClippingMaskData } from "./internal";

export default function createClippingMask(clippingMaskData: ClippingMaskData): ClippingMask {

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(clippingMaskData);

    // Return created clipping mask
    return clippingMask;
}