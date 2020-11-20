import fs from "fs";
import { Document, Layer } from "../../src/internal";

test("inverts a layer's colors", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Add logo
    const logo: Layer = await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png",
        top: 300,
        left: 300
    });

    // Invert layer
    logo.invert();

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/invert.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});