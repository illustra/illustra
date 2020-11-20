import fs from "fs";
import { Document } from "../../src/internal";

test("creates a layer", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    await document.createLayer({
        name: "background",
        svg: `
            <svg>
                <circle cx="200" cy="200" r="200" fill="#ffffff" />
            </svg>
        `,
        top: 100,
        left: 100
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/svgString.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});