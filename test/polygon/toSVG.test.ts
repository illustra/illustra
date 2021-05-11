import { Document, Polygon } from "../../src/internal";

describe("creating SVG strings from polygons", () => {

    it("creates an SVG string from a polygon", () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create polygon
        const polygon: Polygon = document.createPolygon({
            name: "polygon",
            shape: {
                width: 300,
                height: 500,
                sides: 5,
                fill: "#ffffff",
                stroke: "#ff0000",
                strokeWidth: 15
            },
        });

        // Get SVG code
        const svgCode: string = polygon.toSVG();

        // Expect
        expect(svgCode).toBe(`
            <svg viewBox="0 0 315 515" xmlns="http://www.w3.org/2000/svg">
                <polygon points="157.50000000000003,7.5 307.5,198.4830056250526 250.20509831248432,507.5 64.79490168751579,507.5 7.5,198.48300562505267" fill="#ffffff" stroke="#ff0000" stroke-width="15" />
            </svg>
        `.replace(/\n\s+/g, ""));
    });
});