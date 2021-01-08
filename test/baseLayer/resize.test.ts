import fs from "fs";
import { BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "polygon", "ellipse"])("resizing a %s", (layerType: string) => {

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

    it("resizes width while preserving aspect ratio", async () => {

        // Resize layer
        layer.resize(300);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/resizeWidth.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("resizes height while preserving aspect ratio", async () => {

        // Resize layer
        layer.resize(undefined, 300);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/resizeHeight.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("resizes and stretches", async () => {

        // Resize layer
        layer.resize(500, 300);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/stretch.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("resizes relative to current dimensions", async () => {

        // Resize layer
        layer.resizeBy(100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/resizeBy.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("resizes by scaling relative to current dimensions", async () => {

        // Resize layer
        layer.resizeBy(50, 25, true);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/resizeScale.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("ensures that aligning works after resizing", async () => {

        // Resize
        layer.resize(200);

        // Align layer
        layer.align();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/resize/${layerType}/alignCheck.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});