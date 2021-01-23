import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("grayscaling a %s", (layerType: string) => {

    it("grayscales", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            file: "test/assets/black.png"
        });

        // Add layer
        const layer: BaseLayer = await addLayer(layerType, document);

        // Grayscale layer
        layer.grayscale();

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/grayscale/${layerType}/grayscale.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });
});