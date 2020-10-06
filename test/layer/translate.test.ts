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
        data: "test/assets/apixel.png",
        top: 100,
        left: 100
    });
});

test("translates a layer", async () => {

    // Translate layer
    logo.translate(300, 300);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/translate/translate.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("translates a layer relative to its current position", async () => {

    // Translate layer
    logo.translateBy(100, 100);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/translate/translateBy.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("translates a layer using default params", async () => {

    // Translate layer
    logo.translate();
    logo.translateBy();

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/translate/defaultParams.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});