import { AnyLayer, ReflectDirection } from "../../internal";

export default function rotate(layer: AnyLayer, direction: ReflectDirection): number {

    // Debug
    layer._debug(`Reflecting ${direction === "vertical" ? "vertically" : "horizontally"}`);

    // Add to edits
    layer.edits.push({
        id: ++layer._lastEditID,
        type: "reflect",
        direction
    });

    // Return
    return layer._lastEditID;
}