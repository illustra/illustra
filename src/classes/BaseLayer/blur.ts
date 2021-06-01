import { AnyLayer } from "../../internal";

export default function blur(layer: AnyLayer, sigma: number): number {

    // Debug
    layer._debug(`Blurring with a sigma of ${sigma}`);

    // Invalid sigma
    if (sigma < 0.3) throw new Error("The sigma can't be less than 0.3");
    if (sigma > 1000) throw new Error("The sigma can't be more than 1,000");

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "blur",
        sigma
    });

    // Return
    return layer._lastEditID;
}