import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { Document, ExportMetadata } from "../../src/internal";

describe("exporting documents", () => {

    let document: Document;
    let expectedImage: PNGWithMetadata;

    beforeAll(async () => {

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

        // Add logo
        await document.createLayer({
            name: "logo",
            file: "test/assets/apixel.png"
        });

        // Get expected image
        expectedImage = pngjs.sync.read(fs.readFileSync("test/document/exports/exportTo.png"));
    });

    afterAll(() => {

        // Delete exported image
        try {
            fs.unlinkSync("test/document/exports/exportTo.out.png");
        } catch (error) { }
    });

    it("exports as a file", async () => {

        // Export errors
        // @ts-ignore
        expect(async () => await document.exportTo("invalid")).rejects.toThrow("Invalid format");
        // @ts-ignore
        expect(async () => await document.exportTo("png", "invalid")).rejects.toThrow("Invalid export type");

        // Export layer
        await document.exportTo("png", "file", "test/document/exports/exportTo.out.png");

        // Get exported image
        const exportedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/exportTo.out.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("exports as a buffer", async () => {

        // Export layer
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("exports as a buffer with metadata", async () => {

        // Export layer
        const exportedImage: ExportMetadata = await document.exportTo("png", "buffer", true);
        const parsedExportedImage: PNGWithMetadata = pngjs.sync.read(exportedImage.data);

        // Expect
        expect(pixelmatch(parsedExportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
        expect(exportedImage.width).toBe(1920);
        expect(exportedImage.height).toBe(1080);
    });
});