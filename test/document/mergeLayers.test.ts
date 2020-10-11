import fs from "fs";
import { Document, Layer } from "../../";

test("merges layers", async () => {

    // Create document
    const document: Document = new Document({
        name: "Merge Layers",
        width: 1920,
        height: 1080,
        debugMode: true
    });

    // Create background
    await document.createLayer({
        name: "background",
        data: "test/assets/black.png"
    });

    // Add apixel logo
    const apixelLogo: Layer = await document.createLayer({
        name: "apixelLogo",
        data: "test/assets/apixel.png"
    });

    // Add typescript logo
    const typescriptLogo: Layer = await document.createLayer({
        name: "typescriptLogo",
        data: "test/assets/typescript.png"
    });

    // Add javascript logo
    await document.createLayer({
        name: "javascriptLogo",
        data: "test/assets/javascript.png"
    });

    // Create other document
    const otherDocument: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create other layer
    const otherLayer: Layer = await otherDocument.createLayer({
        name: "layer",
        data: "test/assets/apixel.png"
    });

    // Merge errors
    // @ts-ignore
    expect(async () => await document.mergeLayers("merged", ["invalid"])).rejects.toThrow("Unknown layer with name 'invalid'");
    // @ts-ignore
    expect(async () => await document.mergeLayers("merged", [4])).rejects.toThrow("Unknown layer with index 4");
    // @ts-ignore
    expect(async () => await document.mergeLayers("merged", [otherLayer])).rejects.toThrow("Layer at index 0 isn't part of this document");

    // Merge layers as a copy
    await document.mergeLayers("mergedCopy", [apixelLogo, typescriptLogo], true);

    // Expect layer order
    let layers: string[] = document.layers.map((l: Layer) => l.name);
    expect(layers).toStrictEqual(["background", "apixelLogo", "typescriptLogo", "mergedCopy", "javascriptLogo"]);

    // Merge layers
    const mergedLayer: Layer = await document.mergeLayers("merged", [apixelLogo, typescriptLogo]);

    // Expect layer order
    layers = document.layers.map((l: Layer) => l.name);
    expect(layers).toStrictEqual(["background", "merged", "mergedCopy", "javascriptLogo"]);

    // Export layer
    const exportedImage: string = (await mergedLayer.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/document/exports/mergeLayers.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});