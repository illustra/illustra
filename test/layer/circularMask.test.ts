import fs from "fs";
import { createLayer, AnyLayer, ClippingMask, Document, Layer } from "../../src/internal";

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
        top: 300,
        left: 300
    });
});

test("adds a circular mask to a layer", async () => {

    // Add circular mask
    logo.circularMask("mask");

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/circularMask.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("adds a circular mask to a layer while keeping the source layer", async () => {

    // Add circular mask
    logo.circularMask("mask", true);

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "logo", "mask"]);
});

test("adds a circular mask to a layer without a document", async () => {

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