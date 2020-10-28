import ClippingMask, { ClippingMaskData } from "./classes/ClippingMask/ClippingMask";

export default function createClippingMask(clippingMaskData: ClippingMaskData): ClippingMask {

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(clippingMaskData);

    // Return created clipping mask
    return clippingMask;
}