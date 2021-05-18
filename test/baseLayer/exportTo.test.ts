import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { Document, ExportMetadata, Layer } from "../../src/internal";

describe("exporting layers", () => {

    let document: Document;
    let background: Layer;
    let expectedImage: PNGWithMetadata;

    beforeAll(async () => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        background = await document.createLayer({
            name: "background",
            image: "test/assets/black.png"
        });

        // Get expected image
        expectedImage = pngjs.sync.read(fs.readFileSync("test/baseLayer/exports/exportTo.png"));
    });

    afterAll(() => {

        // Delete exported image
        try {
            fs.unlinkSync("test/baseLayer/exports/exportTo.out.png");
        } catch (error) { }
    });

    it("exports as a file", async () => {

        // Export errors
        // @ts-ignore
        expect(async () => await background.exportTo("invalid")).rejects.toThrow("Invalid format");
        // @ts-ignore
        expect(async () => await background.exportTo("png", "invalid")).rejects.toThrow("Invalid export type");
        // @ts-ignore
        expect(async () => await background.exportTo("png", "file")).rejects.toThrow("Path must be specified if exportType is 'file'");

        // Export layer
        await background.exportTo("png", "file", "test/baseLayer/exports/exportTo.out.png");

        // Get exported image
        const exportedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/baseLayer/exports/exportTo.out.png"));

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
        const exportedImage: ExportMetadata = await background.exportTo("png", "buffer", true);
        const parsedExportedImage: PNGWithMetadata = pngjs.sync.read(exportedImage.data);

        // Expect
        expect(pixelmatch(parsedExportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
        expect(exportedImage.width).toBe(1920);
        expect(exportedImage.height).toBe(1080);
    });
});