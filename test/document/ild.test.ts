import fs from "fs";
import { importILA, Document, Layer } from "../../src/internal";

describe("exporting and importing a document as an ILD file", () => {

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
            image: "test/assets/black.png"
        });
    });

    afterAll(() => {

        // Delete exported ILD
        try {
            fs.unlinkSync("test/document/exports/ild/exportILD.out.ild");
            fs.unlinkSync("test/document/exports/ild/1.png");
        } catch (error) { }
    });

    it("exports and imports as an ILD file", async () => {

        // Export errors
        expect(async () => await document.exportILD("file")).rejects.toThrow("Path must be specified if exportType is 'file'");

        // Export document
        await document.exportILD("file", "test/document/exports/ild/exportILD.out.ild");

        // Import document
        const importedDocument: Document = await Document.importILD("test/document/exports/ild/exportILD.out.ild");

        // Expect
        expect(importedDocument.name).toBe(document.name);
        expect(importedDocument.width).toBe(document.width);
        expect(importedDocument.height).toBe(document.height);
    });

    it("exports and imports as an ILD buffer", async () => {

        // Export document
        const exportedDocument: Buffer = await document.exportILD("buffer");

        // Import document
        const importedDocument: Document = await Document.importILD(exportedDocument);

        // Expect
        expect(importedDocument.name).toBe(document.name);
        expect(importedDocument.width).toBe(document.width);
        expect(importedDocument.height).toBe(document.height);
    });

    it("exports and imports as an ILD file with an assets directory", async () => {

        // Export document
        const exportedDocument: Buffer = await document.exportILD("buffer");

        // Import document
        await Document.importILD(exportedDocument, "test/document/exports/ild");

        // Get asset image
        const assetImage: Buffer = fs.readFileSync("test/document/exports/ild/1.png");

        // Expect
        expect(assetImage).toBeDefined();
    });
});

it("exports and imports as an ILD file with a buffer asset", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Get image
    const image: Buffer = fs.readFileSync("test/assets/apixel.png");

    // Create layer
    await document.createLayer({
        name: "layer",
        image
    });

    // Export document
    const exportedDocument: Buffer = await document.exportILD("buffer");

    // Import document
    await Document.importILD(exportedDocument);
});

it("exports and imports as an ILD file with an SVG asset", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create layer
    await document.createLayer({
        name: "layer",
        image: `
            <svg>
                <circle cx="200" cy="200" r="200" fill="#ffffff" />
            </svg>
        `
    });

    // Export document
    const exportedDocument: Buffer = await document.exportILD("buffer");

    // Import document
    const importedDocument: Document = await Document.importILD(exportedDocument);

    // Expect
    expect((importedDocument.getLayer(0) as Layer)._svg).toBe(true);
});

describe.each(["name", "width", "height", "layers"])("importing an ILD file with a %s error", (name: string) => {

    it("checks for errors when importing an ILD file", async () => {

        // Export errors
        await expect(async () => await Document.importILD(`test/document/exports/ild/invalidFiles/${name}.ild`)).rejects.toThrow("Error parsing Illustra file");
    });
});