import { AnyLayer } from "../../internal";

export default function blur<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, sigma: number): AnyLayerInput {

    // Debug
    layer._debug(`Blurring with a sigma of ${sigma}`);

    // Add to edits
    layer._edits.push({
        type: "blur",
        sigma
    });

    // Return
    return layer;
}