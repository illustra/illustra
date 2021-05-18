import { createClippingMask, createEllipse, createLayer, createPolygon, createTextLayer, AnyLayer, BLEND_MODES, Edit, ILAData, LAYER_TYPE_CLIPPING_MASK, LAYER_TYPE_ELLIPSE, LAYER_TYPE_LAYER, LAYER_TYPE_POLYGON, LAYER_TYPE_TEXT } from "../../../internal";

export default async function parseILAData(ilaData: ILAData, assets: Array<string | Buffer>): Promise<AnyLayer> {

    // Define created layer
    let createdLayer: AnyLayer;

    // Invalid data
    if (typeof ilaData.name !== "string") throw new Error("Error parsing Illustra file");
    if (![LAYER_TYPE_LAYER, LAYER_TYPE_TEXT, LAYER_TYPE_POLYGON, LAYER_TYPE_ELLIPSE, LAYER_TYPE_CLIPPING_MASK].includes(ilaData.type)) throw new Error("Error parsing Illustra file");
    if (typeof ilaData.left !== "number") throw new Error("Error parsing Illustra file");
    if (typeof ilaData.top !== "number") throw new Error("Error parsing Illustra file");
    if (!(ilaData.edits instanceof Array)) throw new Error("Error parsing Illustra file");
    if ((typeof ilaData.opacity !== "number") || (ilaData.opacity < 0) || (ilaData.opacity > 100)) throw new Error("Error parsing Illustra file");
    if (!BLEND_MODES.includes(ilaData.blendMode)) throw new Error("Error parsing Illustra file");

    // Text layer
    if (ilaData.type === LAYER_TYPE_TEXT) {

        // Invalid data
        if (typeof ilaData.text !== "string") throw new Error("Error parsing Illustra file");
        if ((ilaData.font !== undefined) && (typeof ilaData.font !== "string")) throw new Error("Error parsing Illustra file");
        if (typeof ilaData.fontSize !== "number") throw new Error("Error parsing Illustra file");
        if ((ilaData.fontWeight !== undefined) && (typeof ilaData.fontWeight !== "string")) throw new Error("Error parsing Illustra file");
        if (typeof ilaData.color !== "string") throw new Error("Error parsing Illustra file");
        if (typeof ilaData.maxWidth !== "number") throw new Error("Error parsing Illustra file");

        // Create layer
        createdLayer = createTextLayer({
            name: ilaData.name,
            text: {
                text: ilaData.text,
                font: ilaData.font,
                fontSize: ilaData.fontSize,
                fontWeight: ilaData.fontWeight,
                color: ilaData.color,
                maxWidth: ilaData.maxWidth
            },
            left: ilaData.left,
            top: ilaData.top
        });
    }

    // Polygon layer
    else if (ilaData.type === LAYER_TYPE_POLYGON) {

        // Invalid data
        if (typeof ilaData.width !== "number") throw new Error("Error parsing Illustra file");
        if (typeof ilaData.height !== "number") throw new Error("Error parsing Illustra file");
        if ((ilaData.fill !== undefined) && (typeof ilaData.fill !== "string")) throw new Error("Error parsing Illustra file");
        if ((ilaData.stroke !== undefined) && (typeof ilaData.stroke !== "string")) throw new Error("Error parsing Illustra file");
        if ((ilaData.strokeWidth !== undefined) && (typeof ilaData.strokeWidth !== "number")) throw new Error("Error parsing Illustra file");
        if (typeof ilaData.sides !== "number") throw new Error("Error parsing Illustra file");

        // Create layer
        createdLayer = createPolygon({
            name: ilaData.name,
            shape: {
                width: ilaData.width,
                height: ilaData.height,
                fill: ilaData.fill,
                stroke: ilaData.stroke,
                strokeWidth: ilaData.strokeWidth,
                sides: ilaData.sides
            },
            left: ilaData.left,
            top: ilaData.top
        });
    }

    // Ellipse layer
    else if (ilaData.type === LAYER_TYPE_ELLIPSE) {

        // Invalid data
        if (typeof ilaData.width !== "number") throw new Error("Error parsing Illustra file");
        if (typeof ilaData.height !== "number") throw new Error("Error parsing Illustra file");
        if ((ilaData.fill !== undefined) && (typeof ilaData.fill !== "string")) throw new Error("Error parsing Illustra file");
        if ((ilaData.stroke !== undefined) && (typeof ilaData.stroke !== "string")) throw new Error("Error parsing Illustra file");
        if ((ilaData.strokeWidth !== undefined) && (typeof ilaData.strokeWidth !== "number")) throw new Error("Error parsing Illustra file");

        // Create layer
        createdLayer = createEllipse({
            name: ilaData.name,
            shape: {
                width: ilaData.width,
                height: ilaData.height,
                fill: ilaData.fill,
                stroke: ilaData.stroke,
                strokeWidth: ilaData.strokeWidth
            },
            left: ilaData.left,
            top: ilaData.top
        });
    }

    // Clipping mask layer
    else if (ilaData.type === LAYER_TYPE_CLIPPING_MASK) {

        // Invalid data
        if (typeof ilaData.mask !== "object") throw new Error("Error parsing Illustra file");
        if (typeof ilaData.source !== "object") throw new Error("Error parsing Illustra file");

        // Create layer
        createdLayer = createClippingMask({
            name: ilaData.name,
            mask: await parseILAData(ilaData.mask, assets),
            source: await parseILAData(ilaData.source, assets),
            left: ilaData.left,
            top: ilaData.top
        });
    }

    // Layer
    else createdLayer = await createLayer({
        name: ilaData.name,
        image: assets[ilaData.inputImageID - 1],
        left: ilaData.left,
        top: ilaData.top
    });

    // Set data
    ilaData.edits.forEach((e: Edit) => {

        // Rotate
        if (e.type === "rotate") {

            // Invalid data
            if (typeof e.degrees !== "number") throw new Error("Error parsing Illustra file");

            // Rotate
            createdLayer.rotate(e.degrees);
        }

        // Resize
        else if (e.type === "resize") {

            // Invalid data
            if ((e.width !== undefined) && (typeof e.width !== "number")) throw new Error("Error parsing Illustra file");
            if ((e.height !== undefined) && (typeof e.height !== "number")) throw new Error("Error parsing Illustra file");

            // Resize
            createdLayer.resize(e.width, e.height);
        }

        // Reflect
        else if (e.type === "reflect") {

            // Invalid data
            if (!["vertical", "horizontal"].includes(e.direction)) throw new Error("Error parsing Illustra file");

            // Reflect
            createdLayer.reflect(e.direction);
        }

        // Hue
        else if (e.type === "hue") {

            // Invalid data
            if (typeof e.degrees !== "number") throw new Error("Error parsing Illustra file");

            // Hue
            createdLayer.hue(e.degrees);
        }

        // Saturation
        else if (e.type === "saturation") {

            // Invalid data
            if (typeof e.amount !== "number") throw new Error("Error parsing Illustra file");

            // Saturation
            createdLayer.saturation(e.amount);
        }

        // Brightness
        else if (e.type === "brightness") {

            // Invalid data
            if (typeof e.amount !== "number") throw new Error("Error parsing Illustra file");

            // Brightness
            createdLayer.brightness(e.amount);
        }

        // Invert
        else if (e.type === "invert") createdLayer.invert();

        // Blur
        else if (e.type === "blur") {

            // Invalid data
            if (typeof e.sigma !== "number") throw new Error("Error parsing Illustra file");

            // Blur
            createdLayer.blur(e.sigma);
        }

        // Invalid data
        else throw new Error("Error parsing Illustra file");
    });
    createdLayer.setOpacity(ilaData.opacity);
    createdLayer.setBlendMode(ilaData.blendMode);

    // Return
    return createdLayer;
}