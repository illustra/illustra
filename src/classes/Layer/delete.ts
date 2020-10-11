import Layer from "./Layer";

export default function deleteLayer(layer: Layer) {

    // Debug
    layer._debug("Deleting");

    // Remove layer
    layer.document.layers.splice(layer.position, 1);
}