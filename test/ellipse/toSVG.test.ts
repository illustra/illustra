import { Document, Ellipse } from "../../src/internal";

describe("creating SVG strings from ellipses", () => {

    it("creates an SVG string from an ellipse", () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create ellipse
        const ellipse: Ellipse = document.createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff",
                stroke: "#ff0000",
                strokeWidth: 15
            }
        });

        // Get SVG code
        const svgCode: string = ellipse.toSVG();

        // Expect
        expect(svgCode).toBe(`
            <svg viewBox="0 0 315 515" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="157.5" cy="257.5" rx="150" ry="250" fill="#ffffff" stroke="#ff0000" stroke-width="15" />
            </svg>
        `.replace(/\n\s+/g, ""));
    });
});