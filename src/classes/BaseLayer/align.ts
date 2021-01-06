import { AnyLayer, Layer, ShapeLayer } from "../../internal";

export type AlignType = "start" | "center" | "end";

export type Units = "pixels" | "percent";

export interface AlignOptions {
    left?: AlignType;
    top?: AlignType;
    leftOffset?: number;
    topOffset?: number;
    leftOffsetUnits?: Units;
    topOffsetUnits?: Units;
}

export default function align<AnyLayerInput extends AnyLayer>(layer: AnyLayerInput, alignOptions: AlignOptions = {}): AnyLayerInput {

    // Invalid layer type
    if ((!(layer instanceof Layer)) && (!(layer instanceof ShapeLayer))) throw new Error("This layer can't be aligned");

    // No document
    if (!layer.document) throw new Error("This layer isn't a part of a document");

    // Get alignment left
    let left: number;
    if (alignOptions.left === "start") left = 0;
    else if ((alignOptions.left === "center") || (!alignOptions.left)) left = Math.round((layer.document.width / 2) - (layer.width / 2));
    else if (alignOptions.left === "end") left = layer.document.width - layer.width;
    else throw new Error("Invalid left align type");

    // Get alignment top
    let top: number;
    if (alignOptions.top === "start") top = 0;
    else if ((alignOptions.top === "center") || (!alignOptions.top)) top = Math.round((layer.document.height / 2) - (layer.height / 2));
    else if (alignOptions.top === "end") top = layer.document.height - layer.height;
    else throw new Error("Invalid top align type");

    // Parse alignment left offset
    let leftOffset: number = alignOptions.leftOffset || 0;
    if (alignOptions.leftOffsetUnits === "percent") leftOffset = layer.document.width * (leftOffset / 100);

    // Parse alignment top offset
    let topOffset: number = alignOptions.topOffset || 0;
    if (alignOptions.topOffsetUnits === "percent") topOffset = layer.document.height * (topOffset / 100);

    // Set alignment left offset
    if (alignOptions.leftOffset) left = left + leftOffset;

    // Set alignment top offset
    if (alignOptions.topOffset) top = top + topOffset;

    // Debug
    layer._debug(`Aligning to ${alignOptions.left || "center"} (left) and ${alignOptions.top || "center"} (top) with an offset of ${leftOffset}px (left) and ${topOffset}px (top)`);

    // Translate
    layer.translate(left, top);

    // Return
    return layer;
}