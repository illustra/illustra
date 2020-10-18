import fs from "fs";
import { Document } from "../../";

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

test("creates a polygon shape layer", async () => {

    // Create shape
    document.createShapeLayer({
        name: "shape",
        shape: {
            type: "polygon",
            width: 300,
            height: 500,
            sides: 5,
            fill: "#ffffff"
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/shapeLayer/exports/create/polygon.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates a polygon shape layer with a stroke", async () => {

    // Create shape
    document.createShapeLayer({
        name: "shape",
        shape: {
            type: "polygon",
            width: 300,
            height: 500,
            sides: 5,
            fill: "#ffffff",
            stroke: "#ff0000",
            strokeWidth: 15
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/shapeLayer/exports/create/polygonStroke.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates an ellipse shape layer", async () => {

    // Create shape
    document.createShapeLayer({
        name: "shape",
        shape: {
            type: "ellipse",
            width: 300,
            height: 500,
            fill: "#ffffff"
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/shapeLayer/exports/create/ellipse.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("creates an ellipse shape layer with a stroke", async () => {

    // Create shape
    document.createShapeLayer({
        name: "shape",
        shape: {
            type: "ellipse",
            width: 300,
            height: 500,
            fill: "#ffffff",
            stroke: "#ff0000",
            strokeWidth: 15
        },
        top: 200,
        left: 250
    });

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/shapeLayer/exports/create/ellipseStroke.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});