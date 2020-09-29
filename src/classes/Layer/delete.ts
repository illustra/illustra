import Layer from "./Layer";

export default function deleteLayer(layer: Layer) {

    // Remove layer
    layer.document.layers.splice(layer.position, 1);
}