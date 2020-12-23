import fs from "fs";
import { createClippingMask, createEllipse, createLayer, ClippingMask, Document, Ellipse, Layer } from "../../src/internal";

let document: Document;
let logo: Layer;
let mask: Ellipse;

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

    // Create logo
    logo = await createLayer({
        name: "logo",
        file: "test/assets/apixel.png",
        top: 300,
        left: 300
    });
    logo.resize(500);

    // Create mask
    mask = createEllipse({
        name: "mask",
        shape: {
            width: 500,
            height: 500,
            fill: "#ffffff"
        },
        top: 300,
        left: 300
    });
});

test("creates a clipping mask", async () => {

    // Create clipping mask
    document.createClippingMask({
        name: "clippingMask",
        mask,
        source: logo
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/clippingMask/exports/create.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a clipping mask without a document", () => {

    // Create clipping mask
    const clippingMask: ClippingMask = createClippingMask({
        name: "clippingMask",
        mask,
        source: logo
    });

    // Expect
    expect(clippingMask).toBeDefined();
});