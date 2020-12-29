import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("reflecting a layer", () => {

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
            file: "test/assets/apixel.png"
        });
    });

    it("reflects vertically", async () => {

        // Reflect layer
        logo.reflect("vertical");

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/baseLayer/exports/reflect/vertical.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("reflects horizontally", async () => {

        // Reflect layer
        logo.reflect("horizontal");

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/baseLayer/exports/reflect/horizontal.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});