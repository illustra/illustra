import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("changing the opacity of a layer", () => {

    it("sets the opacity", async () => {

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

        // Set opacity errors
        expect(() => logo.setOpacity(-10)).toThrow("Opacity must be between 0 and 100");
        expect(() => logo.setOpacity(110)).toThrow("Opacity must be between 0 and 100");

        // Set layer's opacity
        logo.setOpacity(50);

        // Export document
        const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

        // Get expected image
        const expectedImage: string = fs.readFileSync("test/layer/exports/opacity.png").toString("base64");

        // Expect
        expect(exportedImage).toBe(expectedImage);
    });
});