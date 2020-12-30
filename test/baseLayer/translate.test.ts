import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("translating a %s", (layerType: string) => {

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

    it("translates", async () => {

        // Translate layer
        layer.translate(300, 300);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/translate.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("translates relative to current position", async () => {

        // Translate layer
        layer.translateBy(100, 100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/translateBy.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("translates using default parameters", async () => {

        // Translate layer
        layer.translate();
        layer.translateBy();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/translate/${layerType}/defaultParams.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});