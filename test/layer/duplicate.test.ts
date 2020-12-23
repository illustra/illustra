import { AnyLayer, Document, Layer } from "../../src/internal";

test("duplicates a layer", async () => {

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

    // Duplicate layer
    await logo.duplicate("duplicate");

    // Duplicate layer and name
    await logo.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "logo", "logo", "duplicate"]);
});