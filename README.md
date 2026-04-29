# gh-copilot-harness

Personal sandbox for experimenting with GitHub Copilot CLI — MCP servers, skills, agents, extensions, and agentic workflows. Everything here is exploratory and intended to build hands-on intuition before rolling out to teams.

## Setup

```powershell
# Install the Copilot CLI (Windows)
winget install GitHub.Copilot

# Launch in this repo
cd "C:\Repos\GH Copilot Harness"
copilot
```

## What's Configured

### Extensions (`.github/extensions/`)

| Extension | Purpose |
|---|---|
| `experiment-logger` | Provides a `log_experiment` tool — Copilot logs findings to `experiments/findings.md` automatically |
| `open-in-vscode` | Auto-opens files in VS Code whenever Copilot creates or edits one |

### Instructions (`.github/copilot-instructions.md`)

Scoped instructions for this repo — tells Copilot this is an exploration-first environment focused on probing capabilities and edge cases.

### Cloud Agent (`.github/workflows/copilot-setup-steps.yml`)

Configures the Copilot cloud agent environment with Node 22, Python 3.13, and .NET 9 pre-installed.

## Experiment Log

Findings are logged to [`experiments/findings.md`](experiments/findings.md) via the `experiment-logger` extension. Ask Copilot to log something or it will do it automatically when it discovers something noteworthy.

## Features Being Explored

- [ ] MCP server integrations (GitHub, Playwright, Context7, MarkItDown, Sequential Thinking)
- [ ] Custom CLI extensions (tools, hooks, events)
- [ ] LSP code intelligence (TypeScript, C#, Python)
- [ ] Agentic workflows (`/fleet`, `/delegate`, autopilot mode)
- [ ] Skills authoring
- [ ] Cloud agent (`/delegate` → PR)
