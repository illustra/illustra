import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("changing the saturation of a layer", () => {

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

    it("increases the saturation", async () => {

        // Adjust layer saturation
        logo.saturation(150);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/saturation/increase.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("decreases the saturation", async () => {

        // Adjust layer saturation
        logo.saturation(50);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/saturation/decrease.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });

    it("adjusts the saturation without causing any changes", async () => {

        // Adjust layer saturation
        logo.saturation(100);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/saturation/noChange.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});