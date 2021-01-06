import fs from "fs";
import { createLayer, BaseLayer, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe("checking for aligning errors", () => {

    it("checks for errors", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        const background: Layer = await createLayer({
            name: "background",
            file: "test/assets/black.png"
        });

        // Add layer
        const layer: BaseLayer = await addLayer(document, "layer");

        // Add text layer
        const textLayer: BaseLayer = await addLayer(document, "textLayer");

        // Align layer
        expect(() => background.align()).toThrow("This layer isn't a part of a document");
        expect(() => textLayer.align()).toThrow("This layer can't be aligned");
        // @ts-ignore
        expect(() => layer.align({ left: "invalid" })).toThrow("Invalid left align type");
        // @ts-ignore
        expect(() => layer.align({ top: "invalid" })).toThrow("Invalid top align type");
    });
});

describe.each(["layer", "polygon", "ellipse"])("aligning a %s", (layerType: string) => {

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

    it("aligns to the top left of the document", async () => {

        // Align layer
        layer.align({
            left: "start",
            top: "start"
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/topLeft.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("aligns to the center of the document", async () => {

        // Align layer
        layer.align({
            left: "center",
            top: "center"
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/center.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("aligns to the bottom right of the document", async () => {

        // Align layer
        layer.align({
            left: "end",
            top: "end"
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/bottomRight.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("aligns with an offset in pixels", async () => {

        // Align layer
        layer.align({
            left: "start",
            top: "start",
            leftOffset: 150,
            topOffset: 200
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/offset.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("aligns with a percent offset", async () => {

        // Align layer
        layer.align({
            left: "start",
            top: "start",
            leftOffset: 15,
            topOffset: 10,
            leftOffsetUnits: "percent",
            topOffsetUnits: "percent"
        });

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/percentOffset.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("aligns to the document using default parameters", async () => {

        // Align layer
        layer.align();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/baseLayer/exports/align/${layerType}/center.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});