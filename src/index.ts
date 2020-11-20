// Import
import * as illustra from "./internal";

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

// Shape Layer
export type ShapeLayer = InstanceType<typeof illustra.ShapeLayer>;
export {
    CommonShapeData,
    createShapeLayer,
    EllipseData,
    PolygonData,
    Shape,
    ShapeData,
    ShapeLayerData
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