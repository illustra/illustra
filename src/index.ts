// Import
import * as illustra from "./internal";

// All
export default illustra;

// Document
export {
    Document,
    DocumentData
} from "./internal";

// Base Layer
export type BaseLayer = InstanceType<typeof illustra.BaseLayer>;
export {
    AlignOptions,
    AlignType,
    AnyLayer,
    BaseLayerData,
    BlendMode,
    ExportMetadata,
    ExportTypes,
    Format,
    PathOrWithMetadataOptions,
    Units
} from "./internal";

// Layer
export type Layer = InstanceType<typeof illustra.Layer>;
export {
    createLayer,
    LayerData
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