import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { BlendMode, Document, Layer } from "../../src/internal";

describe("changing the blend mode of layers", () => {

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
            image: "test/assets/black.png"
        });

        // Add javascript logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/javascript.png",
            left: 300,
            top: 300
        });

        // Add typescript logo
        logo = await document.createLayer({
            name: "logo",
            image: "test/assets/typescript.png",
            left: 325,
            top: 325
        });
    });

    it("checks for errors", () => {

        // Set blend mode errors
        // @ts-ignore
        expect(() => logo.setBlendMode("invalid")).toThrow("Invalid blend mode");
    });

    ["normal", "darken", "multiply", "colorBurn", "lighten", "screen", "colorDodge", "linearDodge", "overlay", "softLight", "hardLight", "difference", "exclusion"].forEach((blendMode: string) => {

        it(`sets the blend mode to ${blendMode}`, async () => {

            // Set layer's blend mode
            if (blendMode === "normal") logo.setBlendMode();
            else logo.setBlendMode(blendMode as BlendMode);

            // Export document
            const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

            // Get expected image
            const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/baseLayer/exports/blendMode/${blendMode}.png`));

            // Expect
            expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
        });
    });
});