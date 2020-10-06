import { Document, Layer } from "../../";

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
        data: "test/assets/black.png"
    });
});

test("gets a layer by name", () => {

    // Get layer
    const layer: Layer | undefined = document.getLayer("background");

    // Expect
    expect(layer).toBeDefined();
});

test("gets a layer by index", () => {

    // Get layer
    const layer: Layer | undefined = document.getLayer(0);

    // Expect
    expect(layer).toBeDefined();
});