// Document
export {
    default as Document,
    DocumentData
} from "./classes/Document/Document";
export * from "./classes/Document/ild/ILDData";

// Base Layer
export {
    default as BaseLayer,
    AnyLayer,
    BaseLayerData,
    BlendMode,
    Blur,
    Brightness,
    BLEND_MODES,
    Edit,
    Hue,
    Invert,
    Reflect,
    Resize,
    Rotate,
    Saturation
} from "./classes/BaseLayer/BaseLayer";
export * from "./classes/BaseLayer/align";
export * from "./classes/BaseLayer/exportTo";
export * from "./classes/BaseLayer/ila/ILAData";
export { default as importILA } from "./importILA";

// Layer
export {
    default as Layer,
    LayerData
} from "./classes/Layer/Layer";
export { default as createLayer } from "./createLayer";

// Shape Layer
export {
    default as ShapeLayer,
    ShapeData,
    ShapeLayerData
} from "./classes/ShapeLayer/ShapeLayer";

// Polygon
export {
    default as Polygon,
    PolygonShapeData,
    PolygonData
} from "./classes/Polygon/Polygon";
export { default as createPolygon } from "./createPolygon";

// Ellipse
export {
    default as Ellipse,
    EllipseShapeData,
    EllipseData
} from "./classes/Ellipse/Ellipse";
export { default as createEllipse } from "./createEllipse";

// Text Layer
export {
    default as TextLayer,
    DEFAULT_FONT_SIZE,
    TextData,
    TextLayerData
} from "./classes/TextLayer/TextLayer";
export { default as createTextLayer } from "./createTextLayer";

// Clipping Mask
export {
    default as ClippingMask,
    ClippingMaskData
} from "./classes/ClippingMask/ClippingMask";
export { default as createClippingMask } from "./createClippingMask";

// Color
export * from "./color";