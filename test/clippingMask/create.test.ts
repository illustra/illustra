import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { createClippingMask, createEllipse, createLayer, ClippingMask, Document, Ellipse, Layer } from "../../src/internal";

describe("creating clipping masks", () => {

    let document: Document;
    let logo: Layer;
    let mask: Ellipse;

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

        // Create logo
        logo = await createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: 300,
            top: 300
        });
        logo.resize(500);

        // Create mask
        mask = createEllipse({
            name: "mask",
            shape: {
                width: 500,
                height: 500,
                fill: "#ffffff"
            },
            left: 300,
            top: 300
        });
    });

    it("creates a clipping mask", async () => {

        // Create clipping mask
        document.createClippingMask({
            name: "clippingMask",
            mask,
            source: logo
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/clippingMask/exports/create.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("creates a clipping mask without a document", () => {

        // Create clipping mask
        const clippingMask: ClippingMask = createClippingMask({
            name: "clippingMask",
            mask,
            source: logo
        });

        // Expect
        expect(clippingMask).toBeDefined();
    });
});