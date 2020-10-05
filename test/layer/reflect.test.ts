import fs from "fs";
import { Document, Layer } from "../../";

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
        data: "test/assets/black.png"
    });

    // Add logo
    logo = await document.createLayer({
        name: "logo",
        data: "test/assets/apixel.png"
    });
});

test("reflects a layer vertically", async () => {

    // Reflect layer
    logo.reflect("vertical");

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/reflect/vertical.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("reflects a layer horizontally", async () => {

    // Reflect layer
    logo.reflect("horizontal");

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/reflect/horizontal.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});