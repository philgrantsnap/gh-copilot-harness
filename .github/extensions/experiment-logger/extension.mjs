/**
 * experiment-logger extension
 *
 * Provides a `log_experiment` tool so Copilot (or the user) can record
 * findings to experiments/findings.md. Also injects a reminder at session
 * start to log findings when something interesting is discovered.
 *
 * Usage: ask Copilot "log this experiment" or it will use the tool automatically.
 */

import { joinSession } from "@github/copilot-sdk/extension";
import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFile } from "node:child_process";

const FINDINGS_FILE = join(process.cwd(), "experiments", "findings.md");

function ensureFile() {
    const dir = dirname(FINDINGS_FILE);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(FINDINGS_FILE)) {
        appendFileSync(FINDINGS_FILE, "# Experiment Findings\n\n");
    }
}

function formatEntry({ title, outcome, notes, tags }) {
    const date = new Date().toISOString().split("T")[0];
    const tagLine = tags?.length ? `**Tags:** ${tags.map((t) => `\`${t}\``).join(", ")}\n\n` : "";
    return `## ${title}\n\n**Date:** ${date}  \n**Outcome:** ${outcome}\n\n${tagLine}${notes}\n\n---\n\n`;
}

const session = await joinSession({
    hooks: {
        onSessionStart: async () => ({
            additionalContext:
                "This is an experimentation harness. When you discover something interesting — a capability, a limitation, a surprising behavior — use the `log_experiment` tool to record it in experiments/findings.md.",
        }),
    },
    tools: [
        {
            name: "log_experiment",
            description:
                "Log an experiment finding or observation to experiments/findings.md. Use this when you discover something noteworthy — a capability, a limitation, an unexpected behavior, or a useful pattern.",
            parameters: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "Short title for the finding (e.g. 'Context7 resolves latest docs correctly')",
                    },
                    outcome: {
                        type: "string",
                        enum: ["✅ Works", "❌ Broken", "⚠️ Partial", "💡 Insight", "🔬 To Investigate"],
                        description: "Overall outcome of the experiment",
                    },
                    notes: {
                        type: "string",
                        description: "What you found. What worked, what didn't, why it matters, edge cases.",
                    },
                    tags: {
                        type: "array",
                        items: { type: "string" },
                        description: "Optional tags like ['mcp', 'context7', 'lsp', 'extensions', 'skills']",
                    },
                },
                required: ["title", "outcome", "notes"],
            },
            handler: async (args) => {
                try {
                    ensureFile();
                    appendFileSync(FINDINGS_FILE, formatEntry(args));

                    // Open in VS Code so the user sees the update
                    const isWindows = process.platform === "win32";
                    if (isWindows) {
                        execFile("cmd", ["/c", "code", FINDINGS_FILE], () => {});
                    } else {
                        execFile("code", [FINDINGS_FILE], () => {});
                    }

                    return `✅ Logged "${args.title}" to experiments/findings.md`;
                } catch (err) {
                    return `❌ Failed to log: ${err.message}`;
                }
            },
        },
    ],
});
