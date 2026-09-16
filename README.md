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
- [ ] Custom CLI extensions and the newer hooks model
- [ ] LSP code intelligence (TypeScript, C#, Python)
- [ ] Agent skills and custom agents
- [ ] Cloud-agent API and event/schedule-based automations
- [ ] Cloud and local CLI sandboxes
- [ ] Copilot Memory and Copilot Spaces
- [ ] Code review with repository skills and MCP context

## Updates Worth Exploring

GitHub Copilot has expanded from a chat and completion tool into a configurable
agent platform. These are the highest-value additions to test in this harness.

| Capability | Why explore it here | First experiment | Availability |
|---|---|---|---|
| **Agent skills** | Portable, Markdown-based task instructions now work across the CLI, VS Code agent mode, cloud agent, and code review. | Turn the experiment logger into `.github/skills/experiment-logger/SKILL.md`; verify automatic invocation and `/skills reload`. | Generally available |
| **Custom agents** | Define specialized personas, instructions, and tool access in versioned agent files. | Add a read-only `researcher.agent.md` and a README-only updater; compare their guardrails with the default agent. | CLI and VS Code; cloud-agent support available |
| **Hooks** | Deterministic lifecycle commands can audit, validate, or block agent tool use. | Add a `preToolUse` PowerShell hook that rejects `git push` to the default branch; keep execution under five seconds. | CLI and cloud agent; VS Code support is preview |
| **MCP registry and toolsets** | MCP is now the main integration surface, with a registry search experience and configurable GitHub toolsets. | Use experimental `/mcp search` to find a server, then measure context and token cost with only the required tool groups enabled. | MCP is generally available; registry search is experimental |
| **Cloud sessions and sandboxes** | The CLI can run in an ephemeral GitHub-hosted environment; local sandboxing constrains agent capabilities. | Run a disposable task with `copilot --cloud`, then test which filesystem and network operations `/sandbox enable` blocks locally. | Cloud sessions and local sandboxing are preview; Windows local sandboxing requires an Insiders build |
| **Cloud-agent API and automations** | Delegate repository work programmatically or on issue/PR/schedule triggers instead of relying on earlier experimental workflow commands. | Use the REST API to create a small documentation task, then try an automation that triages newly opened issues. | Cloud agent is generally available; API is public preview; automations require a private or internal repository |
| **Copilot Memory and Spaces** | Persistent repository facts and curated, shareable context can improve repeated experiments. | Ask Copilot to remember a harness convention, inspect its saved memory, and compare an answer with and without a Space containing the findings log. | Memory is public preview; Spaces are generally available |
| **Agentic code review** | Repository skills and MCP tools can provide task-specific review context; cloud agent can apply review suggestions. | Add a review-focused skill and compare automatic-review findings against the default configuration. | Code review is generally available; MCP/skill integration is preview |

### Current CLI workflow changes

- **Prefer skills, custom agents, hooks, and MCP** for new experiments. They are
  the supported, composable customization surfaces alongside the existing CLI
  SDK extensions in this repository.
- Earlier `/fleet` and `/delegate` workflow experiments should be revisited as
  **cloud sessions**, **cloud-agent automations**, or **cloud-agent API** tasks.
- Use plan mode, `/context`, and `/compact` to observe how the CLI plans,
  manages context, and compacts a long-running experiment.

## Reference Documentation

- [Copilot features overview](https://docs.github.com/en/copilot/get-started/features)
- [Customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [MCP in Copilot](https://docs.github.com/en/copilot/concepts/context/mcp)
- [Agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Custom agents for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
- [Agent hooks](https://docs.github.com/en/copilot/concepts/agents/hooks)
- [Cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes)
- [Cloud-agent automations](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations)
- [Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)
- [Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
