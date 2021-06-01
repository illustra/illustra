import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { AlignType, Document } from "../../src/internal";

describe("resizing documents", () => {

    let document: Document;

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

        // Add logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/apixel.png"
        });
    });

    const alignTypes: AlignType[] = ["start", "center", "end"];

    describe.each(alignTypes)("resizing a document with an anchor point left align of %s", (leftAlign: AlignType) => {
        describe.each(alignTypes)("resizing a document with an anchor point top align of %s", (topAlign: AlignType) => {

            it(`resizes a document with an anchor point at ${leftAlign} (left) and ${topAlign} (top)`, async () => {

                // Resize document
                document.resize(2500, 1500, leftAlign, topAlign);

                // Export document
                const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

                // Get expected image
                const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync(`test/document/exports/resize/${leftAlign}/${topAlign}.png`));

                // Expect
                expect(pixelmatch(exportedImage.data, expectedImage.data, null, 2500, 1500)).toBeLessThanOrEqual(50);
            });
        });
    });

    it("resizes a document with default parameters", async () => {

        // Resize document
        document.resize();

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/resize/default.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });
});