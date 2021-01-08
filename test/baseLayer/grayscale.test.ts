import fs from "fs";
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
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/grayscale/${layerType}/grayscale.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});