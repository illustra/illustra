import { terminal } from "terminal-kit";
import Layer from "../Layer/Layer";
import Document from "./Document";

export default function debug(document: Document, info: string, layer?: Layer, startGroup?: boolean) {

    // Debug mode not enabled
    if ((!layer?.debugMode) && (!document.debugMode)) return;

    // Log
    if (document._debugGroupDepth === 0) terminal.bold.brightYellow("[Illustra] ").magenta("[Debug] ");
    else terminal(`${" ".repeat("[Illustra] [Debug] ".length)}${"    ".repeat(document._debugGroupDepth)}`);
    terminal.cyan(`${document.name}${layer ? ` (${layer.name})` : ""}: `).defaultColor.styleReset(info, "\n");

    // Start group
    if (startGroup) document._debugGroupDepth++;
}