import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("changing the brightness of a %s", (layerType: string) => {

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

    it("increases the brightness", async () => {

        // Adjust layer brightness
        layer.brightness(150);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/brightness/${layerType}/increase.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("decreases the brightness", async () => {

        // Adjust layer brightness
        layer.brightness(50);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/brightness/${layerType}/decrease.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("adjusts the brightness without causing any changes", async () => {

        // Adjust layer brightness
        layer.brightness(100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/brightness/${layerType}/noChange.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});