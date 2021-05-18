import fs from "fs";
import { Document, Layer } from "../../src/internal";

describe("setting properties of a layer", () => {

    let document: Document;
    let layer: Layer;

    beforeEach(async () => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Create layer
        layer = await document.createLayer({
            name: "layer",
            image: "test/assets/black.png"
        });
    });

    it("sets the image to an image file", async () => {

        // Set image
        await layer.setImage("test/assets/apixel.png");

        // Expect
        expect(layer.image).toBe("test/assets/apixel.png");
        expect(layer._svg).toBe(false);
    });

    it("sets the image to an image buffer", async () => {

        // Get image
        const image: Buffer = fs.readFileSync("test/assets/apixel.png");

        // Set image
        await layer.setImage(image);

        // Expect
        expect(layer.image).toStrictEqual(image);
        expect(layer._svg).toBe(false);
    });

    it("sets the image to an SVG string", async () => {

        // Define svg string
        const svgString: string = `
            <svg>
                <circle cx="200" cy="200" r="200" fill="#ffffff" />
            </svg>
        `;

        // Set image
        await layer.setImage(svgString);

        // Expect
        expect(layer.image).toStrictEqual(Buffer.from(svgString));
        expect(layer._svg).toBe(true);
    });
});