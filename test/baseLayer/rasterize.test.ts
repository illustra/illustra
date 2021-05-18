import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each([true, false])("rasterizing (with document: %s)", (withDocument: boolean) => {

    describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("rasterizing a %s", (layerType: string) => {

        it("rasterizes", async () => {

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
            let layer: BaseLayer = await addLayer(layerType, withDocument ? document : undefined);

            // Rasterize layer
            layer = await layer.rasterize();

            // Add layer to document
            if (!withDocument) document.addLayer(layer);

            // Export document
            const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

            // Get expected image
            const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/rasterize/${layerType}/rasterize.png`));

            // Expect
            expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
        });
    });
});