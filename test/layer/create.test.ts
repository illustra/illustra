import { createLayer, Document, Layer } from "../../src/internal";

describe("creates layers", () => {

    it("creates with a document", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        const background: Layer = await document.createLayer({
            name: "background",
            image: "test/assets/black.png"
        });

        // Expect
        expect(background).toBeDefined();
        expect(background._initialize).resolves.toBeUndefined();
    });

    it("creates without a document", async () => {

        // Create background
        const background: Layer = await createLayer({
            name: "background",
            image: "test/assets/black.png"
        });

        // Expect
        expect(background).toBeDefined();
        expect(background._initialize).resolves.toBeUndefined();
    });
});