import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { createPolygon, Document, Polygon } from "../../src/internal";

describe("creating a polygon", () => {

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

    it("creates a polygon", async () => {

        // Create polygon
        document.createPolygon({
            name: "polygon",
            shape: {
                width: 300,
                height: 500,
                sides: 5,
                fill: "#ffffff"
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/polygon/exports/create/polygon.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("creates a polygon with a stroke", async () => {

        // Create polygon
        document.createPolygon({
            name: "polygon",
            shape: {
                width: 300,
                height: 500,
                sides: 5,
                fill: "#ffffff",
                stroke: "#ff0000",
                strokeWidth: 15
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/polygon/exports/create/stroke.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("creates a polygon without a document", () => {

        // Create polygon
        const polygon: Polygon = createPolygon({
            name: "polygon",
            shape: {
                width: 300,
                height: 500,
                sides: 5,
                fill: "#ffffff"
            }
        });

        // Expect
        expect(polygon).toBeDefined();
    });
});