import Path from "paths-js/path";
import { parseColor } from "../../color";
import { ShapeData } from "./ShapeLayer";

export default function shapeSVG(shapeData: ShapeData): string {

    // Define svg code
    let svgCode: string = "";

    // Polygon
    if (shapeData.type === "polygon") {

        // Get center
        const centerX: number = shapeData.width / 2;
        const centerY: number = shapeData.height / 2;

        // Get radius
        const radius: number = Math.min(centerX, centerY);

        // Get degrees per point
        const degrees: number = 360 / shapeData.sides;

        // Create path
        let path: any = Path();

        // Loop through points
        for (let i = 0; i < shapeData.sides; i++) {

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
            shapeData.width > shapeData.height ?
                shapeData.width / shapeData.height :
                1,
            shapeData.height > shapeData.width ?
                shapeData.height / shapeData.width :
                1
        );

        // Translate
        // If there's a stroke, translate the shape by half the stroke width
        if (shapeData.strokeWidth) path = path.translate(shapeData.strokeWidth / 2, shapeData.strokeWidth / 2);

        // Get svg code
        svgCode = `
            <svg viewBox="0 0 ${shapeData.width + (shapeData.strokeWidth || 0)} ${shapeData.height + (shapeData.strokeWidth || 0)}" xmlns="http://www.w3.org/2000/svg">
                <polygon points="${path.points().map((p: number[]) => p.join(",")).join(" ")}"${shapeData.fill ? ` fill="${parseColor(shapeData.fill)}"` : ""}${shapeData.stroke ? ` stroke="${parseColor(shapeData.stroke)}"` : ""}${shapeData.strokeWidth ? ` stroke-width="${shapeData.strokeWidth}"` : ""} />
            </svg>
        `;
    }
    else if (shapeData.type === "ellipse") {

        // Get svg code
        svgCode = `
            <svg viewBox="0 0 ${shapeData.width + (shapeData.strokeWidth || 0)} ${shapeData.height + (shapeData.strokeWidth || 0)}" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="${(shapeData.width / 2) + (shapeData.strokeWidth ? shapeData.strokeWidth / 2 : 0)}" cy="${(shapeData.height / 2) + (shapeData.strokeWidth ? shapeData.strokeWidth / 2 : 0)}" rx="${shapeData.width / 2}" ry="${shapeData.height / 2}"${shapeData.fill ? ` fill="${parseColor(shapeData.fill)}"` : ""}${shapeData.stroke ? ` stroke="${parseColor(shapeData.stroke)}"` : ""}${shapeData.strokeWidth ? ` stroke-width="${shapeData.strokeWidth}"` : ""} />
            </svg>
        `;
    }

    // Return
    return svgCode.trim();
}