import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("reflecting a %s", (layerType: string) => {

    let document: Document;
    let layer: BaseLayer;

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

        // Add layer
        layer = await addLayer(layerType, document);
    });

    it("reflects vertically", async () => {

        // Reflect layer
        layer.reflect("vertical");

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/reflect/${layerType}/vertical.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("reflects horizontally", async () => {

        // Reflect layer
        layer.reflect("horizontal");

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/reflect/${layerType}/horizontal.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });
});