import { Document } from "../../src/internal";

test("creates a document", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Expect
    expect(document).toBeDefined();
});