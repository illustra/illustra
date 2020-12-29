import { createLayer, AnyLayer, Document, Layer } from "../../src/internal";

describe("removing a layer", () => {

    it("removes a layer", async () => {

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
            file: "test/assets/apixel.png"
        });

        // Create other background
        const otherBackground: Layer = await createLayer({
            name: "otherBackground",
            file: "test/assets/black.png"
        });

        // Remove errors
        expect(() => otherBackground.remove()).toThrow("This layer isn't a part of a document");

        // Remove layer
        logo.remove();

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background"]);
    });
});