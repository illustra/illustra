import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("removing an edit from a %s", (layerType: string) => {

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

    it("removes an edit", async () => {

        // Add edits
        layer.blur(3);
        const editID: number = layer.blur(10);
        layer.blur(5);

        // Remove an edit with an invalid edit ID
        const invalidEditRemoved: boolean = layer.removeEdit(5);
        expect(invalidEditRemoved).toBe(false);

        // Remove the edit
        const editRemoved: boolean = layer.removeEdit(editID);
        expect(editRemoved).toBe(true);

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/removeEdit/${layerType}/removeEdit.png`));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(500);
    });
});