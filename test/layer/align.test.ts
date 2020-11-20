import fs from "fs";
import { createLayer, Document, Layer } from "../../src/internal";

let document: Document;
let logo: Layer;

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

    // Add logo
    logo = await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png",
        top: 100,
        left: 100
    });
});

test("checks for align errors", async () => {

    // Create background
    const background: Layer = await createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Align layer
    expect(() => background.align()).toThrow("This layer isn't a part of a document");
    // @ts-ignore
    expect(() => logo.align({ top: "invalid" })).toThrow("Invalid top align type");
    // @ts-ignore
    expect(() => logo.align({ left: "invalid" })).toThrow("Invalid left align type");
});

test("aligns a layer to the top left of the document", async () => {

    // Align layer
    logo.align({
        top: "start",
        left: "start"
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/topLeft.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("aligns a layer to the center of the document", async () => {

    // Align layer
    logo.align({
        top: "center",
        left: "center"
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/center.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("aligns a layer to the bottom right of the document", async () => {

    // Align layer
    logo.align({
        top: "end",
        left: "end"
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/bottomRight.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("aligns a layer with an offset in pixels", async () => {

    // Align layer
    logo.align({
        top: "start",
        left: "start",
        topOffset: 200,
        leftOffset: 150
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/offset.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("aligns a layer with a percent offset", async () => {

    // Align layer
    logo.align({
        top: "start",
        left: "start",
        topOffset: 10,
        leftOffset: 15,
        topOffsetUnits: "percent",
        leftOffsetUnits: "percent"
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/percentOffset.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("aligns a layer to the document using default params", async () => {

    // Align layer
    logo.align();

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/align/center.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});