import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("translating a %s", (layerType: string) => {

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

    it("translates", async () => {

        // Translate layer
        layer.translate(300, 300);

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/translate.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("translates relative to current position", async () => {

        // Translate layer
        layer.translateBy(100, 100);

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/translateBy.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });

    it("translates using default parameters", async () => {

        // Translate layer
        layer.translate();
        layer.translateBy();

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/defaultParams.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });
});