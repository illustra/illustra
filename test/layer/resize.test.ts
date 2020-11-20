import fs from "fs";
import { Document, Layer } from "../../src/internal";

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

test("resizes a layer's width while preserving aspect ratio", async () => {

    // Resize layer
    logo.resize(300);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/resize/resize.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("resizes a layer's height while preserving aspect ratio", async () => {

    // Resize layer
    logo.resize(undefined, 300);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/resize/resize.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("resizes a layer and stretches it", async () => {

    // Resize layer
    logo.resize(500, 300);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/resize/stretch.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("resizes a layer relative to its current dimensions", async () => {

    // Resize layer
    logo.resizeBy(100);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/resize/resizeBy.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("resizes a layer by scaling relative to its current dimensions", async () => {

    // Resize layer
    logo.resizeBy(50, 25, true);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/resize/resizeScale.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});