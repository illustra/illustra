import fs from "fs";
import { createEllipse, Document, Ellipse } from "../../src/internal";

describe("creating ellipses", () => {

    let document: Document;

    beforeEach(async () => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            file: "test/assets/black.png"
        });
    });

    it("creates an ellipse", async () => {

        // Create ellipse
        document.createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            },
            top: 200,
            left: 250
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/ellipse/exports/create/ellipse.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("creates an ellipse with a stroke", async () => {

        // Create ellipse
        document.createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff",
                stroke: "#ff0000",
                strokeWidth: 15
            },
            top: 200,
            left: 250
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/ellipse/exports/create/stroke.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("creates an ellipse without a document", () => {

        // Create ellipse
        const ellipse: Ellipse = createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            }
        });

        // Expect
        expect(ellipse).toBeDefined();
    });
});