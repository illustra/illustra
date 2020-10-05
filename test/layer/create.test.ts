import { Document, Layer } from "../../";

test("creates a layer", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    const background: Layer = await document.createLayer({
        name: "background",
        data: "test/assets/black.png"
    });

    // Expect
    expect(background).toBeDefined();
    expect(background._initialize).resolves.toBeUndefined();
});