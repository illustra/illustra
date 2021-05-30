import { AnyLayer, Edit } from "../../internal";

export default function removeEdit(layer: AnyLayer, editID: number): boolean {

    // Debug
    layer._debug(`Removing edit with ID ${editID}`);

    // Get edit index
    const editIndex: number = layer.edits.findIndex((e: Edit) => e.id === editID);

    // Invalid edit ID
    if (editIndex === -1) return false;

    // Remove from edits
    layer.edits.splice(editIndex, 1);

    // Return
    return true;
}