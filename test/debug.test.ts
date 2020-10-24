import { createLayer, Document, Layer } from "../";

test("logs debug info", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080,
        debugMode: true
    });

    // Create background
    await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Create other background
    const otherBackground: Layer = await createLayer({
        name: "otherBackground",
        file: "test/assets/black.png",
        debugMode: true
    });

    // Export
    await document.exportTo("png", "buffer");
    await otherBackground.exportTo("png", "buffer");
});