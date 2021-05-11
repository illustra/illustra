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

    /**
     * Align to width and height
     *
     * Since polygons are drawn around a circle,
     * the width and height might not be correct.
     *
     * For example, a 400 pixel by 400 pixel pentagon might look like this: https://i.imgur.com/rYeKifI.png
     * Notice how it doesn't take up the entire document
     *
     * Another issue would be if the width and height don't match
     * For example, a 400 pixel by 800 pixel polygon would end up being 400 pixel by 400 pixel
     *
     * To fix this, we need to scale the svg
     *
     * First, we need to make sure the polygon is aligned to the top left edges
     *
     * We can do this by mapping the path's points (ie. `[[0, 0], [100, 100], [0, 100]]`) to their X or Y coordinates (ie. `[0, 100, 0]` for the X and `[0, 100, 100]` for the Y)
     * Then we find the smallest value
     */
    const generatedLeft: number = Math.min(...path.points().map((p: number[]) => p[0]));
    const generatedTop: number = Math.min(...path.points().map((p: number[]) => p[1]));

    // Now we can translate the svg
    path = path.translate(-generatedLeft, -generatedTop);

    /**
     * Then, we need to find the X coordinate of the point that is farthest right
     * This will allow us to determine the width of the *generated* shape as opposed to the width of the final shape (`polygonShapeData.width`)
     *
     * We also need to do the same for the height, with the Y coordinate of the point that is farthest down
     *
     * We can do this by mapping the path's points just like last time
     * Then we find the largest value
     */
    const generatedWidth: number = Math.max(...path.points().map((p: number[]) => p[0]));
    const generatedHeight: number = Math.max(...path.points().map((p: number[]) => p[1]));

    // Now we can scale the svg
    path = path.scale(polygonShapeData.width / generatedWidth, polygonShapeData.height / generatedHeight);

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
    return svgCode.replace(/\n\s+/g, "");
}