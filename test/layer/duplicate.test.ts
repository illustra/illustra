import { createEllipse, createLayer, AnyLayer, ClippingMask, Document, Ellipse, Layer, Polygon, TextLayer } from "../../src/internal";

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

test("duplicates a layer", async () => {

    // Add logo
    const logo: Layer = await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png"
    });

    // Duplicate layer
    await logo.duplicate("duplicate");

    // Duplicate layer and name
    await logo.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "logo", "logo", "duplicate"]);
});

test("duplicates a text layer", async () => {

    // Add text
    const text: TextLayer = document.createTextLayer({
        name: "text",
        text: {
            text: "example"
        }
    });

    // Duplicate layer
    await text.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "text", "text"]);
});

test("duplicates a polygon", async () => {

    // Add polygon
    const polygon: Polygon = document.createPolygon({
        name: "polygon",
        shape: {
            width: 300,
            height: 500,
            sides: 5,
            fill: "#ffffff"
        }
    });

    // Duplicate layer
    await polygon.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "polygon", "polygon"]);
});

test("duplicates an ellipse", async () => {

    // Add ellipse
    const ellipse: Ellipse = document.createEllipse({
        name: "ellipse",
        shape: {
            width: 300,
            height: 500,
            fill: "#ffffff"
        }
    });

    // Duplicate layer
    await ellipse.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "ellipse", "ellipse"]);
});

test("duplicates a clipping mask", async () => {

    // Add clipping mask
    const clippingMask: ClippingMask = document.createClippingMask({
        name: "clippingMask",
        mask: createEllipse({
            name: "ellipse",
            shape: {
                width: 500,
                height: 500,
                fill: "#ffffff"
            }
        }),
        source: await createLayer({
            name: "logo",
            file: "test/assets/apixel.png"
        })
    });

    // Duplicate layer
    await clippingMask.duplicate();

    // Expect layer order
    let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
    expect(layers).toStrictEqual(["background", "clippingMask", "clippingMask"]);
});