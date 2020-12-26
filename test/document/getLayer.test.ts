import { Document, Layer } from "../../src/internal";

describe("getting a layer from a document", () => {

    let document: Document;

    beforeAll(async () => {

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
    });

    it("gets by name", () => {

        // Get layer
        const layer: Layer | undefined = document.getLayer("background") as Layer | undefined;

        // Expect
        expect(layer).toBeDefined();
    });

    it("gets by index", () => {

        // Get layer
        const layer: Layer | undefined = document.getLayer(0) as Layer | undefined;

        // Expect
        expect(layer).toBeDefined();
    });
});