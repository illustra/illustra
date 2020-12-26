import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("changing the hue of a layer", () => {

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
            file: "test/assets/javascript.png",
            top: 300,
            left: 300
        });
    });

    it("rotates the hue", async () => {

        // Rotate layer hue
        logo.hue(150);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/hue/hue.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("rotates the hue without causing any changes", async () => {

        // Rotate layer hue
        logo.hue(360);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/hue/noChange.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});