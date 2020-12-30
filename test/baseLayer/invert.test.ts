import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("inverting a %s's colors", (layerType: string) => {

    it("inverts colors", async () => {

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
        const layer: BaseLayer = await addLayer(document, layerType);

        // Invert layer
        layer.invert();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/invert/${layerType}/invert.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});