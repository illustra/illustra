import { createTextLayer, Document, TextLayer } from "../../src/internal";

describe("setting properties of a text layer", () => {

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

    it("sets the text", () => {

        // Set text
        textLayer.setText("example 2");

        // Expect
        expect(textLayer.text).toBe("example 2");
    });

    it("sets the font", () => {

        // Set font
        textLayer.setFont("Roboto");

        // Expect
        expect(textLayer.font).toBe("Roboto");

        // Reset font
        textLayer.setFont();

        // Expect
        expect(textLayer.font).toBe(undefined);
    });

    it("sets the font size", () => {

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

    it("sets the font weight", () => {

        // Set font weight
        textLayer.setFontWeight("bold");

        // Expect
        expect(textLayer.fontWeight).toBe("bold");

        // Reset font weight
        textLayer.setFontWeight();

        // Expect
        expect(textLayer.fontWeight).toBe(undefined);
    });

    it("sets the text align", () => {

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

    it("sets the color", () => {

        // Set color
        textLayer.setColor("#ff0000");

        // Expect
        expect(textLayer.color).toBe("#ff0000");

        // Reset color
        textLayer.setColor();

        // Expect
        expect(textLayer.color).toBe("#000000");
    });

    it("sets the line height", () => {

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

    it("sets the max width", () => {

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
});