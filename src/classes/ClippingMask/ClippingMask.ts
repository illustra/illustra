import Mask from "../Mask/Mask";
import toBuffer from "./toBuffer";

export default class ClippingMask extends Mask {

    /**
     * To Buffer
     *
     * Creates an image buffer from this clipping mask
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer = (): Promise<Buffer> => toBuffer(this);
}