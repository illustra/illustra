import fs from "fs";
import { Document, ExportMetadata, Layer } from "../../";

let document: Document;
let background: Layer;
let expectedImage: string;

beforeAll(async () => {

    // Create document
    document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    background = await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Get expected image
    expectedImage = fs.readFileSync("test/layer/exports/exportTo.png").toString("base64");
});

afterAll(() => {

    // Delete exported image
    try {
        fs.unlinkSync("test/layer/exports/exportTo.out.png");
    } catch (error) { }
});

test("exports a layer as a file", async () => {

    // Export errors
    // @ts-ignore
    expect(async () => await background.exportTo("invalid")).rejects.toThrow("Invalid format");
    // @ts-ignore
    expect(async () => await background.exportTo("png", "invalid")).rejects.toThrow("Invalid export type");
    // @ts-ignore
    expect(async () => await background.exportTo("png", "file")).rejects.toThrow("Path must be specified if exportType is 'file'");

    // Export layer
    await background.exportTo("png", "file", "test/layer/exports/exportTo.out.png");

    // Get exported image
    const exportedImage: string = fs.readFileSync("test/layer/exports/exportTo.out.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("exports a layer as a buffer", async () => {

    // Export layer
    const exportedImage: string = (await background.exportTo("png", "buffer")).toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("exports a layer as a buffer with metadata", async () => {

    // Export layer
    const exportedImage: ExportMetadata = await background.exportTo("png", "buffer", true);

    // Expect
    expect(exportedImage.data.toString("base64")).toBe(expectedImage);
    expect(exportedImage.width).toBe(1920);
    expect(exportedImage.height).toBe(1080);
});