import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { Document } from "../../src/internal";

describe("creating a layer from an svg string", () => {

    it("creates a layer", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            image: `
                <svg>
                    <circle cx="200" cy="200" r="200" fill="#ffffff" />
                </svg>
            `,
            left: 100,
            top: 100
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/baseLayer/exports/svgString.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });
});