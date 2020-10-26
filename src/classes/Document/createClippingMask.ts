import ClippingMask from "../ClippingMask/ClippingMask";
import { MaskData } from "../Mask/Mask";
import Document from "./Document";

export default function createClippingMask(document: Document, maskData: MaskData): ClippingMask {

    // Debug
    document._debug(`Creating clipping mask '${maskData.name}' at position ${maskData.position || document.layers.length}`);

    // Create clipping mask
    const clippingMask: ClippingMask = new ClippingMask(maskData, document);

    // Return created clipping mask
    return clippingMask;
}