import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("translating a layer", () => {

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

    it("translates", async () => {

        // Translate layer
        logo.translate(300, 300);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/translate/translate.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("translates relative to current position", async () => {

        // Translate layer
        logo.translateBy(100, 100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/translate/translateBy.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("translates using default parameters", async () => {

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

    it("ensures that translating off the screen works after rotating a layer", async () => {

        // Rotate
        logo.rotate(30);

        // Translate
        logo.translate(700, 1500);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/translate/afterRotating.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});