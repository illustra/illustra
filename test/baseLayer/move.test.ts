import { createLayer, AnyLayer, BaseLayer, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("moving a %s", (layerType: string) => {

    let document: Document;
    let layer: BaseLayer;

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

        // Add layer
        layer = await addLayer(layerType, document);
    });

    it("moves", async () => {

        // Create other background
        const otherBackground: Layer = await createLayer({
            name: "otherBackground",
            image: "test/assets/black.png"
        });

        // Move errors
        expect(() => otherBackground.move(2)).toThrow("This layer isn't a part of a document");

        // Move layer
        layer.move(0);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual([layerType, "background"]);
    });

    it("moves relatively", async () => {

        // Move layer
        layer.move(-1, true);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual([layerType, "background"]);
    });
});