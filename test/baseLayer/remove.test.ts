import { createLayer, AnyLayer, BaseLayer, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("removing a %s", (layerType: string) => {

    it("removes a layer", async () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            image: "test/assets/black.png"
        });

        // Add layer
        const layer: BaseLayer = await addLayer(layerType, document);

        // Create other background
        const otherBackground: Layer = await createLayer({
            name: "otherBackground",
            image: "test/assets/black.png"
        });

        // Remove errors
        expect(() => otherBackground.remove()).toThrow("This layer isn't a part of a document");

        // Remove layer
        layer.remove();

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background"]);
    });
});