import Layer from "./Layer";

type AlignType = "start" | "center" | "end";

type Units = "pixels" | "percent";

export interface AlignOptions {
    top?: AlignType;
    left?: AlignType;
    topOffset?: number;
    leftOffset?: number;
    topOffsetUnits?: Units;
    leftOffsetUnits?: Units;
}

export default function align(layer: Layer, alignOptions: AlignOptions = {}): Layer {

    // Get alignment top
    let top: number;
    if (alignOptions.top === "start") top = 0;
    else if ((alignOptions.top === "center") || (!alignOptions.top)) top = Math.round((layer.document.height / 2) - (layer.height / 2));
    else if (alignOptions.top === "end") top = layer.document.height - layer.height;
    else throw new Error("Invalid top align type");

    // Get alignment left
    let left: number;
    if (alignOptions.left === "start") left = 0;
    else if ((alignOptions.left === "center") || (!alignOptions.left)) left = Math.round((layer.document.width / 2) - (layer.width / 2));
    else if (alignOptions.left === "end") left = layer.document.width - layer.width;
    else throw new Error("Invalid left align type");

    // Parse alignment top offset
    let topOffset: number = alignOptions.topOffset || 0;
    if (alignOptions.topOffsetUnits === "percent") topOffset = layer.document.height * (topOffset / 100);

    // Parse alignment left offset
    let leftOffset: number = alignOptions.leftOffset || 0;
    if (alignOptions.leftOffsetUnits === "percent") leftOffset = layer.document.width * (leftOffset / 100);

    // Set alignment top offset
    if (alignOptions.topOffset) top = top + topOffset;

    // Set alignment left offset
    if (alignOptions.leftOffset) left = left + leftOffset;

    // Translate
    layer.translate(top, left);

    // Return
    return layer;
}