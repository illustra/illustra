import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { createTextLayer, Document, TextLayer } from "../../src/internal";

describe("creating a text layer", () => {

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
            image: "test/assets/black.png"
        });
    });

    it("creates a text layer", async () => {

        // Create shape so text is visible
        document.createEllipse({
            name: "shape",
            shape: {
                width: 200,
                height: 50,
                fill: "#ffffff"
            },
            left: 200,
            top: 190
        });

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example",
                font: "Arial"
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/textLayer/exports/create/text.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("creates a text layer with a custom font weight", async () => {

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example",
                font: "Arial",
                fontSize: 65,
                fontWeight: "bold",
                color: "#ffffff"
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/textLayer/exports/create/fontWeight.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("creates a text layer without a document", async () => {

        // Create text
        const text: TextLayer = await createTextLayer({
            name: "text",
            text: {
                text: "example"
            }
        });

        // Expect
        expect(text).toBeDefined();
    });
});