import { Document } from "../../src/internal";

describe("setting the name of documents", () => {

    it("sets the name of a document", () => {

        // Create document
        const document: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Set name
        document.setName("Document");

        // Expect
        expect(document.name).toBe("Document");
    });
});