// Import
import * as illustra from "./internal";

// All
export default illustra;

// Document
export {
    Document,
    DocumentData
} from "./internal";

// Layer
export type Layer = InstanceType<typeof illustra.Layer>;
export {
    AlignOptions,
    AlignType,
    BlendMode,
    createLayer,
    ExportMetadata,
    ExportTypes,
    Format,
    LayerData,
    PathOrWithMetadataOptions,
    Units
} from "./internal";

// Polygon
export type Polygon = InstanceType<typeof illustra.Polygon>;
export {
    createPolygon,
    PolygonShapeData,
    PolygonData
} from "./internal";

// Ellipse
export type Ellipse = InstanceType<typeof illustra.Ellipse>;
export {
    createEllipse,
    EllipseShapeData,
    EllipseData
} from "./internal";

// Text Layer
export type TextLayer = InstanceType<typeof illustra.TextLayer>;
export {
    createTextLayer,
    TextAlign,
    TextData,
    TextLayerData
} from "./internal";

// Clipping Mask
export type ClippingMask = InstanceType<typeof illustra.ClippingMask>;
export {
    ClippingMaskData,
    createClippingMask
} from "./internal";

// Color
export {
    Color,
    RGBA
} from "./internal";