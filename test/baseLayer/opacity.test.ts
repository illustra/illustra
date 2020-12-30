import fs from "fs";
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
            file: "test/assets/black.png"
        });

        // Add layer
        const layer: BaseLayer = await addLayer(document, layerType);

        // Set opacity errors
        expect(() => layer.setOpacity(-10)).toThrow("Opacity must be between 0 and 100");
        expect(() => layer.setOpacity(110)).toThrow("Opacity must be between 0 and 100");

        // Set layer's opacity
        layer.setOpacity(50);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/opacity/${layerType}/opacity.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});