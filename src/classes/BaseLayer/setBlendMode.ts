import { AnyLayer, BlendMode } from "../../internal";

export default function setBlendMode<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, blendMode?: BlendMode | null): AnyLayerInput {

    // Default blend mode
    if (!blendMode) blendMode = "normal";

    // Debug
    layer._debug(`Setting blend mode to ${blendMode}`);

    // Invalid blend mode
    if (!["normal", "darken", "multiply", "colorBurn", "lighten", "screen", "colorDodge", "linearDodge", "overlay", "softLight", "hardLight", "difference", "exclusion"].includes(blendMode)) throw new Error("Invalid blend mode");

    // Set blend mode
    layer.blendMode = blendMode;

    // Return
    return layer;
}