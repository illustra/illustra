import { createLayer, Document, Layer } from "../../src/internal";

test("creates a layer with a document", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    const background: Layer = await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Expect
    expect(background).toBeDefined();
    expect(background._initialize).resolves.toBeUndefined();
});

test("creates a layer without a document", async () => {

    // Create background
    const background: Layer = await createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Expect
    expect(background).toBeDefined();
    expect(background._initialize).resolves.toBeUndefined();
});