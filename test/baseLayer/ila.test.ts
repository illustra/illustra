import fs from "fs";
import { importILA, AnyLayer, BaseLayer, ClippingMask, Document, Ellipse, Layer, Polygon, TextLayer } from "../../src/internal";
import addLayer from "./addLayer";

describe.each(["layer", "textLayer", "polygon", "ellipse", "clippingMask"])("exporting and importing a %s as an ILA file", (layerType: string) => {

    let document: Document;
    let layer: BaseLayer;

    beforeAll(async () => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Add layer
        layer = await addLayer(layerType, document);

        // Make edits
        if (["layer", "polygon", "ellipse"].includes(layerType)) layer.rotate(90);
        if (["layer", "polygon", "ellipse"].includes(layerType)) layer.resize(300, 300);
        layer.reflect("vertical");
        layer.hue(30);
        layer.saturation(50);
        layer.brightness(50);
        layer.invert();
        layer.blur(10);
        layer.setOpacity(50);
        layer.setBlendMode("overlay");
    });

    afterAll(() => {

        // Delete exported ILA
        try {
            fs.unlinkSync(`test/baseLayer/exports/ila/${layerType}/exportILA.out.ila`);
            fs.unlinkSync(`test/baseLayer/exports/ila/${layerType}/1.png`);
        } catch (error) { }
    });

    it("exports and imports as an ILA file", async () => {

        // Export errors
        expect(async () => await layer.exportILA("file")).rejects.toThrow("Path must be specified if exportType is 'file'");

        // Export layer
        await layer.exportILA("file", `test/baseLayer/exports/ila/${layerType}/exportILA.out.ila`);

        // Import layer
        const importedLayer: AnyLayer = await importILA(`test/baseLayer/exports/ila/${layerType}/exportILA.out.ila`);

        // Expect
        expect(importedLayer.name).toBe(layer.name);
        expect(importedLayer.left).toBe(layer.left);
        expect(importedLayer.top).toBe(layer.top);
        expect(importedLayer._edits).toStrictEqual(layer._edits);
        expect(importedLayer.opacity).toBe(layer.opacity);
        expect(importedLayer.blendMode).toBe(layer.blendMode);

        // Expect: Text layer
        if ((importedLayer instanceof TextLayer) && (layer instanceof TextLayer)) {
            expect(importedLayer.text).toBe(layer.text);
            expect(importedLayer.font).toBe(layer.font);
            expect(importedLayer.fontSize).toBe(layer.fontSize);
            expect(importedLayer.fontWeight).toBe(layer.fontWeight);
            expect(importedLayer.color).toBe(layer.color);
            expect(importedLayer.maxWidth).toBe(layer.maxWidth);
        }

        // Expect: Polygon layer
        else if ((importedLayer instanceof Polygon) && (layer instanceof Polygon)) {
            expect(importedLayer.width).toBe(layer.width);
            expect(importedLayer.height).toBe(layer.height);
            expect(importedLayer.fill).toBe(layer.fill);
            expect(importedLayer.stroke).toBe(layer.stroke);
            expect(importedLayer.strokeWidth).toBe(layer.strokeWidth);
            expect(importedLayer.sides).toBe(layer.sides);
        }

        // Expect: Ellipse layer
        else if ((importedLayer instanceof Ellipse) && (layer instanceof Ellipse)) {
            expect(importedLayer.width).toBe(layer.width);
            expect(importedLayer.height).toBe(layer.height);
            expect(importedLayer.fill).toBe(layer.fill);
            expect(importedLayer.stroke).toBe(layer.stroke);
            expect(importedLayer.strokeWidth).toBe(layer.strokeWidth);
        }

        // Expect: Clipping mask layer
        else if ((importedLayer instanceof ClippingMask) && (layer instanceof ClippingMask)) {
            expect(importedLayer.mask).toBeInstanceOf(Ellipse);
            expect(importedLayer.source).toBeInstanceOf(Layer);
        }
    });

    it("exports and imports as an ILA buffer", async () => {

        // Export layer
        const exportedLayer: Buffer = await layer.exportILA("buffer");

        // Import layer
        const importedLayer: AnyLayer = await importILA(exportedLayer);

        // Expect
        expect(importedLayer.name).toBe(layer.name);
        expect(importedLayer.left).toBe(layer.left);
        expect(importedLayer.top).toBe(layer.top);
        expect(importedLayer._edits).toStrictEqual(layer._edits);
        expect(importedLayer.opacity).toBe(layer.opacity);
        expect(importedLayer.blendMode).toBe(layer.blendMode);

        // Expect: Text layer
        if ((importedLayer instanceof TextLayer) && (layer instanceof TextLayer)) {
            expect(importedLayer.text).toBe(layer.text);
            expect(importedLayer.font).toBe(layer.font);
            expect(importedLayer.fontSize).toBe(layer.fontSize);
            expect(importedLayer.fontWeight).toBe(layer.fontWeight);
            expect(importedLayer.color).toBe(layer.color);
            expect(importedLayer.maxWidth).toBe(layer.maxWidth);
        }

        // Expect: Polygon layer
        else if ((importedLayer instanceof Polygon) && (layer instanceof Polygon)) {
            expect(importedLayer.width).toBe(layer.width);
            expect(importedLayer.height).toBe(layer.height);
            expect(importedLayer.fill).toBe(layer.fill);
            expect(importedLayer.stroke).toBe(layer.stroke);
            expect(importedLayer.strokeWidth).toBe(layer.strokeWidth);
            expect(importedLayer.sides).toBe(layer.sides);
        }

        // Expect: Ellipse layer
        else if ((importedLayer instanceof Ellipse) && (layer instanceof Ellipse)) {
            expect(importedLayer.width).toBe(layer.width);
            expect(importedLayer.height).toBe(layer.height);
            expect(importedLayer.fill).toBe(layer.fill);
            expect(importedLayer.stroke).toBe(layer.stroke);
            expect(importedLayer.strokeWidth).toBe(layer.strokeWidth);
        }

        // Expect: Clipping mask layer
        else if ((importedLayer instanceof ClippingMask) && (layer instanceof ClippingMask)) {
            expect(importedLayer.mask).toBeInstanceOf(Ellipse);
            expect(importedLayer.source).toBeInstanceOf(Layer);
        }
    });

    it("exports and imports as an ILA file with an assets directory", async () => {

        // Export layer
        const exportedLayer: Buffer = await layer.exportILA("buffer");

        // Import layer
        await importILA(exportedLayer, `test/baseLayer/exports/ila/${layerType}`);

        // Expect
        if ((layerType === "layer") || (layerType === "clippingMask")) {

            // Get asset image
            const assetImage: Buffer = fs.readFileSync(`test/baseLayer/exports/ila/${layerType}/1.png`);

            // Expect
            expect(assetImage).toBeDefined();
        }
    });
});

it("exports and imports as an ILA file with a buffer asset", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Get image
    const image: Buffer = fs.readFileSync("test/assets/apixel.png");

    // Create layer
    const layer: Layer = await document.createLayer({
        name: "layer",
        buffer: image
    });

    // Export layer
    const exportedLayer: Buffer = await layer.exportILA("buffer");

    // Import layer
    await importILA(exportedLayer);
});

it("exports and imports as an ILA file with an SVG asset", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create layer
    const layer: Layer = await document.createLayer({
        name: "layer",
        svg: `
            <svg>
                <circle cx="200" cy="200" r="200" fill="#ffffff" />
            </svg>
        `
    });

    // Export layer
    const exportedLayer: Buffer = await layer.exportILA("buffer");

    // Import layer
    const importedLayer: Layer = await importILA(exportedLayer) as Layer;

    // Expect
    expect(importedLayer._svg).toBe(true);
});

it("exports and imports a layer without any input data as an ILA file", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create layer
    const layer: Layer = await document.createLayer({
        name: "layer"
    });

    // Export layer
    const exportedLayer: Buffer = await layer.exportILA("buffer");

    // Import layer
    await importILA(exportedLayer);
});

describe.each(["name", "type", "left", "top", "edits", "opacity", "blendMode", "textLayer/text", "textLayer/font", "textLayer/fontSize", "textLayer/fontWeight", "textLayer/color", "textLayer/maxWidth", "polygon/width", "polygon/height", "polygon/fill", "polygon/stroke", "polygon/strokeWidth", "polygon/sides", "ellipse/width", "ellipse/height", "ellipse/fill", "ellipse/stroke", "ellipse/strokeWidth", "clippingMask/mask", "clippingMask/source", "edits/edit", "edits/rotate/degrees", "edits/resize/width", "edits/resize/height", "edits/reflect/direction", "edits/hue/degrees", "edits/saturation/amount", "edits/brightness/amount", "edits/blur/sigma"])("importing an ILA file with a %s error", (name: string) => {

    it("checks for errors when importing an ILA file", async () => {

        // Export errors
        await expect(async () => await importILA(`test/baseLayer/exports/ila/invalidFiles/${name}.ila`)).rejects.toThrow("Error parsing Illustra file");
    });
});