import { Ellipse, EllipseData } from "./internal";

export default function createEllipse(ellipseData: EllipseData): Ellipse {

    // Create ellipse
    const ellipse: Ellipse = new Ellipse(ellipseData);

    // Return created ellipse
    return ellipse;
}