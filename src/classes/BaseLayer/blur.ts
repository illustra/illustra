import { AnyLayer } from "../../internal";

export default function blur(layer: AnyLayer, sigma: number): number {

    // Debug
    layer._debug(`Blurring with a sigma of ${sigma}`);

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "blur",
        sigma
    });

    // Return
    return layer._lastEditID;
}