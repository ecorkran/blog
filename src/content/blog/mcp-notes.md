---
title: "Running Multiple MCP Servers on Docker + Windsurf"
description: "Weekend notes on MCP, supergateway, socat sandbox escapes, and Smithery. Copy-paste Docker commands included."
pubDate: 2025-05-27
---

# MCP Notes – Working Draft

Took the three‑day weekend to play with MCP servers, Docker and Windsurf. These are the raw notes I captured between family time and hacking. They’re rough but runnable and might save you the same rabbit‑holes I fell into.  Includes information on LAN sharing, proxies, bridging, and https://smithery.ai.



## Overview

Goal: connect GitHub MCP to Windsurf and learn how to run MCP servers from different clients (Windsurf, Claude Desktop, ChatGPT, etc.).  Added bonus: figure out LAN‑wide sharing and sandbox escapes without losing the plot.

## MCP Server Types

Two basic flavours:

1. **Local / stdio** – runs on the same machine; easiest via Docker.
2. **Remote / SSE** – reachable over HTTP(S); can be LAN or public.

Docker + `supergateway` covers the local→SSE bridge nicely.

---

## Finding & Running MCP Servers

| Server                | Where to get it                                                                                                                                      | Why it matters                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **GitHub MCP**        | [https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server)                                                           | Everybody has a GitHub account; perfect "hello‑world" server. |
| **Context7 MCP**      | `@upstash/context7-mcp` (npm)                                                                                                                        | Great for natural‑language context queries.                   |
| **Filesystem MCP**    | [https://github.com/modelcontextprotocol/servers/tree/HEAD/src/filesystem](https://github.com/modelcontextprotocol/servers/tree/HEAD/src/filesystem) | Lets an AI traverse a directory as context.                   |
| **Registry / search** | [https://smithery.ai](https://smithery.ai)                                                                                                           | Directory + installer for everything MCP‑related.             |

### Quick Docker commands (copy‑paste ready)

**Token/secrets reminder** – Hard‑coding tokens in the `docker run` line works for first tests but isn’t safe for anything else. Drop a `.env` file next to your compose file, use `--env-file`, or at least export the token in your shell (`export GITHUB_PERSONAL_ACCESS_TOKEN=…`) so it doesn’t land in shell history.

> **Each block has a one‑liner description before the code so you know *why* you’d run it.**

**1. GitHub MCP – local stdio test**
Runs entirely inside the container; no proxies needed.

```sh
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here \
  -p 8000:8000 \
  ghcr.io/github/github-mcp-server:latest
```

**2. Context7 MCP bridged via Supergateway**
Supergateway spins the server via `npx` and exposes it over `/sse` so any client can hit `http://localhost:8010/sse`.

```sh
docker run -i --rm -p 8010:8000 supercorp/supergateway \
  --stdio "npx -y @upstash/context7-mcp" \
  --port 8000 \
  --ssePath /sse \
  --messagePath /message
```

**3. Filesystem MCP bridged via Supergateway**
Mounts your current directory read‑only inside the container so the AI can browse files.

```sh
docker run -i --rm -p 8011:8000 \
  -v $(pwd):/projects:ro \
  supercorp/supergateway \
  --stdio "npx -y @modelcontextprotocol/server-filesystem /projects" \
  --port 8000 \
  --ssePath /sse \
  --messagePath /message
```

*(Swap the host‑side ports if 8010/8011 collide with something else.)*

---

## Windsurf: auto‑run vs client‑only config

Windsurf can **start** an MCP for you (auto‑run) *or* just **connect** to one you already launched (client config).

### Auto‑run entry (spawns container on demand)

```json
"github-local": {
  "command": "docker",
  "args": [
    "run","-i","--rm",
    "-e","GITHUB_PERSONAL_ACCESS_TOKEN",
    "-p","9000:8000",
    "ghcr.io/github/github-mcp-server:latest"
  ],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token" }
}
```

*Windsurf launches this when you pick the server in the UI. SSE path is implicit (`http://localhost:9000/sse`).*

### Plain client configuration (server already running)

Edit or create `mcp_config.json`:

```json
{
  "mcpServers": {
    "context7-local": {
      "serverUrl": "http://localhost:8010/sse"
    }
  }
}
```

*Use this if you started the container yourself—Windsurf just connects.*

---

## Sandbox gotcha & the socat trick

Windsurf’s Mac build ships with a hardened network sandbox: only `localhost` is allowed.  If your MCP runs on another box (or even a LAN IP on the same box when Docker uses host‑network), you’ll see "no route to host".

**socat 101** – it’s a tiny Swiss‑army‑knife for piping TCP ↔ TCP, TCP ↔ UDP, etc.  Here we use it to *relay* traffic from a localhost port to the real LAN endpoint.

```sh
socat TCP-LISTEN:9000,bind=127.0.0.1,reuseaddr,fork \
      TCP:192.168.1.95:8010
```

Now point Windsurf at `http://localhost:9000/sse` and the sandbox is happy.  (Linux Windsurf can be launched with `--no-sandbox`, but macOS has no bypass yet.)

---

## Transport Helpers (Why they exist)

| Tool             | What it solves                                                                                                                                       | Notes                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **supergateway** | Wraps a *stdio* server and exposes it as SSE                                                                                                         | Your go‑to for local Docker + LAN share.                 |
| **mcp-proxy**    | Aggregates many SSE servers into one endpoint, or rewrites paths                                                                                     | Handy when you run multiple Context7/FileSystem servers. |
| ~~mcp-remote~~   | *Mostly obsolete*: made stdio clients talk to *remote* SSE servers. Modern clients (Claude, Windsurf, ChatGPT) accept a remote `serverUrl` directly. |                                                          |

*(Leaving mcp‑remote here for historical context; you probably don’t need it.)*

### mcp‑proxy quick demo

```sh
npx -y mcp-proxy http://localhost:8010/sse http://localhost:8011/sse
# new aggregated endpoint: http://localhost:8080/sse
```

---

## Smithery – backgrounder

Smithery is a **community‑run registry** + CLI that discovers, installs, and updates MCP servers/plugins.  Think `npm` meets Homebrew for MCP.

* Browse [https://smithery.ai](https://smithery.ai) for a searchable list.
* Install something straight into Claude/Windsurf with one line:

```sh
npx -y @smithery/cli install mcp-proxy --client claude
```

*Under the hood it injects the right entry into the client’s config and grabs the binary or npm package.*

---

## Using MCP Servers from Clients

### Claude Desktop – where the knobs live

* **Settings → Integrations → MCP Servers** lists everything; toggle on/off.
* Hidden **Settings → Developer** (hold ⌥/Alt while opening) shows raw JSON for backup or manual edits.

### ChatGPT Desktop (Electron build) – quick shim

Set an environment variable **before** launching:

```sh
export OPENAI_MCP_SERVER_URL="http://localhost:8010/sse"
```

### Windsurf CLI flag recap

```sh
windsurf --mcp-server http://localhost:8010/sse
```

---

## Natural‑language Tricks

Try these once connected:

* “List open issues for manta‑digital/manta‑templates.”
* “Find files containing TODO in /projects/myrepo.”

---

## Still on the backlog

* Clear recipe for multi‑client access to a shared LAN server (Docker network or reverse proxy?).
* Better error‑handling when bridging GitHub MCP through proxies (rate‑limit, SSE dropouts).

---
