import { Document, Layer } from "../../";

test("deletes a layer", async () => {

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

    // Delete layer
    logo.delete();

    // Expect layer order
    let layers: string[] = document.layers.map((l: Layer) => l.name);
    expect(layers).toStrictEqual(["background"]);
});