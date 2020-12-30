import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("changing the hue of a %s", (layerType: string) => {

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
        layer = await addLayer(document, layerType);
    });

    it("rotates the hue", async () => {

        // Rotate layer hue
        layer.hue(150);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/hue/${layerType}/hue.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("rotates the hue without causing any changes", async () => {

        // Rotate layer hue
        layer.hue(360);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/hue/${layerType}/noChange.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});