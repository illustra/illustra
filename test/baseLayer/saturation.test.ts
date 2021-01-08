import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("changing the saturation of a %s", (layerType: string) => {

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
        layer = await addLayer(layerType, document);
    });

    it("increases the saturation", async () => {

        // Adjust layer saturation
        layer.saturation(150);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/saturation/${layerType}/increase.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("decreases the saturation", async () => {

        // Adjust layer saturation
        layer.saturation(50);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/saturation/${layerType}/decrease.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("adjusts the saturation without causing any changes", async () => {

        // Adjust layer saturation
        layer.saturation(100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/saturation/${layerType}/noChange.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});