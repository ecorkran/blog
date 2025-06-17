---
title: "Shared MCP Servers with Windsurf and Claude"  
description: "Weekend notes on MCP, supergateway, socat sandbox escapes, and Smithery. Copy‑paste Docker commands included."  
image: "/image/mcp-notes-1.jpg"  
pubDate: 2025-05-27
---

## MCP Notes – Working Draft

I'm sharing my raw notes on MCP servers I captured between family time and hacking over the past few days. They're rough but runnable and might save you the same rabbit‑holes I fell into. Includes information on LAN sharing, proxies, bridging, and https://smithery.ai.

## MCP Server Types

Two main types of MCP servers, differentiated by transport:
1. **Local / stdio** – runs on the same machine; easiest via Docker.
2. **Remote / SSE** – reachable over HTTP(S); can be LAN or public.

`supergateway` turns a local stdio server into an SSE endpoint so every client can connect.

---

### Finding & Running MCP Servers

|Server|Where to get it|Why it matters|
|---|---|---|
|**GitHub MCP**|[github-mcp-server](https://github.com/github/github-mcp-server)|Everybody has a GitHub account; perfect "hello-world" server.|
|**Context7 MCP**|`@upstash/context7-mcp` (npm)|Great for natural‑language context queries.|
|**Filesystem MCP**|[filesystem server](https://github.com/modelcontextprotocol/servers/tree/HEAD/src/filesystem)|Lets an AI traverse a directory as context.|
|**Registry / search**|[https://smithery.ai](https://smithery.ai/)|Directory + installer for everything MCP‑related.|

#### Quick Docker commands

**1. GitHub MCP – local stdio test**  
Runs entirely inside the container; no proxies needed.

```sh
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here \
  -p 8000:8000 \
  ghcr.io/github/github-mcp-server:latest
```


**2. Context7 MCP via supergateway**  
Exposes Context7 over `/sse` so clients can fetch `http://localhost:8010/sse` or `http://server-ip:8010/sse`.  For LAN clients with Windsurf, see note on `socat` workaround.

```sh
docker run -i --rm -p 8010:8000 supercorp/supergateway \
  --stdio "npx -y @upstash/context7-mcp" \
  --port 8000 \
  --ssePath /sse \
  --messagePath /message
```


**3. Filesystem MCP via supergateway**  
Mounts your current directory read‑only for the AI to browse.

```sh
docker run -i --rm -p 8011:8000 \
  -v $(pwd):/projects:ro \
  supercorp/supergateway \
  --stdio "npx -y @modelcontextprotocol/server-filesystem /projects" \
  --port 8000 \
  --ssePath /sse \
  --messagePath /message
```

_(Swap the host‑side ports if 8010/8011 collide with something else.)_

> **Token reminder** – For anything beyond a throw‑away test, load secrets from a `.env` file or `--env-file`. Avoid hard‑coding tokens inline.

---

### Windsurf: auto‑run vs client‑only config

#### Auto‑run entry (spawns container on demand)

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

_Windsurf launches this when you pick the server in the UI. Endpoint becomes `http://localhost:9000/sse`._

#### Plain client configuration (remote server)

```json
{
  "mcpServers": {
    "context7-remote": {
      "serverUrl": "http://server-ip:8010/sse"
    }
  }
}
```

_Use this for a remote or LAN‑hosted server. On macOS you’ll need the socat workaround below._

---

### Sandbox issue & socat workaround

Windsurf's MacOS build ships with a hardened network sandbox: only localhost or external addresses are allowed. If your MCP runs on a LAN box (or even a LAN IP on the same box when Docker uses host‑network), you'll see "no route to host".

```sh
socat TCP-LISTEN:9000,bind=127.0.0.1,reuseaddr,fork \
      TCP:192.168.1.95:8010
```

Then point Windsurf at `http://localhost:9000/sse`. Linux users should be able to launch Windsurf with `--no-sandbox`, though this is not recommended practice.

---

### Transport Helpers

|Tool|Direction|Core role|Typical use case|
|---|---|---|---|
|**supergateway**|→|Wrap stdio server → expose as SSE|Share a local Docker container with any SSE‑capable client.|
|**mcp‑proxy**|↔|Reverse‑proxy / bridge an SSE server to a new local endpoint|Let Claude Desktop reach a LAN or remote server through `localhost`.|
|~~mcp‑remote~~|←|Legacy: stdio‑only client → remote SSE server|Rare; shell scripts that still speak stdio.|

#### Example: mcp‑proxy entry in Claude Desktop

First install `mcp-proxy`.  Easiest ways are either:
* `uv tool install mcp-proxy` or
* `npx -y @smithery/cli install mcp-proxy --client claude`.

You will probably need to specify the full path to mcp-proxy as shown below, especially if installed via `uv`.

```json
"context7-proxy": {
  "command": "/Users/manta/.local/bin/mcp-proxy",
  "args": [ "http://192.168.1.95:8010/sse" ]
}
```

View settings in Claude Desktop > Settings > Integrations.  Edit directly in `claude-desktop-config.json`.

_Claude now connects via the proxy. Windsurf still needs the socat workaround if the server lives off‑localhost._

---

### Smithery in one minute
Smithery.ai is a unified registry and installer for Model Context Protocol (MCP) servers and plugins, making it easy to extend AI agents like Claude or ChatGPT with new tools and integrations.

- Centralized Discovery & Install: Browse, install, and manage MCP-compatible servers and plugins with a single CLI command.
- Seamless Integration: Instantly connects AI clients to new APIs, automations, and data sources—locally or in the cloud—with secure config handling.
- Standardized & Community-Driven: Ensures all integrations follow open standards and are easy to maintain or share.

Get started at https://smithery.ai

---


### Still on the backlog
- Wrap MCP with ChatGPT tool calling for use inOpenAI desktop app.
- Better error handling when GitHub MCP hits rate limits or drops SSE.
    

