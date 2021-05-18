import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { createLayer, AnyLayer, BaseLayer, ClippingMask, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "polygon", "ellipse"])("adding a circular mask to %s", (layerType: string) => {

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
            image: "test/assets/black.png"
        });

        // Add layer
        layer = await addLayer(layerType, document);
    });

    it("adds a circular mask", async () => {

        // Add circular mask
        layer.circularMask("mask");

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/circularMask/${layerType}/circularMask.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("adds a circular mask while keeping the source layer", async () => {

        // Add circular mask
        layer.circularMask("mask", true);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", layerType, "mask"]);
    });

    it("adds a circular mask to a layer without a document", async () => {

        // Create other logo
        const otherLogo: Layer = await createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: 300,
            top: 300
        });

        // Add circular mask
        const clippingMask: ClippingMask = otherLogo.circularMask("mask");

        // Expect
        expect(clippingMask).toBeDefined();
    });
});