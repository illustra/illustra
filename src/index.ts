// Import
import * as illustra from "./internal";

// Document
export { Document, DocumentData } from "./internal";

// Layer
export type Layer = InstanceType<typeof illustra.Layer>;
export { BlendMode, createLayer, ExportMetadata } from "./internal";

// Shape Layer
export type ShapeLayer = InstanceType<typeof illustra.ShapeLayer>;
export { createShapeLayer } from "./internal";

// Text Layer
export type TextLayer = InstanceType<typeof illustra.TextLayer>;
export { createTextLayer } from "./internal";

// Clipping Mask
export type ClippingMask = InstanceType<typeof illustra.ClippingMask>;
export { createClippingMask } from "./internal";