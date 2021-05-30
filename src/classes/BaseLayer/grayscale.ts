import { AnyLayer } from "../../internal";

export default function grayscale(layer: AnyLayer): number {

    // Debug
    layer._debug("Grayscaling");

    // Adjust saturation
    const editID: number = layer.saturation(0);

    // Return
    return editID;
}