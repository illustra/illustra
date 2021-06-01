import { AlignType, AnyLayer, Document } from "../../internal";

export default function resize(document: Document, width: number = document.width, height: number = document.height, anchorPointLeft: AlignType = "center", anchorPointTop: AlignType = "center") {

    // Debug
    document._debug(`Resizing to ${width} by ${height} (anchor point left: ${anchorPointLeft}, anchor point top: ${anchorPointTop})`);

    /**
     * Depending on the anchor points location, all the layers need to be moved a certain amount
     * We start by defining the left and top movements
     *
     * If the anchor point is along the left column, no changes to the left position need to be made
     * If the anchor point is along the top row, no changes to the top position need to be made
     */
    let left: number = 0;
    let top: number = 0;

    /**
     * If the anchor point is along the center column,
     * the left position need to be changed by half of the width change
     */
    if (anchorPointLeft === "center") left = (width - document.width) / 2;

    /**
     * If the anchor point is along the right column,
     * the left position need to be changed by the width change
     */
    else if (anchorPointLeft === "end") left = width - document.width;

    /**
     * If the anchor point is along the center row,
     * the top position need to be changed by half of the height change
     */
    if (anchorPointTop === "center") top = (height - document.height) / 2;

    /**
     * If the anchor point is along the bottom row,
     * the top position need to be changed by the height change
     */
    else if (anchorPointTop === "end") top = height - document.height;

    // Set the width and height
    document.width = width;
    document.height = height;

    // Translate layers
    document.layers.forEach((l: AnyLayer) => l.translateBy(left, top));
}