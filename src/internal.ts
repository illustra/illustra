// Document
export { default as Document, DocumentData } from "./classes/Document/Document";

// Base Layer
export { default as BaseLayer, AnyLayer, BlendMode, BaseLayerData } from "./classes/BaseLayer/BaseLayer";
export { AlignOptions, AlignType, Units } from "./classes/BaseLayer/align";
export { ExportMetadata, ExportTypes, Format, PathOrWithMetadataOptions } from "./classes/BaseLayer/exportTo";

// Layer
export { default as Layer, LayerData } from "./classes/Layer/Layer";
export { default as createLayer } from "./createLayer";

// Shape Layer
export { default as ShapeLayer, ShapeData, ShapeLayerData } from "./classes/ShapeLayer/ShapeLayer";

// Polygon
export { default as Polygon, PolygonShapeData, PolygonData } from "./classes/Polygon/Polygon";
export { default as createPolygon } from "./createPolygon";

// Ellipse
export { default as Ellipse, EllipseShapeData, EllipseData } from "./classes/Ellipse/Ellipse";
export { default as createEllipse } from "./createEllipse";

// Text Layer
export { default as TextLayer, DEFAULT_FONT_SIZE, TextAlign, TextData, TextLayerData } from "./classes/TextLayer/TextLayer";
export { default as createTextLayer } from "./createTextLayer";

// Clipping Mask
export { default as ClippingMask, ClippingMaskData } from "./classes/ClippingMask/ClippingMask";
export { default as createClippingMask } from "./createClippingMask";

// Color
export { Color, RGBA } from "./color";