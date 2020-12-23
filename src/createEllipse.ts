import Ellipse, { EllipseData } from "./classes/Ellipse/Ellipse";

export default function createEllipse(ellipseData: EllipseData): Ellipse {

    // Create ellipse
    const ellipse: Ellipse = new Ellipse(ellipseData);

    // Return created ellipse
    return ellipse;
}