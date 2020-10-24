import fs from "fs";
import { createTextLayer, Document, TextLayer } from "../../";

let document: Document;

beforeEach(async () => {

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
});

test("creates a text layer", async () => {

    // Create shape so text is visible
    document.createShapeLayer({
        name: "shape",
        shape: {
            type: "ellipse",
            width: 200,
            height: 50,
            fill: "#ffffff"
        },
        top: 190,
        left: 200
    });

    // Create text
    document.createTextLayer({
        name: "text",
        text: {
            text: "example"
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/textLayer/exports/create/text.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a text layer with a custom font", async () => {

    // Create text
    document.createTextLayer({
        name: "text",
        text: {
            text: "example",
            font: "test/assets/roboto.ttf",
            fontSize: 65,
            color: "#ffffff"
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/textLayer/exports/create/font.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a text layer with a custom font weight", async () => {

    // Create text
    document.createTextLayer({
        name: "text",
        text: {
            text: "example",
            fontSize: 65,
            fontWeight: "bold",
            color: "#ffffff"
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/textLayer/exports/create/fontWeight.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a text layer with word wrapping and custom text alignment", async () => {

    // Create text
    document.createTextLayer({
        name: "text",
        text: {
            text: "example text with word wrapping and centering",
            fontSize: 65,
            textAlign: "center",
            color: "#ffffff",
            maxWidth: 400
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/textLayer/exports/create/textAlign.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a text layer with a custom line height", async () => {

    // Create text
    document.createTextLayer({
        name: "text",
        text: {
            text: "example text with word wrapping and line height",
            fontSize: 65,
            color: "#ffffff",
            lineHeight: 150,
            maxWidth: 400
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/textLayer/exports/create/lineHeight.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a text layer without a document", async () => {

    // Create text
    const text: TextLayer = await createTextLayer({
        name: "text",
        text: {
            text: "example"
        }
    });

    // Expect
    expect(text).toBeDefined();
});