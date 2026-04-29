/**
 * open-in-vscode extension
 *
 * Automatically opens files in VS Code whenever Copilot creates or edits one.
 * Keeps your editor in sync with the agent without manual switching.
 *
 * Only opens files — never directories or binary extensions.
 */

import { joinSession } from "@github/copilot-sdk/extension";
import { execFile } from "node:child_process";

const BINARY_EXTENSIONS = new Set([
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg",
    ".woff", ".woff2", ".ttf", ".eot",
    ".zip", ".tar", ".gz", ".exe", ".dll", ".so",
    ".bin", ".pdf",
]);

function isBinary(filePath) {
    const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
    return BINARY_EXTENSIONS.has(ext);
}

function openInCode(filePath) {
    if (isBinary(filePath)) return;
    const isWindows = process.platform === "win32";
    if (isWindows) {
        execFile("cmd", ["/c", "code", filePath], () => {});
    } else {
        execFile("code", [filePath], () => {});
    }
}

await joinSession({
    hooks: {
        onPostToolUse: async (input) => {
            if (input.toolName === "create" || input.toolName === "edit") {
                const filePath = input.toolArgs?.path;
                if (filePath) openInCode(filePath);
            }
        },
    },
    tools: [],
});
