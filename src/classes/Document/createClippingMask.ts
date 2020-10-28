import ClippingMask, { ClippingMaskData } from "../ClippingMask/ClippingMask";
import Document from "./Document";

export default function createClippingMask(document: Document, clippingMaskData: ClippingMaskData): ClippingMask {

    // Debug
    document._debug(`Creating clipping mask '${clippingMaskData.name}' at position ${clippingMaskData.position || document.layers.length}`);

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(clippingMaskData, document);

    // Return created clipping mask
    return clippingMask;
}