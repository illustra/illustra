import { ILAData } from "../../../internal";

/**
 * ILD Data
 *
 * An ILD file's metadata
 */
export interface ILDData {

    /**
     * Name
     *
     * The name of this document
     */
    name: string;

    /**
     * Width
     *
     * The width of this document
     */
    width: number;

    /**
     * Height
     *
     * The height of this document
     */
    height: number;

    /**
     * Layers
     *
     * This document's layers
     * The lower the layer's index, the lower the layer is in the stack
     */
    layers: ILAData[];
}