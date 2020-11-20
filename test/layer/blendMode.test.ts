import fs from "fs";
import { BlendMode, Document, Layer } from "../../src/internal";

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

    // Add javascript logo
    await document.createLayer({
        name: "logo",
        file: "test/assets/javascript.png",
        top: 300,
        left: 300
    });

    // Add typescript logo
    logo = await document.createLayer({
        name: "logo",
        file: "test/assets/typescript.png",
        top: 325,
        left: 325
    });
});

test("checks for errors when setting the blend mode of a layer", () => {

    // Set blend mode errors
    // @ts-ignore
    expect(() => logo.setBlendMode("Invalid")).toThrow("Invalid blend mode");
});

["normal", "darken", "multiply", "colorBurn", "lighten", "screen", "colorDodge", "linearDodge", "overlay", "softLight", "hardLight", "difference", "exclusion"].forEach((blendMode: string) => {

    test(`sets the blend mode of a layer to ${blendMode}`, async () => {

        // Set layer's blend mode
        if (blendMode === "normal") logo.setBlendMode();
        else logo.setBlendMode(blendMode as BlendMode);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync(`test/layer/exports/blendMode/${blendMode}.png`).toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});