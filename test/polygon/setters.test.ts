import { Document, Polygon } from "../../src/internal";

describe("setting properties of a polygon", () => {

    let document: Document;
    let polygon: Polygon;

    beforeEach(() => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Create polygon
        polygon = document.createPolygon({
            name: "polygon",
            shape: {
                width: 100,
                height: 100,
                sides: 5
            }
        });
    });

    it("sets the width", () => {

        // Set width errors
        expect(() => polygon.setWidth(-100)).toThrow("Width can't be less than 0");

        // Set width
        polygon.setWidth(200);

        // Expect
        expect(polygon.width).toBe(200);
    });

    it("sets the height", () => {

        // Set height errors
        expect(() => polygon.setHeight(-100)).toThrow("Height can't be less than 0");

        // Set height
        polygon.setHeight(200);

        // Expect
        expect(polygon.height).toBe(200);
    });

    it("sets the sides", () => {

        // Set sides errors
        expect(() => polygon.setSides(-5)).toThrow("Sides can't be less than 0");

        // Set sides
        polygon.setSides(6);

        // Expect
        expect(polygon.sides).toBe(6);
    });

    it("sets the fill", () => {

        // Set fill
        polygon.setFill("#ff0000");

        // Expect
        expect(polygon.fill).toBe("#ff0000");

        // Reset fill
        polygon.setFill();

        // Expect
        expect(polygon.fill).toBe(undefined);
    });

    it("sets the stroke", () => {

        // Set stroke
        polygon.setStroke("#ff0000");

        // Expect
        expect(polygon.stroke).toBe("#ff0000");

        // Reset stroke
        polygon.setStroke();

        // Expect
        expect(polygon.stroke).toBe(undefined);
    });

    it("sets the stroke width", () => {

        // Set stroke width errors
        expect(() => polygon.setStrokeWidth(-5)).toThrow("Stroke width can't be less than 0");

        // Set stroke width
        polygon.setStrokeWidth(5);

        // Expect
        expect(polygon.strokeWidth).toBe(5);

        // Reset stroke width
        polygon.setStrokeWidth();

        // Expect
        expect(polygon.strokeWidth).toBe(undefined);
    });
});