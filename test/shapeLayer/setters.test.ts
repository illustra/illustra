import { createShapeLayer, Document, ShapeLayer } from "../../src/internal";

let document: Document;
let shapeLayer: ShapeLayer;

beforeEach(() => {

    // Create document
    document = new Document({
        width: 1920,
        height: 1080
    });

    // Create shape layer
    shapeLayer = document.createShapeLayer({
        name: "shape",
        shape: {
            type: "polygon",
            width: 100,
            height: 100,
            sides: 5
        }
    });
});

test("sets the width of a shape layer", () => {

    // Set width errors
    expect(() => shapeLayer.setWidth(-100)).toThrow("Width can't be less than 0");

    // Set width
    shapeLayer.setWidth(200);

    // Expect
    expect(shapeLayer.width).toBe(200);
});

test("sets the height of a shape layer", () => {

    // Set height errors
    expect(() => shapeLayer.setHeight(-100)).toThrow("Height can't be less than 0");

    // Set height
    shapeLayer.setHeight(200);

    // Expect
    expect(shapeLayer.height).toBe(200);
});

test("sets the sides of a shape layer", () => {

    // Set sides errors
    expect(() => shapeLayer.setSides(-5)).toThrow("Sides can't be less than 0");

    // Set sides
    shapeLayer.setSides(6);

    // Expect
    expect(shapeLayer.sides).toBe(6);

    // Reset sides
    shapeLayer.setSides();

    // Expect
    expect(shapeLayer.sides).toBe(undefined);
});

test("sets the corner radius of a shape layer", () => {

    // Set corner radius errors
    expect(() => shapeLayer.setCornerRadius(-10)).toThrow("Corner radius can't be less than 0");

    // Set corner radius
    shapeLayer.setCornerRadius(10);

    // Expect
    expect(shapeLayer.cornerRadius).toBe(10);

    // Reset corner radius
    shapeLayer.setCornerRadius();

    // Expect
    expect(shapeLayer.cornerRadius).toBe(undefined);
});

test("sets the fill of a shape layer", () => {

    // Set fill
    shapeLayer.setFill("#ff0000");

    // Expect
    expect(shapeLayer.fill).toBe("#ff0000");

    // Reset fill
    shapeLayer.setFill();

    // Expect
    expect(shapeLayer.fill).toBe(undefined);
});

test("sets the stroke of a shape layer", () => {

    // Set stroke
    shapeLayer.setStroke("#ff0000");

    // Expect
    expect(shapeLayer.stroke).toBe("#ff0000");

    // Reset stroke
    shapeLayer.setStroke();

    // Expect
    expect(shapeLayer.stroke).toBe(undefined);
});

test("sets the stroke width of a shape layer", () => {

    // Set stroke width errors
    expect(() => shapeLayer.setStrokeWidth(-5)).toThrow("Stroke width can't be less than 0");

    // Set stroke width
    shapeLayer.setStrokeWidth(5);

    // Expect
    expect(shapeLayer.strokeWidth).toBe(5);

    // Reset stroke width
    shapeLayer.setStrokeWidth();

    // Expect
    expect(shapeLayer.strokeWidth).toBe(undefined);
});