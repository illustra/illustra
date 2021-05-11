import { parseColor } from "../../color";
import { EllipseShapeData } from "../../internal";

export default function ellipseSVG(ellipseShapeData: EllipseShapeData): string {

    // Get svg code
    const svgCode: string = `
        <svg viewBox="0 0 ${ellipseShapeData.width + (ellipseShapeData.strokeWidth || 0)} ${ellipseShapeData.height + (ellipseShapeData.strokeWidth || 0)}" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="${(ellipseShapeData.width / 2) + (ellipseShapeData.strokeWidth ? ellipseShapeData.strokeWidth / 2 : 0)}" cy="${(ellipseShapeData.height / 2) + (ellipseShapeData.strokeWidth ? ellipseShapeData.strokeWidth / 2 : 0)}" rx="${ellipseShapeData.width / 2}" ry="${ellipseShapeData.height / 2}"${ellipseShapeData.fill ? ` fill="${parseColor(ellipseShapeData.fill)}"` : ""}${ellipseShapeData.stroke ? ` stroke="${parseColor(ellipseShapeData.stroke)}"` : ""}${ellipseShapeData.strokeWidth ? ` stroke-width="${ellipseShapeData.strokeWidth}"` : ""} />
        </svg>
    `;

    // Return
    return svgCode.replace(/\n\s+/g, "");
}