import fs from "fs";
import { AnyLayer, Document, Layer } from "../../src/internal";

describe("merging layers in a document", () => {

    let document: Document;

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
    });

    it("checks for errors", async () => {

        // Create other document
        const otherDocument: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create other layer
        const otherLayer: Layer = await otherDocument.createLayer({
            name: "layer",
            file: "test/assets/apixel.png"
        });

        // Merge errors
        expect(async () => await document.mergeLayers("merged", ["invalid"])).rejects.toThrow("Unknown layer with name 'invalid'");
        expect(async () => await document.mergeLayers("merged", [1])).rejects.toThrow("Unknown layer with index 1");
        expect(async () => await document.mergeLayers("merged", [otherLayer])).rejects.toThrow("Layer at index 0 isn't part of this document");
    });

    it("merges layers", async () => {

        // Add apixel logo
        const apixelLogo: Layer = await document.createLayer({
            name: "apixelLogo",
            file: "test/assets/apixel.png"
        });

        // Add typescript logo
        const typescriptLogo: Layer = await document.createLayer({
            name: "typescriptLogo",
            file: "test/assets/typescript.png"
        });

        // Add javascript logo
        await document.createLayer({
            name: "javascriptLogo",
            file: "test/assets/javascript.png"
        });

        // Merge layers as a copy
        await document.mergeLayers("mergedCopy", [apixelLogo, typescriptLogo], true);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", "apixelLogo", "typescriptLogo", "mergedCopy", "javascriptLogo"]);

        // Merge layers
        const mergedLayer: Layer = await document.mergeLayers("merged", [apixelLogo, typescriptLogo]);

        // Expect layer order
        layers = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", "merged", "mergedCopy", "javascriptLogo"]);

        // Export layer
        const exportedImage: string = (await mergedLayer.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers/mergeLayers.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("merges layers that start going off the screen (bottom right)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            file: "test/assets/apixel.png",
            top: 700,
            left: 1700
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers/cropBottomRight.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("merges layers that start going off the screen (top left)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            file: "test/assets/apixel.png",
            top: -300,
            left: -200
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers/cropTopLeft.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("merges layers that go off the screen (bottom right)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            file: "test/assets/apixel.png",
            top: 1100,
            left: 2000
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers/removeBottomRight.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("merges layers that go off the screen (top left)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            file: "test/assets/apixel.png",
            top: -800,
            left: -800
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers/removeTopLeft.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});