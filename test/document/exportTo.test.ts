import fs from "fs";
import { Document, ExportMetadata } from "../../";

let document: Document;
let expectedImage: string;

beforeAll(async () => {

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
    await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png"
    });

    // Get expected image
    expectedImage = fs.readFileSync("test/document/exports/exportTo.png").toString("base64");
});

afterAll(() => {

    // Delete exported image
    try {
        fs.unlinkSync("test/document/exports/exportTo.out.png");
    } catch (error) { }
});

test("exports a document as a file", async () => {

    // Export errors
    // @ts-ignore
    expect(async () => await document.exportTo("invalid")).rejects.toThrow("Invalid format");
    // @ts-ignore
    expect(async () => await document.exportTo("png", "invalid")).rejects.toThrow("Invalid export type");

    // Export layer
    await document.exportTo("png", "file", "test/document/exports/exportTo.out.png");

    // Get exported image
    const exportedImage: string = fs.readFileSync("test/document/exports/exportTo.out.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("exports a layer as a buffer", async () => {

    // Export layer
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("exports a layer as a buffer with metadata", async () => {

    // Export layer
    const exportedImage: ExportMetadata = await document.exportTo("png", "buffer", true);

    // Expect
    expect(exportedImage.data.toString("base64")).toBe(expectedImage);
    expect(exportedImage.width).toBe(1920);
    expect(exportedImage.height).toBe(1080);
});