// Document
export { default as Document, DocumentData } from "./classes/Document/Document";

// Layer
export { default as Layer, BlendMode } from "./classes/Layer/Layer";
export { default as createLayer } from "./createLayer";
export { ExportMetadata } from "./classes/Layer/exportTo";

// Shape Layer
export { default as ShapeLayer } from "./classes/ShapeLayer/ShapeLayer";
export { default as createShapeLayer } from "./createShapeLayer";

// Text Layer
export { default as TextLayer } from "./classes/TextLayer/TextLayer";
export { default as createTextLayer } from "./createTextLayer";

// Clipping Mask
export { default as ClippingMask } from "./classes/ClippingMask/ClippingMask";
export { default as createClippingMask } from "./createClippingMask";