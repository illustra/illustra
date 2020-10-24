import { terminal } from "terminal-kit";
import Document from "./classes/Document/Document";
import Layer from "./classes/Layer/Layer";

export default function debug(info: string, documentOrLayer: Document | Layer) {

    // Debug mode not enabled
    if ((!documentOrLayer.debugMode) && ((!(documentOrLayer instanceof Layer)) || (!documentOrLayer.document?.debugMode))) return;

    // Illustra name and spacing
    terminal.bold.brightYellow("[Illustra] ").magenta("[Debug] ");

    /**
     * Document and Layer Name
     *
     * If it's a document, log its name
     * If it's a layer that's part of a document, log both names
     * If it's a layer that isn't part of a document, log the layer's name
     */
    if (documentOrLayer instanceof Document) terminal.cyan(`${documentOrLayer.name}: `);
    else if (documentOrLayer.document) terminal.cyan(`${documentOrLayer.document.name} (${documentOrLayer.name}): `);
    else terminal.cyan(`${documentOrLayer.name} (Layer): `);

    // Log
    terminal(info, "\n");
}