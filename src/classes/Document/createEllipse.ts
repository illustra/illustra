import { Ellipse, EllipseData } from "../../internal";
import Document from "./Document";

export default function createEllipse(document: Document, ellipseData: EllipseData): Ellipse {

    // Debug
    document._debug(`Creating ellipse '${ellipseData.name}' at position ${ellipseData.position || document.layers.length}`);

    // Create ellipse
    const ellipse: Ellipse = new Ellipse(ellipseData, document);

    // Return created ellipse
    return ellipse;
}