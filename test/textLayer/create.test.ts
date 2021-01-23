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
            file: "test/assets/black.png"
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
                text: "example"
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

    it("creates a text layer with a custom font", async () => {

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example",
                font: "test/assets/roboto.ttf",
                fontSize: 65,
                color: "#ffffff"
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/textLayer/exports/create/font.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("creates a text layer with a custom font weight", async () => {

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example",
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

    it("creates a text layer with word wrapping and custom text alignment", async () => {

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example text with word wrapping and centering",
                fontSize: 65,
                textAlign: "center",
                color: "#ffffff",
                maxWidth: 400
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/textLayer/exports/create/textAlign.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(10000);
    });

    it("creates a text layer with a custom line height", async () => {

        // Create text
        document.createTextLayer({
            name: "text",
            text: {
                text: "example text with word wrapping and line height",
                fontSize: 65,
                color: "#ffffff",
                lineHeight: 150,
                maxWidth: 400
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/textLayer/exports/create/lineHeight.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(3000);
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