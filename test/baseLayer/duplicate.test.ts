import { AnyLayer, BaseLayer, Document } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("duplicating a %s", (layerType: string) => {

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
    });

    it("duplicates", async () => {

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

        // Duplicate layer
        await layer.duplicate("duplicate");

        // Duplicate layer and name
        await layer.duplicate();

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", layerType, layerType, "duplicate"]);
    });
});