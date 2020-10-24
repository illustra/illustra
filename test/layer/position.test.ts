import { createLayer, Document, Layer } from "../../";

test("checks a layer's position", async () => {

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

    // Create other background
    const otherBackground: Layer = await createLayer({
        name: "otherBackground",
        file: "test/assets/black.png"
    });

    // Expect
    expect(logo.position).toBe(1);
    expect(otherBackground.position).toBe(0);
});