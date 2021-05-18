import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("changing the opacity of a %s", (layerType: string) => {

    it("sets the opacity", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            image: "test/assets/black.png"
        });

        // Add layer
        const layer: BaseLayer = await addLayer(layerType, document);

        // Set opacity errors
        expect(() => layer.setOpacity(-10)).toThrow("Opacity must be between 0 and 100");
        expect(() => layer.setOpacity(110)).toThrow("Opacity must be between 0 and 100");

        // Set layer's opacity
        layer.setOpacity(50);

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/opacity/${layerType}/opacity.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });
});