import { terminal } from "terminal-kit";
import { BaseLayer, Document } from "./internal";

export default function debug(info: string, documentOrBaseLayer: Document | BaseLayer) {

    // Debug mode not enabled
    if ((!documentOrBaseLayer.debugMode) && ((!(documentOrBaseLayer instanceof BaseLayer)) || (!documentOrBaseLayer.document?.debugMode))) return;

    // Illustra name and spacing
    terminal.bold.brightYellow("[Illustra] ").magenta("[Debug] ");

    /**
     * Document and Layer Name
     *
     * If it's a document, log its name
     * If it's a layer that's part of a document, log both names
     * If it's a layer that isn't part of a document, log the layer's name
     */
    if (documentOrBaseLayer instanceof Document) terminal.cyan(`${documentOrBaseLayer.name}: `);
    else if (documentOrBaseLayer.document) terminal.cyan(`${documentOrBaseLayer.document.name} (${documentOrBaseLayer.name}): `);
    else terminal.cyan(`${documentOrBaseLayer.name} (Layer): `);

    // Log
    terminal(info, "\n");
}