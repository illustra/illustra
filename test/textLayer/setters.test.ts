import { createTextLayer, Document, TextLayer } from "../../src/internal";

let document: Document;
let textLayer: TextLayer;

beforeEach(() => {

    // Create document
    document = new Document({
        width: 1920,
        height: 1080
    });

    // Create text layer
    textLayer = document.createTextLayer({
        name: "text",
        text: {
            text: "example"
        }
    });
});

test("sets the text of a text layer", () => {

    // Set text
    textLayer.setText("example 2");

    // Expect
    expect(textLayer.text).toBe("example 2");
});

test("sets the font of a text layer", () => {

    // Set font
    textLayer.setFont("Roboto");

    // Expect
    expect(textLayer.font).toBe("Roboto");

    // Reset font
    textLayer.setFont();

    // Expect
    expect(textLayer.font).toBe(undefined);
});

test("sets the font size of a text layer", () => {

    // Set font size errors
    expect(() => textLayer.setFontSize(-5)).toThrow("Font size can't be less than 0");

    // Set font size
    textLayer.setFontSize(16);

    // Expect
    expect(textLayer.fontSize).toBe(16);

    // Reset font size
    textLayer.setFontSize();

    // Expect
    expect(textLayer.fontSize).toBe(24);
});

test("sets the font weight of a text layer", () => {

    // Set font weight
    textLayer.setFontWeight("bold");

    // Expect
    expect(textLayer.fontWeight).toBe("bold");

    // Reset font weight
    textLayer.setFontWeight();

    // Expect
    expect(textLayer.fontWeight).toBe(undefined);
});

test("sets the text align of a text layer", () => {

    // Set text align errors
    // @ts-ignore
    expect(() => textLayer.setTextAlign("invalid")).toThrow("Invalid text align");

    // Set text align
    textLayer.setTextAlign("center");

    // Expect
    expect(textLayer.textAlign).toBe("center");

    // Reset text align
    textLayer.setTextAlign();

    // Expect
    expect(textLayer.textAlign).toBe("left");
});

test("sets the color of a text layer", () => {

    // Set color
    textLayer.setColor("#ff0000");

    // Expect
    expect(textLayer.color).toBe("#ff0000");

    // Reset color
    textLayer.setColor();

    // Expect
    expect(textLayer.color).toBe("#000000");
});

test("sets the line height of a text layer", () => {

    // Set line height errors
    expect(() => textLayer.setLineHeight(-5)).toThrow("Line height can't be less than 0");

    // Set line height
    textLayer.setLineHeight(50);

    // Expect
    expect(textLayer.lineHeight).toBe(50);

    // Reset line height
    textLayer.setLineHeight();

    // Expect
    expect(textLayer.lineHeight).toBe(undefined);
});

test("sets the max width of a text layer", () => {

    // Set max width errors
    expect(() => textLayer.setMaxWidth(-5)).toThrow("Max width can't be less than 0");

    // Set max width
    textLayer.setMaxWidth(500);

    // Expect
    expect(textLayer.maxWidth).toBe(500);

    // Reset max width
    textLayer.setMaxWidth();

    // Expect
    expect(textLayer.maxWidth).toBe(1920);

    // Create text layer without document
    const otherTextLayer: TextLayer = createTextLayer({
        name: "text",
        text: {
            text: "example"
        }
    });

    // Reset max width
    otherTextLayer.setMaxWidth();

    // Expect
    expect(otherTextLayer.maxWidth).toBe(400);
});