import { createLayer, BaseLayer, Document, Layer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("checking a %s's position", (layerType: string) => {

    it("checks a layer's position", async () => {

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

        // Add layer
        const layer: BaseLayer = await addLayer(layerType, document);

        // Create other background
        const otherBackground: Layer = await createLayer({
            name: "otherBackground",
            file: "test/assets/black.png"
        });

        // Expect
        expect(layer.position).toBe(1);
        expect(otherBackground.position).toBe(0);
    });
});