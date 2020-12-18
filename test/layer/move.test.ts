import { createLayer, Document, Layer } from "../../src/internal";

let document: Document;
let logo: Layer;

beforeEach(async () => {

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

    // Add logo
    logo = await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png"
    });
});

test("moves a layer", async () => {

    // Create other background
    const otherBackground: Layer = await createLayer({
        name: "otherBackground",
        file: "test/assets/black.png"
    });

    // Move errors
    expect(() => otherBackground.move(2)).toThrow("This layer isn't a part of a document");

    // Move layer
    logo.move(0);

    // Expect layer order
    let layers: string[] = document.layers.map((l: Layer) => l.name);
    expect(layers).toStrictEqual(["logo", "background"]);
});

test("moves a layer relatively", async () => {

    // Move layer
    logo.move(-1, true);

    // Expect layer order
    let layers: string[] = document.layers.map((l: Layer) => l.name);
    expect(layers).toStrictEqual(["logo", "background"]);
});