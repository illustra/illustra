import fs from "fs";
import { createLayer, AnyLayer, BaseLayer, ClippingMask, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "polygon", "ellipse"])("adding a circular mask to %s", (layerType: string) => {

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

    it("adds a circular mask", async () => {

        // Add circular mask
        layer.circularMask("mask");

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/circularMask/${layerType}/circularMask.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("adds a circular mask while keeping the source layer", async () => {

        // Add circular mask
        layer.circularMask("mask", true);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", layerType, "mask"]);
    });

    it("adds a circular mask to a layer without a document", async () => {

        // Create other logo
        const otherLogo: Layer = await createLayer({
            name: "logo",
            file: "test/assets/apixel.png",
            top: 300,
            left: 300
        });

        // Add circular mask
        const clippingMask: ClippingMask = otherLogo.circularMask("mask");

        // Expect
        expect(clippingMask).toBeDefined();
    });
});