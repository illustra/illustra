import { ClippingMask, ClippingMaskData, Document } from "../../internal";

export default function createClippingMask(document: Document, clippingMaskData: ClippingMaskData): ClippingMask {

    // Debug
    document._debug(`Creating clipping mask '${clippingMaskData.name}' at position ${clippingMaskData.position || document.layers.length}`);

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(clippingMaskData, document);

    // Return created clipping mask
    return clippingMask;
}