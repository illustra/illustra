import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "polygon", "ellipse"])("rotating a %s", (layerType: string) => {

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

    it("rotates a layer", async () => {

        // Rotate layer
        layer.rotate(30);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/rotate/${layerType}/rotate.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("ensures that aligning works after rotating", async () => {

        // Rotate
        layer.rotate(30);

        // Align layer
        layer.align();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/rotate/${layerType}/alignCheck.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("ensures that reflecting works after rotating", async () => {

        // Rotate
        layer.rotate(30);

        // Reflect layer
        layer.reflect("horizontal");

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/rotate/${layerType}/reflectCheck.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});