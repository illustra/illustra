import Path from "paths-js/path";
import { parseColor } from "../../color";
import { PolygonShapeData } from "../../internal";

export default function polygonSVG(polygonShapeData: PolygonShapeData): string {

    // Get center
    const centerX: number = polygonShapeData.width / 2;
    const centerY: number = polygonShapeData.height / 2;

    // Get radius
    const radius: number = Math.min(centerX, centerY);

    // Get degrees per point
    const degrees: number = 360 / polygonShapeData.sides;

    // Create path
    let path: any = Path();

    // Loop through points
    for (let i = 0; i < polygonShapeData.sides; i++) {

        // Get angle
        const degree: number = degrees * i;
        const angle: number = degree * (Math.PI / 180);

        // Get coordinates
        const x: number = radius * Math.cos(angle);
        const y: number = radius * Math.sin(angle);

        // Draw line
        if (i === 0) path = path.moveto(x + radius, y + radius);
        else path = path.lineto(x + radius, y + radius);
    }

    // Rotate 90 degrees counterclockwise
    path = path.rotate(-90, radius, radius);

    // Scale
    path = path.scale(
        polygonShapeData.width > polygonShapeData.height ?
            polygonShapeData.width / polygonShapeData.height :
            1,
        polygonShapeData.height > polygonShapeData.width ?
            polygonShapeData.height / polygonShapeData.width :
            1
    );

    // Translate
    // If there's a stroke, translate the shape by half the stroke width
    if (polygonShapeData.strokeWidth) path = path.translate(polygonShapeData.strokeWidth / 2, polygonShapeData.strokeWidth / 2);

    // Get svg code
    const svgCode: string = `
        <svg viewBox="0 0 ${polygonShapeData.width + (polygonShapeData.strokeWidth || 0)} ${polygonShapeData.height + (polygonShapeData.strokeWidth || 0)}" xmlns="http://www.w3.org/2000/svg">
            <polygon points="${path.points().map((p: number[]) => p.join(",")).join(" ")}"${polygonShapeData.fill ? ` fill="${parseColor(polygonShapeData.fill)}"` : ""}${polygonShapeData.stroke ? ` stroke="${parseColor(polygonShapeData.stroke)}"` : ""}${polygonShapeData.strokeWidth ? ` stroke-width="${polygonShapeData.strokeWidth}"` : ""} />
        </svg>
    `;

    // Return
    return svgCode.trim();
}