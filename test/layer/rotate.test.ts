import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("rotating a layer", () => {

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

    it("rotates a layer", async () => {

        // Rotate layer
        logo.rotate(30);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/rotate/rotate.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("ensures that aligning works after rotating", async () => {

        // Rotate
        logo.rotate(30);

        // Align layer
        logo.align();

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/rotate/alignCheck.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("ensures that reflecting works after rotating", async () => {

        // Rotate
        logo.rotate(30);

        // Reflect layer
        logo.reflect("horizontal");

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/rotate/reflectCheck.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});